import * as fs from 'fs';
import * as path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  WidthType,
  ShadingType,
  PageBreak,
  Header,
  Footer,
  PageNumber,
  NumberFormat,
  TableOfContents
} from 'docx';
import { CURRICULUM_MODULES } from '../src/data/curriculumData';
import { VOCABULARY_LIST } from '../src/data/vocabularyData';

// Visual Style Palette
const COLOR_PRIMARY = '0F172A'; // Dark Slate
const COLOR_ACCENT = 'EA580C';  // Safety Orange / Street Hardwire
const COLOR_CYAN = '0D9488';    // Teal / Cyan
const COLOR_TEXT = '1E293B';    // Charcoal
const COLOR_MUTED = '64748B';   // Muted Slate
const COLOR_BG_LIGHT = 'F8FAFC';// Off-white / light slate
const COLOR_BOX_BG = 'F1F5F9';  // Callout background
const COLOR_BORDER = 'CBD5E1';  // Light border

const FONT_PRIMARY = 'Calibri';
const FONT_CODE = 'Consolas';

function createCalloutBox(title: string, content: string, borderColor: string = COLOR_ACCENT): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 140, bottom: 140, left: 200, right: 200 },
    borders: {
      top: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.SINGLE, size: 24, color: borderColor }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: COLOR_BOX_BG, type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                spacing: { before: 80, after: 60 },
                children: [
                  new TextRun({
                    text: title.toUpperCase(),
                    bold: true,
                    size: 20,
                    color: borderColor,
                    font: FONT_PRIMARY
                  })
                ]
              }),
              new Paragraph({
                spacing: { before: 0, after: 80 },
                children: [
                  new TextRun({
                    text: content,
                    size: 21,
                    color: COLOR_TEXT,
                    font: FONT_PRIMARY
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });
}

function createDiagramBox(title: string, code: string): Table {
  const lines = code.split('\n');
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 120, bottom: 120, left: 160, right: 160 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
      right: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
      left: { style: BorderStyle.SINGLE, size: 20, color: COLOR_CYAN }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: '0F172A', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                spacing: { before: 60, after: 60 },
                children: [
                  new TextRun({
                    text: `DIAGRAM: ${title.toUpperCase()}`,
                    bold: true,
                    size: 18,
                    color: '38BDF8',
                    font: FONT_PRIMARY
                  })
                ]
              }),
              ...lines.map(line => 
                new Paragraph({
                  spacing: { before: 20, after: 20 },
                  children: [
                    new TextRun({
                      text: line,
                      size: 19,
                      color: 'F8FAFC',
                      font: FONT_CODE
                    })
                  ]
                })
              )
            ]
          })
        ]
      })
    ]
  });
}

function createToolMappingTable(dawFeature: string, description: string, proTip: string): Table {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    margins: { top: 100, bottom: 100, left: 140, right: 140 },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
      left: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
      right: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER }
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 30, type: WidthType.PERCENTAGE },
            shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'DAW Feature / Control', bold: true, size: 20, color: COLOR_PRIMARY, font: FONT_PRIMARY })]
              })
            ]
          }),
          new TableCell({
            width: { size: 70, type: WidthType.PERCENTAGE },
            shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [new TextRun({ text: dawFeature, bold: true, size: 20, color: COLOR_ACCENT, font: FONT_PRIMARY })]
              })
            ]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Function & Usage', bold: true, size: 19, color: COLOR_MUTED, font: FONT_PRIMARY })]
              })
            ]
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: description, size: 20, color: COLOR_TEXT, font: FONT_PRIMARY })]
              })
            ]
          })
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: 'Pro Engineer Tip', bold: true, size: 19, color: COLOR_CYAN, font: FONT_PRIMARY })]
              })
            ]
          }),
          new TableCell({
            shading: { fill: 'F0FDFA', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [new TextRun({ text: proTip, italics: true, size: 20, color: '115E59', font: FONT_PRIMARY })]
              })
            ]
          })
        ]
      })
    ]
  });
}

