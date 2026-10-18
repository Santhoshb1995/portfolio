/**
 * Lists every `TODO:` placeholder still in the content files.
 * Run with `npm run todos`.
 */
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { collectTodos } from "@/lib/todo";

const todos = collectTodos({ profile, experience, projects, skills });

if (todos.length === 0) {
  console.log("No content TODOs left.");
} else {
  console.log(`${todos.length} content TODO(s):\n`);
  for (const { path, message } of todos) console.log(`  ${path.padEnd(28)} ${message}`);
}
