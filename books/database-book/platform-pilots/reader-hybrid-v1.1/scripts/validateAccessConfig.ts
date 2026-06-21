import * as path from "path";
import { fileURLToPath } from "url";
import { loadEnv } from "vite";
import {
  FREE_PREVIEW_CHAPTER_IDS,
  isChapterGated,
} from "../src/lib/freePreview";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const productionEnv = loadEnv("production", projectRoot, "");

const REQUIRED_FREE_PREVIEW_CHAPTERS = ["ch00", "ch01", "ch02", "ch03", "ch04"];
const REQUIRED_GATED_CHAPTERS = Array.from({ length: 13 }, (_, index) => {
  const chapterNumber = String(index + 5).padStart(2, "0");
  return `ch${chapterNumber}`;
});
const REQUIRED_ENV_VARS = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
];

function readEnv(name: string): string | undefined {
  return process.env[name] || productionEnv[name];
}

function main() {
  const errors: string[] = [];

  for (const chapterId of REQUIRED_FREE_PREVIEW_CHAPTERS) {
    if (!FREE_PREVIEW_CHAPTER_IDS.has(chapterId) || isChapterGated(chapterId)) {
      errors.push(`${chapterId} must remain readable without login.`);
    }
  }

  for (const chapterId of REQUIRED_GATED_CHAPTERS) {
    if (!isChapterGated(chapterId)) {
      errors.push(`${chapterId} must remain gated for logged-out readers.`);
    }
  }

  for (const envName of REQUIRED_ENV_VARS) {
    if (!readEnv(envName)) {
      errors.push(`${envName} is required at production build time.`);
    }
  }

  const supabaseUrl = readEnv("VITE_SUPABASE_URL");
  if (supabaseUrl && !/^https?:\/\/.+/i.test(supabaseUrl)) {
    errors.push("VITE_SUPABASE_URL must be an absolute http(s) URL.");
  }

  if (errors.length > 0) {
    console.error("Reader access configuration validation failed:\n");
    for (const error of errors) console.error(`- ${error}`);
    process.exit(1);
  }

  console.log(
    "Reader access configuration passed: public preview and Supabase env are valid.",
  );
}

main();
