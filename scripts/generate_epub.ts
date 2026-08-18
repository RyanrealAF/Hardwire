import * as fs from 'fs';
import * as path from 'path';
import EPub from 'epub-gen-memory';
import { CURRICULUM_MODULES } from '../src/data/curriculumData';
import { VOCABULARY_LIST } from '../src/data/vocabularyData';

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderContentHtml(text: string): string {
  if (!text) return '';
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  html = html.replace(/`([^`]+)`/g, '<code style="font-family: monospace; background: #eee; padding: 2px 4px; border-radius: 3px;">$1</code>');
  return html.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>');
}

export async function generateEpub(): Promise<void> {
  console.log('Generating EPUB edition of The Hardwire Method Textbook...');

  const epubCss = `
    body {
      font-family: sans-serif;
      line-height: 1.6;
      color: #1A1A1A;
      margin: 1em;
    }
    h1 {
      font-size: 2em;
      color: #FF5A1F;
      border-bottom: 2px solid #C5A059;
      padding-bottom: 0.3em;
      margin-top: 1em;
    }
    h2 {
      font-size: 1.5em;
      color: #1A1A1A;
      margin-top: 1.2em;
    }
    h3 {
      font-size: 1.2em;
      color: #2D2A26;
      margin-top: 1em;
    }
    .subtitle {
      font-size: 1.1em;
      color: #C5A059;
      font-style: italic;
      margin-bottom: 1em;
    }
    .meta-tag {
      font-family: monospace;
      font-size: 0.85em;
      font-weight: bold;
      color: #FF5A1F;
      text-transform: uppercase;
    }
    .core-question {
      background: #F7F3F0;
      border-left: 4px solid #C5A059;
      padding: 0.8em 1em;
      margin: 1em 0;
      font-weight: bold;
    }
    .diagram-box {
      background: #131316;
      color: #ECE7DD;
      font-family: monospace;
      font-size: 0.8em;
      padding: 1em;
      margin: 1.2em 0;
      border-radius: 4px;
      overflow-x: auto;
    }
    .diagram-code {
      white-space: pre-wrap;
      word-break: break-all;
    }
    .caption {
      color: #8A888F;
      font-size: 0.85em;
      font-style: italic;
      margin-top: 0.5em;
    }
    .callout {
      border-left: 4px solid #C5A059;
      background: #F9F8F6;
      padding: 0.8em 1em;
      margin: 1.2em 0;
    }
    .callout-tool {
      border-left-color: #2563EB;
      background: #F4F7FB;
    }
    .callout-exercise {
      border-left-color: #10B981;
      background: #F0FDF4;
    }
    .callout-quiz {
      border-left-color: #8B5CF6;
      background: #FAF5FF;
    }
    .callout-title {
      font-weight: bold;
      font-size: 0.9em;
      text-transform: uppercase;
      margin-bottom: 0.4em;
    }
    .quiz-option {
      margin: 0.4em 0;
      padding-left: 1em;
    }
    .glossary-item {
      border-bottom: 1px solid #E5E1DA;
      padding: 1em 0;
    }
  `;

  const chapters: Array<{ title: string; author?: string; content: string }> = [];

  // 1. Philosophy & Foundation Chapter
  chapters.push({
    title: 'Curriculum Architecture & Philosophy',
    content: `
      <h1>The Hardwire Method: Architecture &amp; Philosophy</h1>
      <p class="subtitle">Feel it first. Name it second. Control it third.</p>
      <div class="core-question">
        "Why Traditional Music Theory Fails Modern Producers — And How Hardwire Inverts It"
      </div>
      <p>
        Traditional music theory pedagogy begins with abstract visual notation — staves, clefs, and key signatures developed centuries before the invention of the DAW. For modern producers, beatmakers, and hip-hop artists, this approach introduces unnecessary gatekeeping.
      </p>
      <p>
        <strong>The Hardwire Method</strong> inverts the classical paradigm. Hip-hop creators already possess sophisticated intuitive mastery over rhythm, syncopation, pocket drag, harmonic tension, and vocal bounce. The purpose of this curriculum is not to teach you how to feel music — you already feel it. The purpose is to provide the precise technical, MIDI, and acoustic vocabulary necessary to intentionally command that instinct inside any Digital Audio Workstation.
      </p>
    `
  });

  // 2. Curriculum Modules and Lessons
  CURRICULUM_MODULES.forEach((mod) => {
    let moduleHtml = `
      <div class="meta-tag">CURRICULUM MODULE 0${mod.number}</div>
      <h1>${escapeHtml(mod.title)}</h1>
      <p class="subtitle">${escapeHtml(mod.subtitle)}</p>
      <div class="core-question">
        Core Inquiry: "${escapeHtml(mod.coreQuestion)}"
      </div>
      <p>${escapeHtml(mod.description)}</p>
      <hr/>
    `;

    chapters.push({
      title: `Module 0${mod.number}: ${mod.title}`,
      content: moduleHtml
    });

    mod.lessons.forEach((lesson) => {
      let lessonHtml = `
        <div class="meta-tag">MODULE 0${mod.number} &bull; LESSON ${lesson.lessonNumber}</div>
        <h2>${escapeHtml(lesson.title)}</h2>
        <p class="subtitle">${escapeHtml(lesson.subtitle)}</p>
        <div class="core-question">
          Core Question: "${escapeHtml(lesson.coreQuestion)}"
        </div>
        <p>${escapeHtml(lesson.summary)}</p>
      `;

      lesson.sections.forEach((sec) => {
        lessonHtml += `
          <h3>${escapeHtml(sec.heading)}</h3>
          <p>${renderContentHtml(sec.content)}</p>
        `;

        if (sec.diagram) {
          lessonHtml += `
            <div class="diagram-box">
              <div style="color: #FF5A1F; font-weight: bold; margin-bottom: 6px;">// SYSTEM TIMELINE &amp; COORDINATE MATRIX</div>
              <pre class="diagram-code"><code>${escapeHtml(sec.diagram.code)}</code></pre>
              ${sec.diagram.caption ? `<div class="caption">${escapeHtml(sec.diagram.caption)}</div>` : ''}
            </div>
          `;
        }

        if (sec.keyTakeaway) {
          lessonHtml += `
            <div class="callout">
              <div class="callout-title" style="color: #C5A059;">KEY PRODUCTION TAKEAWAY</div>
              <div>${renderContentHtml(sec.keyTakeaway)}</div>
            </div>
          `;
        }
      });

      if (lesson.toolMapping) {
        lessonHtml += `
          <div class="callout callout-tool">
            <div class="callout-title" style="color: #2563EB;">DAW TOOL MAPPING: ${escapeHtml(lesson.toolMapping.dawFeature)}</div>
            <p><strong>Function:</strong> ${renderContentHtml(lesson.toolMapping.description)}</p>
            ${lesson.toolMapping.proTip ? `<p style="color: #2563EB;"><strong>Pro-Tip:</strong> ${renderContentHtml(lesson.toolMapping.proTip)}</p>` : ''}
          </div>
        `;
      }

      if (lesson.exercise) {
        lessonHtml += `
          <div class="callout callout-exercise">
            <div class="callout-title" style="color: #10B981;">STUDIO EXERCISE: ${escapeHtml(lesson.exercise.actionLabel)}</div>
            <p><strong>Instruction:</strong> ${renderContentHtml(lesson.exercise.instruction)}</p>
            <p><strong>Objective:</strong> ${renderContentHtml(lesson.exercise.objective)}</p>
          </div>
        `;
      }

      if (lesson.quiz) {
        lessonHtml += `
          <div class="callout callout-quiz">
            <div class="callout-title" style="color: #8B5CF6;">COMPREHENSION CHECK</div>
            <p><strong>${escapeHtml(lesson.quiz.question)}</strong></p>
        `;
        lesson.quiz.options.forEach((opt, idx) => {
          const isCorrect = idx === lesson.quiz.correctIndex;
          lessonHtml += `
            <div class="quiz-option">
              ${String.fromCharCode(65 + idx)}) ${escapeHtml(opt)} ${isCorrect ? '<strong>[CORRECT]</strong>' : ''}
            </div>
          `;
        });
        lessonHtml += `
            <p style="color: #8B5CF6; font-style: italic; margin-top: 8px;"><strong>Explanation:</strong> ${renderContentHtml(lesson.quiz.explanation)}</p>
          </div>
        `;
      }

      chapters.push({
        title: `L${lesson.lessonNumber}: ${lesson.title}`,
        content: lessonHtml
      });
    });
  });

  // 3. Glossary Chapter
  let glossaryHtml = `
    <h1>Street-to-DAW Audio Glossary</h1>
    <p class="subtitle">Complete Technical Compendium</p>
  `;

  VOCABULARY_LIST.forEach((item, index) => {
    glossaryHtml += `
      <div class="glossary-item">
        <h3>${index + 1}. ${escapeHtml(item.term)} <span style="font-size: 0.7em; color: #FF5A1F;">[${escapeHtml(item.moduleName)} • ${escapeHtml(item.audioCategory)}]</span></h3>
        <p><strong>Definition:</strong> ${escapeHtml(item.definition)}</p>
        <p><em>Practical Application:</em> ${escapeHtml(item.practicalApplication)}</p>
        <p style="font-family: monospace; color: #2563EB;">DAW Feature: ${escapeHtml(item.dawFeature)}</p>
      </div>
    `;
  });

  chapters.push({
    title: 'Street-to-DAW Glossary',
    content: glossaryHtml
  });

  const options = {
    title: 'The Hardwire Method: Music Theory for the Streets',
    author: 'RyanrealAF',
    publisher: 'RyanrealAF',
    description: 'Interactive manual and curriculum for rap cadence, rhythmic structure, and audio workflows.',
    rights: 'Copyright © 2026 RyanrealAF. All rights reserved.',
    cover: undefined, // Text-based standard cover
    css: epubCss,
    tocTitle: 'Table of Contents'
  };

  const epubBuffer = await (typeof EPub === 'function' ? (EPub as any)(options, chapters) : (new (EPub as any).EPub(options, chapters)).genEpub());
  const rootPath = path.join(process.cwd(), 'THE_HARDWIRE_METHOD_TEXTBOOK.epub');
  const publicPath = path.join(process.cwd(), 'public', 'THE_HARDWIRE_METHOD_TEXTBOOK.epub');

  fs.writeFileSync(rootPath, epubBuffer);
  console.log('Successfully generated EPUB at:', rootPath);

  fs.writeFileSync(publicPath, epubBuffer);
  console.log('Successfully copied EPUB to public directory:', publicPath);
}

generateEpub().catch((err) => {
  console.error('Failed to generate EPUB:', err);
  process.exit(1);
});
