import fs from "node:fs";
import path from "node:path";

export type PortraitMedia =
  | { kind: "video"; src: string }
  | { kind: "image"; src: string }
  | null;

// Looks for the portrait in public/about at build time, so dropping the file
// in is all that's needed — no code change. Video wins over a still because
// PLAN §9 asks for the animated portrait as WebM/MP4 rather than a GIF.
const CANDIDATES: { file: string; kind: "video" | "image" }[] = [
  { file: "tomas.webm", kind: "video" },
  { file: "tomas.mp4", kind: "video" },
  { file: "tomas.webp", kind: "image" },
  { file: "tomas.jpg", kind: "image" },
  { file: "tomas.png", kind: "image" },
];

export function getPortraitMedia(): PortraitMedia {
  const dir = path.join(process.cwd(), "public", "about");
  for (const candidate of CANDIDATES) {
    try {
      if (fs.existsSync(path.join(dir, candidate.file))) {
        return { kind: candidate.kind, src: `/about/${candidate.file}` };
      }
    } catch {
      // Unreadable public dir at build time — fall through to the placeholder.
    }
  }
  return null;
}
