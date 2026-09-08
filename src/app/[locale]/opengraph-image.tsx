import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";
import { getDictionary, isLocale, defaultLocale } from "@/i18n";

export const runtime = "nodejs";
export const alt = "TARC Tech — Custom software, systems and automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOCKUP_ASPECT = 240 / 900;

// Rasterized once per request rather than committed as a PNG asset — the
// lockup stays a single source-of-truth SVG (PLAN §0.3: the isotipo is never
// redrawn or approximated), and `sharp` (already a Next.js dependency) does
// the conversion. Satori/resvg render nested SVG data URIs inconsistently,
// but a PNG data URI is always safe.
async function lockupPng(width: number) {
  const svgPath = join(process.cwd(), "public/brand/lockup-horizontal-dark.svg");
  const svg = await readFile(svgPath);
  const png = await sharp(svg)
    .resize({ width: width * 2 })
    .png()
    .toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

async function loadGoogleFont(family: string, weight: number) {
  // Fetched with no browser User-Agent on purpose: Google Fonts then replies
  // with one unrestricted @font-face in plain .ttf, instead of the
  // woff2/unicode-range split it sends real browsers.
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}`,
  ).then((res) => res.text());

  const match = css.match(/src: url\(([^)]+)\)/);
  if (!match) throw new Error(`Could not resolve a font file for ${family} ${weight}`);
  const fontRes = await fetch(match[1]);
  return fontRes.arrayBuffer();
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  const title = dict.hero.titleParts.map((part) => part.text).join("").trim();

  const lockupWidth = 460;
  const [lockup, firaRegular, firaBold] = await Promise.all([
    lockupPng(lockupWidth),
    loadGoogleFont("Fira Sans", 400),
    loadGoogleFont("Fira Sans", 700),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#09090b",
          padding: "76px",
          fontFamily: "Fira Sans",
        }}
      >
        {/* ImageResponse renders via satori, not the DOM — next/image doesn't apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={lockup}
          alt=""
          width={lockupWidth}
          height={Math.round(lockupWidth * LOCKUP_ASPECT)}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.2,
              maxWidth: 1000,
            }}
          >
            {title}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 48, height: 4, background: "#f97316" }} />
            <div style={{ fontSize: 26, color: "#a1a1aa", fontWeight: 400 }}>
              San Rafael, Mendoza · Argentina
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fira Sans", data: firaRegular, weight: 400, style: "normal" },
        { name: "Fira Sans", data: firaBold, weight: 700, style: "normal" },
      ],
    },
  );
}
