import * as fs from 'fs';
import * as path from 'path';
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

function renderMarkdownText(text: string): string {
  if (!text) return '';
  // Convert markdown bold, italics, code, and linebreaks to clean html
  let html = escapeHtml(text);
  
  // bold **text** or __text__
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');
  
  // italic *text* or _text_
  html = html.replace(/\*([^\*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  
  // inline code `code`
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
  
  // Convert newlines to paragraphs / breaks
  return html.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br/>');
}

export function generateHtmlBook(): string {
  const timestamp = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  let html = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Hardwire Method • Music Theory for the Streets (Complete eBook Edition)</title>
  <meta name="description" content="The complete standalone HTML eBook edition of The Hardwire Method: Rap Cadence, Subdivision, MIDI Geometry, and Urban Production Theory.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:ital,wght@0,400;0,600;0,700;1,400&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #FDFCFB;
      --bg-alt: #F7F3F0;
      --card-bg: #FFFFFF;
      --dark-bg: #0A0A0B;
      --dark-surface: #131316;
      --dark-border: #232327;
      --text: #1A1A1A;
      --text-muted: #5A5650;
      --text-dim: #8B8378;
      --accent: #FF5A1F;
      --accent-hover: #E04810;
      --gold: #C5A059;
      --cyan: #0D9488;
      --blue: #2563EB;
      --green: #10B981;
      --purple: #8B5CF6;
      --border: #E5E1DA;
      --border-strong: #D1CBC0;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 16px;
    }

    @media (prefers-color-scheme: dark) {
      :root.auto-dark {
        --bg: #0A0A0B;
        --bg-alt: #131316;
        --card-bg: #16161A;
        --text: #ECE7DD;
        --text-muted: #A8A39D;
        --text-dim: #736E67;
        --border: #26262B;
        --border-strong: #383840;
      }
    }

    body.dark-mode {
      --bg: #0A0A0B;
      --bg-alt: #131316;
      --card-bg: #16161A;
      --text: #ECE7DD;
      --text-muted: #A8A39D;
      --text-dim: #736E67;
      --border: #26262B;
      --border-strong: #383840;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.7;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    /* Typography */
    h1, h2, h3, h4, .display-font {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      line-height: 1.25;
      color: var(--text);
    }

    .serif-display {
      font-family: 'Instrument Serif', Georgia, serif;
    }

    .heavy-display {
      font-family: 'Big Shoulders Display', sans-serif;
      text-transform: uppercase;
      letter-spacing: -0.02em;
    }

    .mono-font {
      font-family: 'JetBrains Mono', monospace;
    }

    /* Container Layout */
    .app-layout {
      display: flex;
      min-height: 100vh;
    }

    /* Sidebar Navigation */
    .sidebar {
      width: 320px;
      position: sticky;
      top: 0;
      height: 100vh;
      background: var(--bg-alt);
      border-right: 1px solid var(--border);
      overflow-y: auto;
      padding: 24px 16px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    @media (max-width: 1024px) {
      .sidebar {
        display: none;
        position: fixed;
        z-index: 100;
        left: 0;
        top: 0;
        width: 85%;
        max-width: 360px;
        box-shadow: 0 0 30px rgba(0,0,0,0.3);
      }
      .sidebar.open {
        display: flex;
      }
    }

    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 99;
    }
    .sidebar-overlay.open {
      display: block;
    }

    .sidebar-brand {
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border);
    }

    .nav-group-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--accent);
      margin-top: 16px;
      margin-bottom: 8px;
      padding-left: 8px;
    }

    .nav-link {
      display: block;
      padding: 6px 10px;
      font-size: 13px;
      color: var(--text-muted);
      text-decoration: none;
      border-radius: var(--radius-sm);
      transition: all 0.15s ease;
      line-height: 1.4;
      margin-bottom: 2px;
    }

    .nav-link:hover {
      color: var(--text);
      background: var(--border);
    }

    .nav-link.active {
      color: var(--text);
      font-weight: 700;
      background: var(--card-bg);
      border-left: 3px solid var(--accent);
    }

    /* Main Reader Area */
    .reader-area {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .top-toolbar {
      position: sticky;
      top: 0;
      z-index: 30;
      background: var(--bg);
      border-bottom: 1px solid var(--border);
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      backdrop-filter: blur(10px);
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: var(--radius-sm);
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      border: 1px solid var(--border);
      background: var(--card-bg);
      color: var(--text);
      font-family: 'JetBrains Mono', monospace;
      transition: all 0.15s ease;
    }

    .btn:hover {
      border-color: var(--text-dim);
      background: var(--bg-alt);
    }

    .btn-accent {
      background: var(--accent);
      color: #0A0A0B;
      border-color: var(--accent);
    }

    .btn-accent:hover {
      background: var(--accent-hover);
      border-color: var(--accent-hover);
      color: #0A0A0B;
    }

    .book-content {
      max-width: 860px;
      width: 100%;
      margin: 0 auto;
      padding: 48px 24px 120px;
    }

    /* Book Elements */
    .book-cover {
      background: var(--dark-bg);
      color: #ECE7DD;
      border-radius: var(--radius-lg);
      padding: 64px 36px;
      text-align: center;
      margin-bottom: 64px;
      border: 1px solid var(--gold);
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
      position: relative;
    }

    .book-cover h1 {
      font-size: clamp(36px, 6vw, 64px);
      letter-spacing: -0.02em;
      color: #FFFFFF;
      margin: 16px 0 8px;
    }

    .book-cover .gold-text {
      color: var(--gold);
    }

    .book-cover .cover-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 999px;
      background: rgba(255, 90, 31, 0.15);
      border: 1px solid var(--accent);
      color: var(--accent);
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }

    .module-hero {
      padding: 48px 0 24px;
      border-bottom: 2px solid var(--border);
      margin-bottom: 48px;
    }

    .module-num-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-bottom: 8px;
    }

    .module-title {
      font-size: clamp(28px, 4vw, 42px);
      margin-bottom: 8px;
    }

    .module-subtitle {
      font-size: 18px;
      color: var(--gold);
      font-weight: 600;
      margin-bottom: 20px;
    }

    .lesson-container {
      padding: 40px 0 60px;
      border-bottom: 1px solid var(--border);
    }

    .lesson-header {
      margin-bottom: 28px;
    }

    .lesson-meta {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.15em;
      margin-bottom: 6px;
    }

    .lesson-title {
      font-size: clamp(24px, 3vw, 32px);
      margin-bottom: 6px;
    }

    .lesson-subtitle {
      font-size: 16px;
      color: var(--gold);
      font-style: italic;
      margin-bottom: 16px;
    }

    .lesson-core-question {
      background: var(--bg-alt);
      border-left: 3px solid var(--gold);
      padding: 12px 18px;
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 16px;
    }

    .lesson-summary {
      font-size: 15px;
      color: var(--text-muted);
      line-height: 1.7;
      margin-bottom: 24px;
    }

    .section-block {
      margin: 32px 0;
    }

    .section-heading {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
      color: var(--text);
    }

    .section-content {
      font-size: 15.5px;
      color: var(--text-muted);
      margin-bottom: 16px;
    }

    .section-content p {
      margin-bottom: 14px;
    }

    /* Diagrams & Coordinates */
    .diagram-box {
      background: #111114;
      color: #ECE7DD;
      border: 1px solid #282830;
      border-radius: var(--radius-md);
      padding: 18px;
      margin: 20px 0;
      font-family: 'JetBrains Mono', monospace;
      overflow-x: auto;
      box-shadow: inset 0 2px 8px rgba(0,0,0,0.4);
    }

    .diagram-header {
      font-size: 10px;
      font-weight: 700;
      color: var(--accent);
      letter-spacing: 0.1em;
      margin-bottom: 10px;
      border-bottom: 1px dashed #33333C;
      padding-bottom: 6px;
    }

    .diagram-code {
      font-size: 12px;
      line-height: 1.5;
      white-space: pre;
      color: #F4F1EA;
    }

    .diagram-caption {
      font-size: 11px;
      color: #8A888F;
      margin-top: 10px;
      font-style: italic;
    }

    /* Callout Boxes */
    .callout {
      border-radius: var(--radius-md);
      padding: 18px 20px;
      margin: 24px 0;
      border: 1px solid var(--border);
    }

    .callout-takeaway {
      background: #FDFCF8;
      border-left: 4px solid var(--gold);
      border-color: #E8DECA;
    }

    .callout-tool {
      background: #F4F8FC;
      border-left: 4px solid var(--blue);
      border-color: #CBE0F5;
    }

    .callout-exercise {
      background: #F2FAF5;
      border-left: 4px solid var(--green);
      border-color: #C0E8D0;
    }

    .callout-quiz {
      background: #F8F5FE;
      border-left: 4px solid var(--purple);
      border-color: #DCD0F8;
    }

    body.dark-mode .callout-takeaway { background: #191712; border-color: #4A3E26; }
    body.dark-mode .callout-tool { background: #101824; border-color: #1E3A5F; }
    body.dark-mode .callout-exercise { background: #0E1E16; border-color: #1B4730; }
    body.dark-mode .callout-quiz { background: #171324; border-color: #382B5A; }

    .callout-title {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 8px;
    }

    .callout-takeaway .callout-title { color: #B3862A; }
    .callout-tool .callout-title { color: var(--blue); }
    .callout-exercise .callout-title { color: var(--green); }
    .callout-quiz .callout-title { color: var(--purple); }

    .callout-body {
      font-size: 14.5px;
      color: var(--text);
    }

    .quiz-option {
      padding: 8px 12px;
      margin: 6px 0;
      border-radius: var(--radius-sm);
      background: rgba(0,0,0,0.03);
      font-size: 13.5px;
      font-family: 'JetBrains Mono', monospace;
    }
    body.dark-mode .quiz-option {
      background: rgba(255,255,255,0.04);
    }
    .quiz-option.correct {
      border-left: 3px solid var(--green);
      background: rgba(16, 185, 129, 0.1);
      font-weight: 700;
    }

    .inline-code {
      font-family: 'JetBrains Mono', monospace;
      background: var(--bg-alt);
      border: 1px solid var(--border);
      padding: 1px 5px;
      border-radius: 4px;
      font-size: 0.9em;
      color: var(--accent);
    }

    /* Glossary Table */
    .glossary-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin-top: 24px;
    }

    .glossary-card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 18px 20px;
      transition: border-color 0.15s ease;
    }

    .glossary-card:hover {
      border-color: var(--accent);
    }

    .glossary-term {
      font-size: 18px;
      font-weight: 700;
      color: var(--text);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 6px;
    }

    .glossary-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 4px;
      background: var(--bg-alt);
      border: 1px solid var(--border);
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Print Styles */
    @media print {
      .sidebar, .top-toolbar, .btn, .no-print {
        display: none !important;
      }
      .app-layout {
        display: block;
      }
      .book-content {
        max-width: 100%;
        padding: 0;
      }
      .lesson-container {
        page-break-after: always;
      }
      body {
        background: #FFFFFF !important;
        color: #000000 !important;
        font-size: 12pt;
      }
      .diagram-box {
        background: #F5F5F5 !important;
        color: #000000 !important;
        border: 1px solid #CCCCCC !important;
      }
      .diagram-code {
        color: #000000 !important;
      }
    }
  </style>
</head>
<body>
  <div id="sidebarOverlay" class="sidebar-overlay" onclick="toggleSidebar()"></div>

  <div class="app-layout">
    <!-- Left Navigation Sidebar -->
    <aside id="bookSidebar" class="sidebar">
      <div class="sidebar-brand">
        <div style="font-family: 'Big Shoulders Display', sans-serif; font-size: 22px; font-weight: 900; line-height: 1; color: var(--accent);">
          THE HARDWIRE METHOD
        </div>
        <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: var(--text-dim); margin-top: 4px;">
          Music Theory for the Streets
        </div>
      </div>

      <div style="display: flex; gap: 8px;">
        <a href="/" class="btn" style="flex: 1; justify-content: center;">&larr; Web App</a>
        <button onclick="toggleTheme()" class="btn" title="Toggle Light / Dark Mode">&#9681; Theme</button>
      </div>

      <nav>
        <a href="#cover" class="nav-link active">00. Title &amp; Architecture</a>
        <a href="#toc" class="nav-link">Table of Contents</a>
        <a href="#philosophy" class="nav-link">Pedagogy &amp; Philosophy</a>`;

  CURRICULUM_MODULES.forEach((mod) => {
    html += `\n        <div class="nav-group-title">Module 0${mod.number}: ${escapeHtml(mod.title)}</div>`;
    mod.lessons.forEach((lesson) => {
      html += `\n        <a href="#${lesson.id}" class="nav-link">• L${lesson.lessonNumber}: ${escapeHtml(lesson.title)}</a>`;
    });
  });

  html += `\n        <div class="nav-group-title">Compendium</div>
        <a href="#glossary" class="nav-link">&#9670; Street-to-DAW Glossary</a>
      </nav>
    </aside>

    <!-- Reader Main Body -->
    <div class="reader-area">
      <!-- Sticky Top Header -->
      <header class="top-toolbar">
        <div style="display: flex; align-items: center; gap: 12px;">
          <button onclick="toggleSidebar()" class="btn" style="display: inline-flex;" id="mobileMenuBtn">
            &#9776; Contents
          </button>
          <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700; color: var(--text-dim);">
            COMPLETE HTML eBOOK EDITION
          </span>
        </div>

        <div class="toolbar-actions">
          <button onclick="window.print()" class="btn" title="Print or save as PDF via browser">
            &#128438; Print
          </button>
          <a href="/THE_HARDWIRE_METHOD_TEXTBOOK.pdf" download class="btn btn-accent" title="Download Printable PDF">
            &#8681; PDF
          </a>
          <a href="/THE_HARDWIRE_METHOD_TEXTBOOK.docx" download class="btn" title="Download Word / eBook .docx">
            &#8681; DOCX
          </a>
        </div>
      </header>

      <main class="book-content">
        <!-- BOOK COVER -->
        <section id="cover" class="book-cover">
          <div class="cover-badge">STANDALONE HTML eBOOK EDITION</div>
          <h1>THE HARDWIRE <span class="gold-text">METHOD</span></h1>
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; font-size: 20px; font-weight: 700; color: #ECE7DD; margin-bottom: 12px;">
            MUSIC THEORY FOR THE STREETS
          </div>
          <div style="font-family: 'Instrument Serif', Georgia, serif; font-size: 18px; font-style: italic; color: #A8A39D; margin-bottom: 36px;">
            Rap Cadence, Subdivision, MIDI Geometry, and Urban Production Theory
          </div>

          <div style="background: rgba(255,255,255,0.06); border: 1px solid var(--gold); border-radius: var(--radius-md); padding: 18px; max-width: 600px; margin: 0 auto 36px;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 13px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.05em;">
              FEEL IT FIRST &nbsp;&bull;&nbsp; NAME IT SECOND &nbsp;&bull;&nbsp; CONTROL IT THIRD
            </div>
          </div>

          <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #736E67;">
            The Hardwire Audio Research Labs &bull; Published ${timestamp} &bull; 100% Free &amp; Open
          </div>
        </section>

        <!-- TABLE OF CONTENTS -->
        <section id="toc" style="padding: 32px 0; border-bottom: 2px solid var(--border); margin-bottom: 48px;">
          <h2 style="font-size: 28px; margin-bottom: 16px;">Table of Contents</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px;">`;

  CURRICULUM_MODULES.forEach((mod) => {
    html += `
            <div style="background: var(--bg-alt); padding: 20px; border-radius: var(--radius-md); border: 1px solid var(--border);">
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: var(--accent); margin-bottom: 4px;">
                MODULE 0${mod.number}
              </div>
              <div style="font-weight: 800; font-size: 17px; margin-bottom: 8px;">${escapeHtml(mod.title)}</div>
              <ul style="list-style: none; padding-left: 0; font-size: 13px; color: var(--text-muted); line-height: 1.6;">`;
    mod.lessons.forEach((l) => {
      html += `\n                <li><a href="#${l.id}" style="color: inherit; text-decoration: none;">&bull; <strong>L${l.lessonNumber}:</strong> ${escapeHtml(l.title)}</a></li>`;
    });
    html += `\n              </ul>
            </div>`;
  });

  html += `
          </div>
        </section>

        <!-- PHILOSOPHY SECTION -->
        <section id="philosophy" style="padding: 32px 0; border-bottom: 2px solid var(--border); margin-bottom: 48px;">
          <div class="module-num-badge">PEDAGOGICAL FOUNDATION</div>
          <h2 style="font-size: 32px; margin-bottom: 16px;">Curriculum Architecture &amp; The Hardwire Philosophy</h2>
          <div class="section-content">
            <p>
              Traditional music theory pedagogy begins with abstract visual notation — staves, clefs, and key signatures developed centuries before the invention of the DAW. For modern producers, beatmakers, and hip-hop artists, this approach introduces unnecessary gatekeeping.
            </p>
            <p>
              <strong>The Hardwire Method</strong> inverts the classical paradigm. Hip-hop creators already possess sophisticated intuitive mastery over rhythm, syncopation, pocket drag, harmonic tension, and vocal bounce. The purpose of this curriculum is not to teach you how to feel music — you already feel it. The purpose is to provide the precise technical, MIDI, and acoustic vocabulary necessary to intentionally command that instinct inside any Digital Audio Workstation.
            </p>
          </div>
        </section>`;

  // RENDER ALL CURRICULUM MODULES & LESSONS
  CURRICULUM_MODULES.forEach((mod) => {
    html += `
        <!-- MODULE ${mod.number}: ${escapeHtml(mod.title)} -->
        <section id="module-${mod.number}" class="module-hero">
          <div class="module-num-badge">VOLUME I &bull; CURRICULUM MODULE 0${mod.number}</div>
          <h2 class="module-title">${escapeHtml(mod.title)}</h2>
          <div class="module-subtitle">${escapeHtml(mod.subtitle)}</div>
          <div style="background: var(--bg-alt); border-left: 4px solid var(--accent); padding: 16px 20px; border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-bottom: 20px;">
            <div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; color: var(--accent); margin-bottom: 4px;">
              CORE INQUIRY
            </div>
            <div style="font-size: 16px; font-weight: 700; color: var(--text);">
              "${escapeHtml(mod.coreQuestion)}"
            </div>
          </div>
          <p style="font-size: 16px; color: var(--text-muted); line-height: 1.8;">
            ${escapeHtml(mod.description)}
          </p>
        </section>`;

    mod.lessons.forEach((lesson) => {
      html += `
        <!-- LESSON ${lesson.lessonNumber}: ${escapeHtml(lesson.title)} -->
        <article id="${lesson.id}" class="lesson-container">
          <header class="lesson-header">
            <div class="lesson-meta">MODULE 0${mod.number} &bull; LESSON ${lesson.lessonNumber}</div>
            <h3 class="lesson-title">${escapeHtml(lesson.title)}</h3>
            <div class="lesson-subtitle">${escapeHtml(lesson.subtitle)}</div>
            <div class="lesson-core-question">
              <strong>Core Question:</strong> "${escapeHtml(lesson.coreQuestion)}"
            </div>
            <p class="lesson-summary">
              ${escapeHtml(lesson.summary)}
            </p>
          </header>`;

      lesson.sections.forEach((sec) => {
        html += `
          <div class="section-block">
            <h4 class="section-heading">${escapeHtml(sec.heading)}</h4>
            <div class="section-content">
              <p>${renderMarkdownText(sec.content)}</p>
            </div>`;

        if (sec.diagram) {
          html += `
            <div class="diagram-box">
              <div class="diagram-header">// SYSTEM TIMELINE &amp; COORDINATE MATRIX</div>
              <pre class="diagram-code"><code>${escapeHtml(sec.diagram.code)}</code></pre>
              ${sec.diagram.caption ? `<div class="diagram-caption">${escapeHtml(sec.diagram.caption)}</div>` : ''}
            </div>`;
        }

        if (sec.keyTakeaway) {
          html += `
            <div class="callout callout-takeaway">
              <div class="callout-title">&#9733; Key Production Takeaway</div>
              <div class="callout-body">
                ${renderMarkdownText(sec.keyTakeaway)}
              </div>
            </div>`;
        }

        html += `</div>`;
      });

      if (lesson.toolMapping) {
        html += `
          <div class="callout callout-tool">
            <div class="callout-title">&#128187; DAW Tool Mapping: ${escapeHtml(lesson.toolMapping.dawFeature)}</div>
            <div class="callout-body">
              <p style="margin-bottom: 8px;"><strong>Function:</strong> ${renderMarkdownText(lesson.toolMapping.description)}</p>
              ${lesson.toolMapping.proTip ? `<p style="font-size: 13.5px; color: var(--blue);"><strong>Pro-Tip:</strong> ${renderMarkdownText(lesson.toolMapping.proTip)}</p>` : ''}
            </div>
          </div>`;
      }

      if (lesson.exercise) {
        html += `
          <div class="callout callout-exercise">
            <div class="callout-title">&#9881; Concrete Studio Exercise: ${escapeHtml(lesson.exercise.actionLabel)}</div>
            <div class="callout-body">
              <p style="margin-bottom: 8px;"><strong>Instruction:</strong> ${renderMarkdownText(lesson.exercise.instruction)}</p>
              <p style="font-size: 13.5px; color: var(--green);"><strong>Objective:</strong> ${renderMarkdownText(lesson.exercise.objective)}</p>
            </div>
          </div>`;
      }

      if (lesson.quiz) {
        html += `
          <div class="callout callout-quiz">
            <div class="callout-title">&#10004; Self-Assessment Comprehension Check</div>
            <div class="callout-body">
              <p style="font-weight: 700; margin-bottom: 10px;">${escapeHtml(lesson.quiz.question)}</p>
              <div style="margin-bottom: 12px;">`;
        lesson.quiz.options.forEach((opt, idx) => {
          const isCorrect = idx === lesson.quiz.correctIndex;
          html += `\n                <div class="quiz-option ${isCorrect ? 'correct' : ''}">
                  <strong>${String.fromCharCode(65 + idx)}.</strong> ${escapeHtml(opt)} ${isCorrect ? '<span style="color: var(--green); font-size: 11px; margin-left: 8px;">[CORRECT ANSWER]</span>' : ''}
                </div>`;
        });
        html += `\n              </div>
              <div style="font-size: 13.5px; color: var(--purple); font-style: italic;">
                <strong>Explanation:</strong> ${renderMarkdownText(lesson.quiz.explanation)}
              </div>
            </div>
          </div>`;
      }

      html += `\n        </article>`;
    });
  });

  // RENDER STREET-TO-DAW GLOSSARY
  html += `
        <!-- COMPENDIUM GLOSSARY -->
        <section id="glossary" style="padding: 48px 0;">
          <div class="module-num-badge">APPENDIX &bull; COMPREHENSIVE COMPENDIUM</div>
          <h2 style="font-size: 32px; margin-bottom: 12px;">Street-to-DAW Audio Glossary</h2>
          <p style="font-size: 16px; color: var(--text-muted); margin-bottom: 24px;">
            The complete technical bridge between colloquial music creation terminology and DAW engineering parameters.
          </p>

          <div class="glossary-grid">`;

  VOCABULARY_LIST.forEach((item, index) => {
    html += `
            <div class="glossary-card">
              <div class="glossary-term">
                <span>${index + 1}. ${escapeHtml(item.term)}</span>
                <span class="glossary-badge">${escapeHtml(item.moduleName)} &bull; ${escapeHtml(item.audioCategory)}</span>
              </div>
              <p style="font-size: 14.5px; color: var(--text); margin-bottom: 8px;">
                <strong>Definition:</strong> ${escapeHtml(item.definition)}
              </p>
              <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 8px; font-style: italic;">
                <strong>Practical Application:</strong> ${escapeHtml(item.practicalApplication)}
              </p>
              <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--blue);">
                DAW Feature: <strong>${escapeHtml(item.dawFeature)}</strong>
              </div>
            </div>`;
  });

  html += `
          </div>
        </section>

        <!-- FOOTER -->
        <footer style="margin-top: 80px; padding: 40px 0; border-top: 2px solid var(--border); text-align: center; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--text-dim);">
          <div style="font-size: 14px; font-weight: 700; color: var(--accent); margin-bottom: 8px;">
            FEEL IT FIRST &bull; NAME IT SECOND &bull; CONTROL IT THIRD
          </div>
          <div>THE HARDWIRE METHOD &bull; MUSIC THEORY FOR THE STREETS</div>
        </footer>
      </main>
    </div>
  </div>

  <script>
    function toggleSidebar() {
      const sidebar = document.getElementById('bookSidebar');
      const overlay = document.getElementById('sidebarOverlay');
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    }

    function toggleTheme() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('hw-theme', isDark ? 'dark' : 'light');
    }

    // Restore saved theme
    if (localStorage.getItem('hw-theme') === 'dark') {
      document.body.classList.add('dark-mode');
    }

    // Active link observer
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], article[id]');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 120) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
          link.classList.add('active');
        }
      });
    });
  </script>
</body>
</html>`;

  return html;
}

// Generate files if run directly
const htmlContent = generateHtmlBook();
const rootPath = path.join(process.cwd(), 'THE_HARDWIRE_METHOD_TEXTBOOK.html');
const publicPath = path.join(process.cwd(), 'public', 'THE_HARDWIRE_METHOD_TEXTBOOK.html');

fs.writeFileSync(rootPath, htmlContent, 'utf8');
console.log('Successfully generated HTML eBook at:', rootPath);

fs.writeFileSync(publicPath, htmlContent, 'utf8');
console.log('Successfully copied HTML eBook to web public directory:', publicPath);
