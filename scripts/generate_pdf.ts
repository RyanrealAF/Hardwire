import * as fs from 'fs';
import * as path from 'path';
import PDFDocument from 'pdfkit';
import { CURRICULUM_MODULES } from '../src/data/curriculumData';
import { VOCABULARY_LIST } from '../src/data/vocabularyData';

async function generatePDF(): Promise<void> {
  console.log('Generating Standalone Printable PDF of The Hardwire Method Textbook...');

  const outputPath = path.join(process.cwd(), 'THE_HARDWIRE_METHOD_TEXTBOOK.pdf');
  const publicPath = path.join(process.cwd(), 'public', 'THE_HARDWIRE_METHOD_TEXTBOOK.pdf');

  // Ensure public directory exists
  if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
    fs.mkdirSync(path.join(process.cwd(), 'public'), { recursive: true });
  }

  // Create PDF Document in Letter size with 54pt (0.75 in) margins
  const doc = new PDFDocument({
    size: 'LETTER',
    margins: { top: 54, bottom: 54, left: 54, right: 54 },
    bufferPages: true,
    autoFirstPage: true
  });

  const writeStream = fs.createWriteStream(outputPath);
  doc.pipe(writeStream);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const contentWidth = pageWidth - 108; // 504 pt

  // =========================================================================
  // HELPER FUNCTIONS FOR DRAWING
  // =========================================================================

  function drawBoxedText(
    title: string,
    content: string,
    accentColor: string = '#D97706',
    bgColor: string = '#F9F8F6',
    borderColor: string = '#E5E1DA'
  ) {
    doc.moveDown(0.5);
    
    // Measure content height
    doc.fontSize(9.5).font('Helvetica');
    const textHeight = doc.heightOfString(content, { width: contentWidth - 28 });
    const boxHeight = textHeight + (title ? 28 : 16);

    // If box fits comfortably on a single page, draw container
    if (boxHeight < pageHeight - 130) {
      if (doc.y + boxHeight > pageHeight - 65) {
        doc.addPage();
      }

      const y = doc.y;
      // Background fill
      doc.rect(54, y, contentWidth, boxHeight).fillAndStroke(bgColor, borderColor);

      // Left accent bar
      doc.rect(54, y, 4, boxHeight).fill(accentColor);

      let textY = y + 8;
      if (title) {
        doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#1A1A1A').text(title, 68, textY, { width: contentWidth - 28 });
        textY += 15;
      }

      doc.fontSize(9).font('Helvetica').fillColor('#2D2A26').text(content, 68, textY, {
        width: contentWidth - 28,
        lineGap: 2
      });

      doc.y = y + boxHeight + 6;
      doc.fillColor('#1A1A1A');
    } else {
      // For longer content, flow text cleanly across pages
      if (doc.y > pageHeight - 100) doc.addPage();
      
      if (title) {
        doc.fontSize(10.5).font('Helvetica-Bold').fillColor(accentColor).text(title);
        doc.moveDown(0.2);
      }
      doc.fontSize(9).font('Helvetica').fillColor('#2D2A26').text(content, {
        width: contentWidth,
        lineGap: 2.5
      });
      doc.moveDown(0.5);
      doc.fillColor('#1A1A1A');
    }
  }

  function drawDiagramBox(code: string, caption?: string) {
    doc.moveDown(0.5);
    doc.fontSize(8).font('Courier');
    const textHeight = doc.heightOfString(code, { width: contentWidth - 24 });
    const boxHeight = textHeight + (caption ? 32 : 24);

    if (doc.y + boxHeight > pageHeight - 65) {
      doc.addPage();
    }

    const y = doc.y;
    // Dark terminal container for diagrams
    doc.rect(54, y, contentWidth, boxHeight).fillAndStroke('#131316', '#2A2A30');

    // Header label
    doc.fontSize(7.5).font('Courier-Bold').fillColor('#FF5A1F').text('// SYSTEM TIMELINE & COORDINATE MATRIX', 66, y + 6);

    // Code text
    doc.fontSize(8).font('Courier').fillColor('#ECE7DD').text(code, 66, y + 18, {
      width: contentWidth - 24,
      lineGap: 1.5
    });

    if (caption) {
      doc.fontSize(7.5).font('Helvetica-Oblique').fillColor('#8A888F').text(caption, 66, y + boxHeight - 10);
    }

    doc.y = y + boxHeight + 8;
    doc.fillColor('#1A1A1A');
  }

  // =========================================================================
  // 1. COVER PAGE
  // =========================================================================
  
  // Background aesthetic border
  doc.rect(20, 20, pageWidth - 40, pageHeight - 40).stroke('#C5A059');
  doc.rect(24, 24, pageWidth - 48, pageHeight - 48).stroke('#E5E1DA');

  doc.y = 80;

  // Header Tag
  doc.fontSize(11).font('Courier-Bold').fillColor('#FF5A1F').text('STANDALONE PRINTABLE EDITION • CURRICULUM VERSION 2.5', {
    align: 'center',
    characterSpacing: 2
  });

  doc.moveDown(2);

  // Main Title
  doc.fontSize(36).font('Helvetica-Bold').fillColor('#1A1A1A').text('THE HARDWIRE', {
    align: 'center',
    characterSpacing: 3
  });
  doc.fontSize(36).font('Helvetica-Bold').fillColor('#C5A059').text('METHOD', {
    align: 'center',
    characterSpacing: 4
  });

  doc.moveDown(1);
  doc.fontSize(14).font('Helvetica-Bold').fillColor('#2D2A26').text('MUSIC THEORY FOR THE STREETS', {
    align: 'center',
    characterSpacing: 2
  });

  doc.moveDown(0.5);
  doc.fontSize(11).font('Helvetica-Oblique').fillColor('#555555').text(
    'Rap Cadence, Subdivision, MIDI Geometry, Frequency Allocation & Sonic Interplay',
    { align: 'center' }
  );

  doc.moveDown(2.5);

  // Pedagogical Banner
  const bannerY = doc.y;
  doc.rect(54, bannerY, contentWidth, 42).fillAndStroke('#1A1A1A', '#C5A059');
  doc.fontSize(12).font('Courier-Bold').fillColor('#FDFCFB').text(
    'FEEL IT FIRST  ➔  NAME IT SECOND  ➔  CONTROL IT THIRD',
    54,
    bannerY + 14,
    { align: 'center', width: contentWidth }
  );

  doc.y = bannerY + 65;

  // Cover Summary Narrative
  doc.fontSize(10.5).font('Helvetica').fillColor('#2D2A26').text(
    'A complete, zero-fluff, production-ready curriculum designed for street-level vocalists, beatmakers, and self-taught producers. Eliminates traditional sheet music in favor of physical timelines, millisecond offsets, 2D MIDI coordinates, and acoustic frequency carving.',
    54,
    doc.y,
    { align: 'center', width: contentWidth, lineGap: 4 }
  );

  doc.y = pageHeight - 140;

  // Bottom Metadata
  doc.fontSize(9).font('Courier').fillColor('#666666').text('THE HARDWIRE AUDIO RESEARCH LABS • DEFINITIVE EXTENDED PRINT EDITION', {
    align: 'center'
  });
  doc.moveDown(0.3);
  doc.fontSize(8.5).font('Courier').fillColor('#888888').text(
    'Standard US Letter Format • 100% Algorithmic Engineering • Zero External Audio Dependencies',
    { align: 'center' }
  );

  // =========================================================================
  // 2. TABLE OF CONTENTS
  // =========================================================================
  doc.addPage();
  doc.y = 54;

  doc.fontSize(20).font('Helvetica-Bold').fillColor('#1A1A1A').text('TABLE OF CONTENTS', { characterSpacing: 1 });
  doc.fontSize(10).font('Helvetica-Oblique').fillColor('#8B8378').text('The Complete 3-Volume Street Theory Curriculum');
  doc.moveDown(0.5);
  doc.strokeColor('#C5A059').lineWidth(1.5).moveTo(54, doc.y).lineTo(54 + contentWidth, doc.y).stroke();
  doc.moveDown(1);

  CURRICULUM_MODULES.forEach((mod) => {
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica-Bold').fillColor('#C5A059').text(
      `MODULE 0${mod.number}: ${mod.title} — ${mod.subtitle.toUpperCase()}`
    );
    doc.fontSize(9).font('Helvetica-Oblique').fillColor('#666666').text(
      `Tagline: ${mod.tagline} | Core Inquiry: "${mod.coreQuestion}"`
    );
    doc.moveDown(0.3);

    mod.lessons.forEach((l) => {
      doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#2D2A26').text(
        `  • Lesson ${l.lessonNumber}: ${l.title}`,
        { continued: true }
      );
      doc.font('Helvetica-Oblique').fillColor('#777777').text(` — ${l.subtitle} `);
    });
  });

  doc.moveDown(0.8);
  doc.fontSize(12).font('Helvetica-Bold').fillColor('#C5A059').text(
    'APPENDIX: STREET-TO-DAW AUDIO GLOSSARY'
  );
  doc.fontSize(9.5).font('Helvetica').fillColor('#444444').text(
    '  • 35+ Essential Street Production & Engineering Terms with Parameter Mappings'
  );

  // =========================================================================
  // 3. CURRICULUM ARCHITECTURE & PHILOSOPHY
  // =========================================================================
  doc.addPage();
  doc.y = 54;

  doc.fontSize(18).font('Helvetica-Bold').fillColor('#1A1A1A').text('CURRICULUM ARCHITECTURE & PHILOSOPHY');
  doc.fontSize(10).font('Helvetica-Oblique').fillColor('#8B8378').text('Why The Hardwire Method Works Where Traditional Theory Fails');
  doc.moveDown(0.5);
  doc.strokeColor('#1A1A1A').lineWidth(1).moveTo(54, doc.y).lineTo(54 + contentWidth, doc.y).stroke();
  doc.moveDown(1);

  doc.fontSize(10).font('Helvetica').fillColor('#2D2A26').text(
    `Traditional music theory pedagogy begins with abstract visual notation: clefs, staves, key signatures, and Italian terminology invented in the 17th century. For modern creators operating in digital audio workstations (DAWs), mobile beatmakers, and self-taught street lyricists, this approach introduces unnecessary friction and cognitive estrangement.

The Hardwire Method completely rebuilds musical pedagogy around the physics of digital audio:

1. The Physical Timeline Over the Staff: In modern music, time is not an elastic set of measures on paper; it is a moving millisecond highway running from left to right. Every kick, snare transient, and vocal syllable occupies a measurable coordinate in time.

2. The Cartesian Matrix Over the Keyboard: The DAW Piano Roll is a 2D Cartesian grid where the X-axis is Time (bars, beats, sixteenth subdivisions) and the Y-axis is Frequency (pitch in Hertz).

3. The Three-Stage Pedagogical Loop:
   • FEEL (Kinesthetic Entrainment): Physical motor anchoring, hand tapping, dynamic breath control.
   • SEE / MAP (Spatial Translation): Visualizing notes on the piano roll and waveforms on the audio track.
   • CONTROL (Intentional Execution): Microtiming offsets, velocity sculpting, and frequency carving.`,
    { lineGap: 3.5 }
  );

  drawBoxedText(
    'THE HARDWIRE PRIME DIRECTIVE',
    'Never introduce an abstract musical term without immediately connecting it to: (1) a visceral physical sensation, (2) an exact DAW screen control, and (3) an actionable studio exercise.',
    '#C5A059',
    '#FDFCFB',
    '#C5A059'
  );

  // =========================================================================
  // 4. MODULES & LESSONS CONTENT
  // =========================================================================

  CURRICULUM_MODULES.forEach((module) => {
    // Module Cover Page
    doc.addPage();
    doc.y = 120;

    // Module Header
    doc.fontSize(12).font('Courier-Bold').fillColor('#FF5A1F').text(`VOLUME I • CURRICULUM MODULE 0${module.number}`, {
      characterSpacing: 2
    });
    doc.moveDown(0.5);
    doc.fontSize(28).font('Helvetica-Bold').fillColor('#1A1A1A').text(module.title);
    doc.fontSize(16).font('Helvetica').fillColor('#C5A059').text(module.subtitle);

    doc.moveDown(1);
    doc.strokeColor('#C5A059').lineWidth(2).moveTo(54, doc.y).lineTo(54 + contentWidth, doc.y).stroke();
    doc.moveDown(1.5);

    doc.fontSize(12).font('Helvetica-Bold').fillColor('#2D2A26').text(`CORE INQUIRY: "${module.coreQuestion}"`);
    doc.moveDown(0.8);

    doc.fontSize(10.5).font('Helvetica').fillColor('#333333').text(module.description, {
      lineGap: 4
    });

    doc.moveDown(1.5);

    drawBoxedText(
      'PEDAGOGICAL STAGE PROGRESSION',
      `This module guides you through ${module.lessons.length} structured masterclasses, transitioning from raw motor instinct to high-precision digital control. Follow each lesson, analyze the diagrams, and execute the studio exercises.`,
      '#FF5A1F',
      '#F9F8F6',
      '#E5E1DA'
    );

    // Render Each Lesson in this Module
    module.lessons.forEach((lesson) => {
      doc.addPage();
      doc.y = 54;

      // Lesson Header Strip
      doc.fontSize(9).font('Courier-Bold').fillColor('#FF5A1F').text(
        `MODULE 0${module.number} • LESSON ${lesson.lessonNumber} [${lesson.pedagogicalStage.toUpperCase()}]`,
        { characterSpacing: 1.5 }
      );
      doc.moveDown(0.2);

      // Title
      doc.fontSize(18).font('Helvetica-Bold').fillColor('#1A1A1A').text(lesson.title);
      doc.fontSize(11).font('Helvetica-Oblique').fillColor('#C5A059').text(lesson.subtitle);
      doc.moveDown(0.4);

      // Dividing Rule
      doc.strokeColor('#E5E1DA').lineWidth(1).moveTo(54, doc.y).lineTo(54 + contentWidth, doc.y).stroke();
      doc.moveDown(0.6);

      // Core Question & Summary
      doc.fontSize(9.5).font('Helvetica-Bold').fillColor('#2D2A26').text('Core Question: ', { continued: true });
      doc.font('Helvetica-Oblique').fillColor('#555555').text(`"${lesson.coreQuestion}"`);
      doc.moveDown(0.3);

      doc.fontSize(9.5).font('Helvetica').fillColor('#444444').text(lesson.summary, { lineGap: 2 });
      doc.moveDown(0.8);

      // Sections
      lesson.sections.forEach((sec) => {
        // Check if heading fits
        if (doc.y > pageHeight - 100) {
          doc.addPage();
        }

        doc.fontSize(12).font('Helvetica-Bold').fillColor('#1A1A1A').text(sec.heading);
        doc.moveDown(0.3);

        doc.fontSize(9.5).font('Helvetica').fillColor('#2D2A26').text(sec.content, {
          lineGap: 3
        });

        if (sec.diagram) {
          drawDiagramBox(sec.diagram.code, sec.diagram.caption);
        }

        if (sec.keyTakeaway) {
          drawBoxedText('KEY PRODUCTION TAKEAWAY', sec.keyTakeaway, '#C5A059', '#FDFCFB', '#C5A059');
        }

        doc.moveDown(0.6);
      });

      // Tool Mapping (DAW Translation)
      if (lesson.toolMapping) {
        if (doc.y > pageHeight - 140) doc.addPage();
        drawBoxedText(
          `DAW TOOL MAPPING: ${lesson.toolMapping.dawFeature}`,
          `Function: ${lesson.toolMapping.description}\n\nPro-Tip: ${lesson.toolMapping.proTip}`,
          '#3B82F6',
          '#F4F7FB',
          '#BFDBFE'
        );
      }

      // Hands-on Exercise
      if (lesson.exercise) {
        if (doc.y > pageHeight - 120) doc.addPage();
        drawBoxedText(
          `CONCRETE STUDIO EXERCISE: ${lesson.exercise.actionLabel}`,
          `Instruction: ${lesson.exercise.instruction}\n\nObjective: ${lesson.exercise.objective}`,
          '#10B981',
          '#F0FDF4',
          '#A7F3D0'
        );
      }

      // Quiz
      if (lesson.quiz) {
        if (doc.y > pageHeight - 160) doc.addPage();
        
        let quizText = `Question: ${lesson.quiz.question}\n\n`;
        lesson.quiz.options.forEach((opt, idx) => {
          const isCorrect = idx === lesson.quiz.correctIndex;
          quizText += `  ${String.fromCharCode(65 + idx)}) ${opt}${isCorrect ? '  [CORRECT]' : ''}\n`;
        });
        quizText += `\nExplanation: ${lesson.quiz.explanation}`;

        drawBoxedText(
          'SELF-ASSESSMENT COMPREHENSION CHECK',
          quizText,
          '#8B5CF6',
          '#FAF5FF',
          '#DDD6FE'
        );
      }
    });
  });

  // =========================================================================
  // 5. APPENDIX: STREET-TO-DAW GLOSSARY
  // =========================================================================
  doc.addPage();
  doc.y = 54;

  doc.fontSize(20).font('Helvetica-Bold').fillColor('#1A1A1A').text('APPENDIX: STREET-TO-DAW AUDIO GLOSSARY');
  doc.fontSize(10).font('Helvetica-Oblique').fillColor('#8B8378').text('35+ Production Terms Translated from Street Instinct to Engineering Coordinates');
  doc.moveDown(0.5);
  doc.strokeColor('#C5A059').lineWidth(1.5).moveTo(54, doc.y).lineTo(54 + contentWidth, doc.y).stroke();
  doc.moveDown(1);

  VOCABULARY_LIST.forEach((item, index) => {
    if (doc.y > pageHeight - 90) {
      doc.addPage();
    }

    doc.fontSize(11).font('Helvetica-Bold').fillColor('#1A1A1A').text(`${index + 1}. ${item.term}`, { continued: true });
    doc.fontSize(9).font('Courier-Bold').fillColor('#FF5A1F').text(`  [${item.moduleName.toUpperCase()} • ${item.audioCategory.toUpperCase()}]`);

    doc.fontSize(9.5).font('Helvetica').fillColor('#2D2A26').text(`Definition: ${item.definition}`, { lineGap: 1.5 });
    doc.fontSize(9.5).font('Helvetica-Oblique').fillColor('#444444').text(`Practical Application: ${item.practicalApplication}`);
    doc.fontSize(9).font('Courier').fillColor('#2563EB').text(`DAW Feature / Control: ${item.dawFeature}`);

    doc.moveDown(0.6);
    doc.strokeColor('#EFECE6').lineWidth(0.5).moveTo(54, doc.y).lineTo(54 + contentWidth, doc.y).stroke();
    doc.moveDown(0.6);
  });

  // =========================================================================
  // 6. RUNNING HEADERS & FOOTERS (2-PASS APPLIED TO BUFFERED PAGES)
  // =========================================================================
  const totalPages = doc.bufferedPageRange().count;

  for (let i = 0; i < totalPages; i++) {
    doc.switchToPage(i);

    // Skip Header and Footer on Cover Page (Page 0)
    if (i === 0) continue;

    // Running Header
    doc.fontSize(7.5).font('Courier-Bold').fillColor('#8B8378').text(
      'THE HARDWIRE METHOD • MUSIC THEORY FOR THE STREETS',
      54,
      32,
      { width: contentWidth, align: 'left' }
    );
    doc.fontSize(7.5).font('Courier').fillColor('#8B8378').text(
      'STANDALONE PRINTABLE EDITION',
      54,
      32,
      { width: contentWidth, align: 'right' }
    );
    doc.strokeColor('#E5E1DA').lineWidth(0.5).moveTo(54, 44).lineTo(54 + contentWidth, 44).stroke();

    // Running Footer
    doc.strokeColor('#E5E1DA').lineWidth(0.5).moveTo(54, pageHeight - 44).lineTo(54 + contentWidth, pageHeight - 44).stroke();
    doc.fontSize(7.5).font('Courier').fillColor('#8B8378').text(
      'Feel it. Name it. See it. Control it.',
      54,
      pageHeight - 34,
      { width: contentWidth, align: 'left' }
    );
    doc.fontSize(7.5).font('Courier-Bold').fillColor('#1A1A1A').text(
      `Page ${i + 1} of ${totalPages}`,
      54,
      pageHeight - 34,
      { width: contentWidth, align: 'right' }
    );
  }

  doc.end();

  await new Promise((resolve, reject) => {
    writeStream.on('finish', () => {
      fs.copyFileSync(outputPath, publicPath);
      console.log(`Successfully generated PDF textbook at: ${outputPath}`);
      console.log(`Successfully copied PDF textbook to web public directory: ${publicPath}`);
      resolve(true);
    });
    writeStream.on('error', reject);
  });
}

generatePDF().catch((err) => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
