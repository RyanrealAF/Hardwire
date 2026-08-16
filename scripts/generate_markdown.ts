import * as fs from 'fs';
import * as path from 'path';
import { CURRICULUM_MODULES } from '../src/data/curriculumData';
import { VOCABULARY_LIST } from '../src/data/vocabularyData';

function generateMarkdown(): string {
  let md = `# THE HARDWIRE METHOD: MUSIC THEORY FOR THE STREETS
## The Complete Unabridged Granular Textbook Compendium (Extended Edition)
**Tagline:** FEEL IT FIRST. NAME IT SECOND. CONTROL IT THIRD.  
**Curriculum Version:** 2.5 (Fully Expanded Edition)

---

# TABLE OF CONTENTS
`;

  CURRICULUM_MODULES.forEach(mod => {
    md += `\n- **MODULE 0${mod.number}: ${mod.title}** — *${mod.subtitle}*\n`;
    mod.lessons.forEach(l => {
      md += `  - Lesson ${l.lessonNumber}: ${l.title} — *${l.subtitle}* [${l.pedagogicalStage.toUpperCase()}]\n`;
    });
    md += `  - Module 0${mod.number} Capstone Studio Masterclass\n`;
  });
  md += `- **APPENDIX: COMPLETE STREET-TO-DAW AUDIO GLOSSARY (35+ Terms)**\n\n---\n\n`;

  CURRICULUM_MODULES.forEach(mod => {
    md += `# MODULE 0${mod.number}: ${mod.title}\n`;
    md += `### *${mod.subtitle}*\n`;
    md += `**Tagline:** ${mod.tagline}  \n`;
    md += `**Core Question:** *${mod.coreQuestion}*  \n\n`;
    md += `### Module 0${mod.number} Overview\n${mod.description}\n\n---\n\n`;

    mod.lessons.forEach(lesson => {
      md += `## Lesson ${lesson.lessonNumber}: ${lesson.title}\n`;
      md += `- **Subtitle:** *${lesson.subtitle}*\n`;
      md += `- **Pedagogical Stage:** \`${lesson.pedagogicalStage.toUpperCase()}\`\n`;
      md += `- **Core Question:** ${lesson.coreQuestion}\n`;
      md += `- **Summary:** ${lesson.summary}\n\n`;

      lesson.sections.forEach(sec => {
        md += `### ${sec.heading}\n\n${sec.content}\n\n`;
        if (sec.diagram) {
          md += `\`\`\`\n${sec.diagram.code}\n\`\`\`\n\n`;
        }
        if (sec.keyTakeaway) {
          md += `> **Key Production Takeaway:** ${sec.keyTakeaway}\n\n`;
        }
      });

      if (lesson.toolMapping) {
        md += `### Tool Mapping (DAW Translation)\n`;
        md += `- **DAW Feature / Control:** \`${lesson.toolMapping.dawFeature}\`\n`;
        md += `- **Function & Usage:** ${lesson.toolMapping.description}\n`;
        md += `- **Pro-Tip:** ${lesson.toolMapping.proTip}\n\n`;
      }

      if (lesson.exercise) {
        md += `### Concrete Hands-On Exercise\n`;
        md += `- **Instruction:** ${lesson.exercise.instruction}\n`;
        md += `- **Objective:** ${lesson.exercise.objective}\n\n`;
      }

      if (lesson.quiz) {
        md += `### Self-Assessment Quiz\n`;
        md += `- **Question:** ${lesson.quiz.question}\n`;
        lesson.quiz.options.forEach((opt, i) => {
          const isCorrect = i === lesson.quiz.correctIndex;
          md += `  - **${String.fromCharCode(65 + i)})** ${opt}${isCorrect ? ' *(Correct)*' : ''}\n`;
        });
        md += `- **Explanation:** ${lesson.quiz.explanation}\n\n`;
      }

      md += `---\n\n`;
    });
  });

  md += `# APPENDIX: COMPLETE STREET-TO-DAW AUDIO GLOSSARY\n\n`;
  md += `| Term | Category / Module | Definition & Practical Application | DAW Feature / Parameter |\n`;
  md += `| :--- | :--- | :--- | :--- |\n`;

  VOCABULARY_LIST.forEach(item => {
    md += `| **${item.term}** | ${item.moduleName} (${item.audioCategory}) | ${item.definition} <br>**App:** ${item.practicalApplication} | \`${item.dawFeature}\` |\n`;
  });

  return md;
}

const mdContent = generateMarkdown();
fs.writeFileSync(path.join(process.cwd(), 'THE_HARDWIRE_METHOD_TEXTBOOK_COMPLETE.md'), mdContent);
console.log('Successfully regenerated THE_HARDWIRE_METHOD_TEXTBOOK_COMPLETE.md with expanded text.');