function buildDocument(): Document {
  const children: (Paragraph | Table)[] = [];

  // ==========================================
  // 1. COVER PAGE
  // ==========================================
  children.push(
    new Paragraph({
      spacing: { before: 1200, after: 200 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'THE HARDWIRE METHOD',
          bold: true,
          size: 52,
          color: COLOR_ACCENT,
          font: FONT_PRIMARY
        })
      ]
    }),
    new Paragraph({
      spacing: { before: 0, after: 400 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Music Theory for the Streets',
          bold: true,
          size: 32,
          color: COLOR_PRIMARY,
          font: FONT_PRIMARY
        })
      ]
    }),
    new Paragraph({
      spacing: { before: 200, after: 600 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'FEEL IT FIRST. NAME IT SECOND. CONTROL IT THIRD.',
          bold: true,
          italics: true,
          size: 22,
          color: COLOR_CYAN,
          font: FONT_PRIMARY
        })
      ]
    }),
    new Paragraph({
      spacing: { before: 400, after: 1200 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'A Complete Digital Textbook & Digital Audio Workstation Engineering Compendium for Contemporary Beatmakers, Vocalists, and Audio Engineers.',
          size: 22,
          color: COLOR_MUTED,
          font: FONT_PRIMARY
        })
      ]
    }),
    new Paragraph({
      spacing: { before: 800, after: 200 },
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({
          text: 'Version 2.4 — Complete Unified Edition with TOC, Technical Diagrams, Audio Calculations & Full Glossary',
          size: 18,
          color: COLOR_MUTED,
          font: FONT_PRIMARY
        })
      ]
    }),
    new Paragraph({
      children: [new PageBreak()]
    })
  );

  // ==========================================
  // 2. TABLE OF CONTENTS / PREFACE
  // ==========================================
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 300 },
      children: [
        new TextRun({
          text: 'TABLE OF CONTENTS & CURRICULUM ROADMAP',
          bold: true,
          size: 32,
          color: COLOR_PRIMARY,
          font: FONT_PRIMARY
        })
      ]
    }),
    new Paragraph({
      spacing: { before: 100, after: 300 },
      children: [
        new TextRun({
          text: 'The Hardwire Method is organized into three rigorous pedagogical modules, progressing from biological clock entrainment to digital coordinate physics, culminating in the intentional manipulation of human imperfection.',
          size: 21,
          color: COLOR_TEXT,
          font: FONT_PRIMARY
        })
      ]
    })
  );

  // Table of contents summary table
  const tocRows: TableRow[] = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Unit', bold: true, size: 20, font: FONT_PRIMARY })] })]
        }),
        new TableCell({
          width: { size: 60, type: WidthType.PERCENTAGE },
          shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Topic & Core Theory', bold: true, size: 20, font: FONT_PRIMARY })] })]
        }),
        new TableCell({
          width: { size: 20, type: WidthType.PERCENTAGE },
          shading: { fill: 'E2E8F0', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Stage', bold: true, size: 20, font: FONT_PRIMARY })] })]
        })
      ]
    })
  ];

  CURRICULUM_MODULES.forEach(mod => {
    tocRows.push(
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [new TextRun({ text: `MODULE 0${mod.number}`, bold: true, size: 20, color: COLOR_ACCENT, font: FONT_PRIMARY })]
              })
            ]
          }),
          new TableCell({
            shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: `${mod.title}: `, bold: true, size: 20, color: COLOR_PRIMARY, font: FONT_PRIMARY }),
                  new TextRun({ text: mod.subtitle, size: 20, color: COLOR_TEXT, font: FONT_PRIMARY })
                ]
              })
            ]
          }),
          new TableCell({
            shading: { fill: 'F1F5F9', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [new TextRun({ text: mod.tagline, bold: true, size: 18, color: COLOR_CYAN, font: FONT_PRIMARY })]
              })
            ]
          })
        ]
      })
    );

    mod.lessons.forEach(l => {
      tocRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({ children: [new TextRun({ text: `Lesson ${l.lessonNumber}`, size: 19, color: COLOR_MUTED, font: FONT_PRIMARY })] })]
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({ text: `${l.title} — `, bold: true, size: 19, color: COLOR_PRIMARY, font: FONT_PRIMARY }),
                    new TextRun({ text: l.subtitle, size: 19, color: COLOR_TEXT, font: FONT_PRIMARY })
                  ]
                })
              ]
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: l.pedagogicalStage.toUpperCase(), size: 18, color: COLOR_MUTED, font: FONT_PRIMARY })]
                })
              ]
            })
          ]
        })
      );
    });

    // Capstone row
    tocRows.push(
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: 'FFF7ED', type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: `Capstone 0${mod.number}`, bold: true, size: 19, color: COLOR_ACCENT, font: FONT_PRIMARY })] })]
          }),
          new TableCell({
            shading: { fill: 'FFF7ED', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: `Module ${mod.number} Capstone Project: `, bold: true, size: 19, color: COLOR_PRIMARY, font: FONT_PRIMARY }),
                  new TextRun({ text: `Hands-on Masterclass & Studio Verification`, size: 19, color: COLOR_TEXT, font: FONT_PRIMARY })
                ]
              })
            ]
          }),
          new TableCell({
            shading: { fill: 'FFF7ED', type: ShadingType.CLEAR },
            children: [new Paragraph({ children: [new TextRun({ text: 'CONTROL', bold: true, size: 18, color: COLOR_ACCENT, font: FONT_PRIMARY })] })]
          })
        ]
      })
    );
  });

  // Add Glossary row
  tocRows.push(
    new TableRow({
      children: [
        new TableCell({
          shading: { fill: 'F0FDFA', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Appendix', bold: true, size: 19, color: COLOR_CYAN, font: FONT_PRIMARY })] })]
        }),
        new TableCell({
          shading: { fill: 'F0FDFA', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Complete Audio & Street Music Theory Glossary (35+ Terms)', bold: true, size: 19, color: COLOR_PRIMARY, font: FONT_PRIMARY })] })]
        }),
        new TableCell({
          shading: { fill: 'F0FDFA', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'DICTIONARY', bold: true, size: 18, color: COLOR_CYAN, font: FONT_PRIMARY })] })]
        })
      ]
    })
  );

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
        bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
        left: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
        right: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER }
      },
      rows: tocRows
    }),
    new Paragraph({ children: [new PageBreak()] })
  );

  // ==========================================
  // 3. MODULES & LESSONS
  // ==========================================
  CURRICULUM_MODULES.forEach(mod => {
    // Module Header
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 400, after: 120 },
        children: [
          new TextRun({
            text: `MODULE 0${mod.number}: ${mod.title}`,
            bold: true,
            size: 38,
            color: COLOR_ACCENT,
            font: FONT_PRIMARY
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 200 },
        children: [
          new TextRun({
            text: mod.subtitle,
            bold: true,
            size: 26,
            color: COLOR_PRIMARY,
            font: FONT_PRIMARY
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 240 },
        children: [
          new TextRun({ text: 'Core Question: ', bold: true, size: 22, color: COLOR_CYAN, font: FONT_PRIMARY }),
          new TextRun({ text: mod.coreQuestion, italics: true, size: 22, color: COLOR_TEXT, font: FONT_PRIMARY })
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 400 },
        children: [
          new TextRun({ text: mod.description, size: 21, color: COLOR_TEXT, font: FONT_PRIMARY })
        ]
      })
    );

    // Lessons in Module
    mod.lessons.forEach(lesson => {
      children.push(
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 400, after: 80 },
          children: [
            new TextRun({
              text: `Lesson ${lesson.lessonNumber}: ${lesson.title}`,
              bold: true,
              size: 28,
              color: COLOR_PRIMARY,
              font: FONT_PRIMARY
            })
          ]
        }),
        new Paragraph({
          spacing: { before: 0, after: 140 },
          children: [
            new TextRun({
              text: `${lesson.subtitle}  |  STAGE: ${lesson.pedagogicalStage.toUpperCase()}`,
              bold: true,
              size: 19,
              color: COLOR_CYAN,
              font: FONT_PRIMARY
            })
          ]
        }),
        new Paragraph({
          spacing: { before: 0, after: 200 },
          children: [
            new TextRun({ text: 'Core Question: ', bold: true, size: 20, color: COLOR_ACCENT, font: FONT_PRIMARY }),
            new TextRun({ text: lesson.coreQuestion, italics: true, size: 20, color: COLOR_TEXT, font: FONT_PRIMARY })
          ]
        }),
        new Paragraph({
          spacing: { before: 0, after: 300 },
          children: [
            new TextRun({ text: lesson.summary, size: 21, color: COLOR_TEXT, font: FONT_PRIMARY })
          ]
        })
      );

      // Lesson Sections
      lesson.sections.forEach(section => {
        children.push(
          new Paragraph({
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 240, after: 100 },
            children: [
              new TextRun({
                text: section.heading,
                bold: true,
                size: 23,
                color: COLOR_PRIMARY,
                font: FONT_PRIMARY
              })
            ]
          })
        );

        // Break content into paragraphs
        const paragraphs = section.content.split('\n\n');
        paragraphs.forEach(paraText => {
          children.push(
            new Paragraph({
              spacing: { before: 0, after: 160 },
              children: [
                new TextRun({
                  text: paraText,
                  size: 21,
                  color: COLOR_TEXT,
                  font: FONT_PRIMARY
                })
              ]
            })
          );
        });

        // Diagram if present
        if (section.diagram) {
          children.push(
            createDiagramBox(section.diagram.type, section.diagram.code),
            new Paragraph({ spacing: { before: 120, after: 120 }, children: [] })
          );
        }

        // Key Takeaway if present
        if (section.keyTakeaway) {
          children.push(
            createCalloutBox('Key Production Takeaway', section.keyTakeaway, COLOR_ACCENT),
            new Paragraph({ spacing: { before: 120, after: 120 }, children: [] })
          );
        }
      });

      // Tool Mapping Table
      if (lesson.toolMapping) {
        children.push(
          new Paragraph({
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'DAW TOOL TRANSLATION & PRO TIP',
                bold: true,
                size: 20,
                color: COLOR_PRIMARY,
                font: FONT_PRIMARY
              })
            ]
          }),
          createToolMappingTable(
            lesson.toolMapping.dawFeature,
            lesson.toolMapping.description,
            lesson.toolMapping.proTip
          ),
          new Paragraph({ spacing: { before: 120, after: 120 }, children: [] })
        );
      }

      // Concrete Exercise
      if (lesson.exercise) {
        children.push(
          createCalloutBox(
            `Hands-On Studio Exercise: ${lesson.exercise.objective}`,
            lesson.exercise.instruction,
            COLOR_CYAN
          ),
          new Paragraph({ spacing: { before: 120, after: 120 }, children: [] })
        );
      }

      // Self-Assessment Quiz
      if (lesson.quiz) {
        children.push(
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
              bottom: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER },
              left: { style: BorderStyle.SINGLE, size: 16, color: '8B5CF6' },
              right: { style: BorderStyle.SINGLE, size: 8, color: COLOR_BORDER }
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { fill: 'FAF5FF', type: ShadingType.CLEAR },
                    children: [
                      new Paragraph({
                        spacing: { before: 40, after: 60 },
                        children: [
                          new TextRun({
                            text: `SELF-ASSESSMENT QUIZ: LESSON ${lesson.lessonNumber}`,
                            bold: true,
                            size: 19,
                            color: '6D28D9',
                            font: FONT_PRIMARY
                          })
                        ]
                      }),
                      new Paragraph({
                        spacing: { before: 0, after: 80 },
                        children: [
                          new TextRun({
                            text: lesson.quiz.question,
                            bold: true,
                            size: 21,
                            color: COLOR_PRIMARY,
                            font: FONT_PRIMARY
                          })
                        ]
                      }),
                      ...lesson.quiz.options.map((opt, idx) => 
                        new Paragraph({
                          spacing: { before: 20, after: 20 },
                          children: [
                            new TextRun({
                              text: `${String.fromCharCode(65 + idx)}) ${opt}${idx === lesson.quiz.correctIndex ? '  [CORRECT]' : ''}`,
                              bold: idx === lesson.quiz.correctIndex,
                              color: idx === lesson.quiz.correctIndex ? '047857' : COLOR_TEXT,
                              size: 20,
                              font: FONT_PRIMARY
                            })
                          ]
                        })
                      ),
                      new Paragraph({
                        spacing: { before: 80, after: 40 },
                        children: [
                          new TextRun({ text: 'Explanation: ', bold: true, size: 19, color: COLOR_MUTED, font: FONT_PRIMARY }),
                          new TextRun({ text: lesson.quiz.explanation, italics: true, size: 19, color: COLOR_TEXT, font: FONT_PRIMARY })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          new Paragraph({ spacing: { before: 180, after: 180 }, children: [] })
        );
      }
    });

    // Capstone Project for Module
    children.push(
      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 100 },
        children: [
          new TextRun({
            text: `MODULE 0${mod.number} CAPSTONE: MASTERCLASS STUDIO LAB`,
            bold: true,
            size: 28,
            color: COLOR_ACCENT,
            font: FONT_PRIMARY
          })
        ]
      }),
      new Paragraph({
        spacing: { before: 0, after: 200 },
        children: [
          new TextRun({
            text: `Comprehensive practical lab synthesizing all lessons in Module ${mod.number}.`,
            size: 21,
            color: COLOR_TEXT,
            font: FONT_PRIMARY
          })
        ]
      }),
      createCalloutBox(
        `Capstone 0${mod.number} Production Verification Standard`,
        `Execute the following studio task:\n1. Lock DAW project clock and set correct grid subdivision.\n2. Build a full arrangement incorporating all theoretical constraints of Module ${mod.number}.\n3. Perform an A/B verification audit ensuring every concept is audibly intentional and technically grounded.`,
        COLOR_ACCENT
      ),
      new Paragraph({ children: [new PageBreak()] })
    );
  });

  // ==========================================
  // 4. COMPREHENSIVE AUDIO & MUSIC THEORY GLOSSARY
  // ==========================================
  children.push(
    new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 200, after: 200 },
      children: [
        new TextRun({
          text: 'APPENDIX: COMPLETE STREET-TO-DAW AUDIO GLOSSARY',
          bold: true,
          size: 34,
          color: COLOR_PRIMARY,
          font: FONT_PRIMARY
        })
      ]
    }),
    new Paragraph({
      spacing: { before: 0, after: 300 },
      children: [
        new TextRun({
          text: 'Exhaustive reference definitions connecting street production terminology, formal acoustic physics, and Digital Audio Workstation parameters across all 3 modules.',
          size: 21,
          color: COLOR_MUTED,
          font: FONT_PRIMARY
        })
      ]
    })
  );

  const glossaryRows: TableRow[] = [
    new TableRow({
      children: [
        new TableCell({
          width: { size: 22, type: WidthType.PERCENTAGE },
          shading: { fill: '0F172A', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Term', bold: true, size: 20, color: 'FFFFFF', font: FONT_PRIMARY })] })]
        }),
        new TableCell({
          width: { size: 18, type: WidthType.PERCENTAGE },
          shading: { fill: '0F172A', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Category', bold: true, size: 20, color: '38BDF8', font: FONT_PRIMARY })] })]
        }),
        new TableCell({
          width: { size: 35, type: WidthType.PERCENTAGE },
          shading: { fill: '0F172A', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'Definition & Theory', bold: true, size: 20, color: 'FFFFFF', font: FONT_PRIMARY })] })]
        }),
        new TableCell({
          width: { size: 25, type: WidthType.PERCENTAGE },
          shading: { fill: '0F172A', type: ShadingType.CLEAR },
          children: [new Paragraph({ children: [new TextRun({ text: 'DAW Feature / Use', bold: true, size: 20, color: 'FB923C', font: FONT_PRIMARY })] })]
        })
      ]
    })
  ];

  VOCABULARY_LIST.forEach((item, index) => {
    const isEven = index % 2 === 0;
    glossaryRows.push(
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: isEven ? 'F8FAFC' : 'FFFFFF', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [new TextRun({ text: item.term, bold: true, size: 19, color: COLOR_PRIMARY, font: FONT_PRIMARY })]
              })
            ]
          }),
          new TableCell({
            shading: { fill: isEven ? 'F8FAFC' : 'FFFFFF', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: item.moduleName, bold: true, size: 17, color: COLOR_CYAN, font: FONT_PRIMARY }),
                  new TextRun({ text: `\n(${item.audioCategory})`, italics: true, size: 16, color: COLOR_MUTED, font: FONT_PRIMARY })
                ]
              })
            ]
          }),
          new TableCell({
            shading: { fill: isEven ? 'F8FAFC' : 'FFFFFF', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [
                  ...(item.streetDefinition ? [
                    new TextRun({ text: `Street: "${item.streetDefinition}"\n`, italics: true, bold: true, size: 18, color: COLOR_ACCENT, font: FONT_PRIMARY }),
                  ] : []),
                  ...(item.acousticScience ? [
                    new TextRun({ text: `Science: ${item.acousticScience}\n`, size: 17, color: COLOR_CYAN, font: FONT_CODE }),
                  ] : []),
                  new TextRun({ text: item.definition, size: 18, color: COLOR_TEXT, font: FONT_PRIMARY }),
                  new TextRun({ text: '\nApplication: ', bold: true, size: 17, color: COLOR_PRIMARY, font: FONT_PRIMARY }),
                  new TextRun({ text: item.practicalApplication, size: 17, color: COLOR_TEXT, font: FONT_PRIMARY })
                ]
              })
            ]
          }),
          new TableCell({
            shading: { fill: isEven ? 'F8FAFC' : 'FFFFFF', type: ShadingType.CLEAR },
            children: [
              new Paragraph({
                children: [new TextRun({ text: item.dawFeature, size: 18, color: '475569', font: FONT_CODE })]
              })
            ]
          })
        ]
      })
    );
  });

  children.push(
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      margins: { top: 80, bottom: 80, left: 100, right: 100 },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
        bottom: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
        left: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER },
        right: { style: BorderStyle.SINGLE, size: 6, color: COLOR_BORDER }
      },
      rows: glossaryRows
    })
  );

  return new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440, // 1 inch
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'THE HARDWIRE METHOD  |  Music Theory for the Streets',
                    size: 16,
                    color: COLOR_MUTED,
                    font: FONT_PRIMARY
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: 'Page ',
                    size: 18,
                    color: COLOR_MUTED,
                    font: FONT_PRIMARY
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 18,
                    bold: true,
                    color: COLOR_PRIMARY,
                    font: FONT_PRIMARY
                  }),
                  new TextRun({
                    text: ' of ',
                    size: 18,
                    color: COLOR_MUTED,
                    font: FONT_PRIMARY
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 18,
                    bold: true,
                    color: COLOR_PRIMARY,
                    font: FONT_PRIMARY
                  })
                ]
              })
            ]
          })
        },
        children
      }
    ]
  });
}

async function main() {
  console.log('Generating Unified Hardwire Method DOCX Textbook...');
  const doc = buildDocument();
  const buffer = await Packer.toBuffer(doc);

  const rootOutputPath = path.join(process.cwd(), 'THE_HARDWIRE_METHOD_TEXTBOOK.docx');
  fs.writeFileSync(rootOutputPath, buffer);
  console.log(`Successfully generated DOCX textbook at: ${rootOutputPath}`);

  // Also create public/ directory and save there for browser download
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  const publicOutputPath = path.join(publicDir, 'THE_HARDWIRE_METHOD_TEXTBOOK.docx');
  fs.writeFileSync(publicOutputPath, buffer);
  console.log(`Successfully copied DOCX textbook to web public directory: ${publicOutputPath}`);
}

main().catch(err => {
  console.error('Error generating DOCX:', err);
  process.exit(1);
});
