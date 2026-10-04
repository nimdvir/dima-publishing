import argparse
import csv
import re
from pathlib import Path

import fitz  # PyMuPDF
from PIL import Image


STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "for",
    "from",
    "how",
    "in",
    "is",
    "it",
    "of",
    "on",
    "or",
    "that",
    "the",
    "to",
    "with",
    "your",
}


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def short_description_slug(text: str, max_words: int = 6) -> str:
    words = re.findall(r"[a-z0-9]+", text.lower())
    filtered = [w for w in words if w not in STOPWORDS]
    chosen = filtered[:max_words]
    if not chosen:
        return "slide"
    return "-".join(chosen)


def first_meaningful_text(page: fitz.Page) -> str:
    raw = page.get_text("text") or ""
    lines = [line.strip() for line in raw.splitlines() if line.strip()]
    if not lines:
        return "slide"
    # Combine first few non-empty lines to derive a stable short description.
    return " ".join(lines[:3])


def unique_output_path(out_dir: Path, stem: str) -> Path:
    candidate = out_dir / f"{stem}.png"
    if not candidate.exists():
        return candidate

    index = 2
    while True:
        candidate = out_dir / f"{stem}-{index}.png"
        if not candidate.exists():
            return candidate
        index += 1


def render_pdf_to_images(
    pdf_path: Path,
    chapter: str,
    out_dir: Path,
    dpi: int,
    crop_bottom_pct: float,
) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    chapter_slug = slugify(chapter)

    document = fitz.open(pdf_path)
    manifest_rows = []

    zoom = dpi / 72.0
    matrix = fitz.Matrix(zoom, zoom)

    try:
        for i, page in enumerate(document, start=1):
            pix = page.get_pixmap(matrix=matrix, alpha=False)
            image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)

            if crop_bottom_pct > 0:
                crop_px = int(image.height * (crop_bottom_pct / 100.0))
                if crop_px >= image.height:
                    raise ValueError("crop-bottom-pct removes entire image height")
                image = image.crop((0, 0, image.width, image.height - crop_px))

            text = first_meaningful_text(page)
            desc_slug = short_description_slug(text)
            stem = f"{chapter_slug}-p{i:02d}-{desc_slug}"
            out_path = unique_output_path(out_dir, stem)

            image.save(out_path, format="PNG")

            manifest_rows.append(
                {
                    "page": i,
                    "file": out_path.name,
                    "description_source": text,
                }
            )

            print(f"Saved page {i:02d}: {out_path.name}")
    finally:
        document.close()

    manifest_path = out_dir / "slide-image-manifest.csv"
    with manifest_path.open("w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["page", "file", "description_source"])
        writer.writeheader()
        writer.writerows(manifest_rows)

    print(f"Manifest: {manifest_path}")
    print(f"Total images: {len(manifest_rows)}")
    return manifest_path


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert a PDF slide deck to chapter-prefixed PNG files with short descriptive names."
    )
    parser.add_argument("--pdf", required=True, help="Path to source PDF slide deck")
    parser.add_argument("--chapter", required=True, help="Chapter name/tag for filename prefix")
    parser.add_argument("--out", required=True, help="Output folder for PNG files")
    parser.add_argument("--dpi", type=int, default=300, help="Render DPI (default: 300)")
    parser.add_argument(
        "--crop-bottom-pct",
        type=float,
        default=0.0,
        help="Optional bottom crop percent to remove footer/logo (default: 0)",
    )
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    pdf_path = Path(args.pdf)
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    out_dir = Path(args.out)

    render_pdf_to_images(
        pdf_path=pdf_path,
        chapter=args.chapter,
        out_dir=out_dir,
        dpi=args.dpi,
        crop_bottom_pct=args.crop_bottom_pct,
    )


if __name__ == "__main__":
    main()
