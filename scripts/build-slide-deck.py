#!/usr/bin/env python3
"""Build the English Wave 3 slide deck for Standardized Midnight PoR."""

from __future__ import annotations

import os

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_CONNECTOR, MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.util import Inches, Pt

# ---------------------------------------------------------------------------
# Design tokens
# ---------------------------------------------------------------------------
BG = RGBColor.from_string("0B1220")
PANEL = RGBColor.from_string("111A2B")
PANEL_2 = RGBColor.from_string("16233A")
TEXT = RGBColor.from_string("F8FAFC")
MUTED = RGBColor.from_string("94A3B8")
FAINT = RGBColor.from_string("64748B")
ACCENT = RGBColor.from_string("2DD4BF")
ACCENT_2 = RGBColor.from_string("A78BFA")
GREEN = RGBColor.from_string("34D399")
AMBER = RGBColor.from_string("FBBF24")
RED = RGBColor.from_string("F87171")
WHITE = RGBColor.from_string("FFFFFF")
LINE = RGBColor.from_string("243247")

FONT = "Arial"
FOOTER = "Ardmere  ·  Midnight Buildathon  ·  Wave 3"

W, H = 13.333, 7.5


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def new_deck() -> Presentation:
    prs = Presentation()
    prs.slide_width = Inches(W)
    prs.slide_height = Inches(H)
    return prs


def blank(prs: Presentation):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = BG
    return slide


def text(
    slide,
    x,
    y,
    w,
    h,
    value,
    size=18,
    color=TEXT,
    bold=False,
    align=PP_ALIGN.LEFT,
    anchor=MSO_ANCHOR.TOP,
    font=FONT,
    line_spacing=1.0,
    italic=False,
):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0
    tf.vertical_anchor = anchor
    p = tf.paragraphs[0]
    p.alignment = align
    p.line_spacing = line_spacing
    run = p.add_run()
    run.text = value
    run.font.name = font
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    return box


def bullets(slide, x, y, w, h, items, size=17, color=TEXT, gap=10, bullet_color=ACCENT):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = True
    tf.margin_left = 0
    tf.margin_right = 0
    tf.margin_top = 0
    tf.margin_bottom = 0
    for i, item in enumerate(items):
        if isinstance(item, str):
            label, sub = item, None
        else:
            label, sub = item
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.space_after = Pt(gap)
        p.line_spacing = 1.05
        r1 = p.add_run()
        r1.text = "•  "
        r1.font.name = FONT
        r1.font.size = Pt(size)
        r1.font.bold = True
        r1.font.color.rgb = bullet_color
        r2 = p.add_run()
        r2.text = label
        r2.font.name = FONT
        r2.font.size = Pt(size)
        r2.font.color.rgb = color
        if sub:
            p2 = tf.add_paragraph()
            p2.space_after = Pt(gap)
            p2.line_spacing = 1.0
            r3 = p2.add_run()
            r3.text = "    " + sub
            r3.font.name = FONT
            r3.font.size = Pt(size - 3)
            r3.font.color.rgb = MUTED
    return box


def rect(slide, x, y, w, h, fill=PANEL, line=LINE, radius=0.06, line_w=1.0):
    shape = slide.shapes.add_shape(
        MSO_SHAPE.ROUNDED_RECTANGLE, Inches(x), Inches(y), Inches(w), Inches(h)
    )
    shape.adjustments[0] = radius
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill
    if line is None:
        shape.line.fill.background()
    else:
        shape.line.color.rgb = line
        shape.line.width = Pt(line_w)
    shape.shadow.inherit = False
    return shape


def pill(slide, x, y, w, h, label, fill=PANEL_2, color=ACCENT, size=11):
    rect(slide, x, y, w, h, fill=fill, line=LINE, radius=0.5)
    text(
        slide,
        x,
        y + 0.03,
        w,
        h - 0.06,
        label,
        size=size,
        color=color,
        bold=True,
        align=PP_ALIGN.CENTER,
        anchor=MSO_ANCHOR.MIDDLE,
    )


def connector(slide, x1, y1, x2, y2, color=LINE, width=1.25):
    line = slide.shapes.add_connector(
        MSO_CONNECTOR.STRAIGHT, Inches(x1), Inches(y1), Inches(x2), Inches(y2)
    )
    line.line.color.rgb = color
    line.line.width = Pt(width)


def arrow(slide, x, y, w=0.35, h=0.22, color=ACCENT):
    shape = slide.shapes.add_shape(
        MSO_SHAPE.RIGHT_ARROW, Inches(x), Inches(y), Inches(w), Inches(h)
    )
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    shape.shadow.inherit = False


def kicker(slide, value):
    text(slide, 0.72, 0.42, 8.0, 0.3, value.upper(), size=11, color=ACCENT, bold=True)


def title(slide, value, size=34, y=0.78, w=11.9):
    text(slide, 0.72, y, w, 0.9, value, size=size, color=TEXT, bold=True, line_spacing=0.98)


def footer(slide, page):
    text(slide, 0.72, 7.05, 9.0, 0.25, FOOTER, size=9, color=FAINT)
    text(slide, 11.9, 7.05, 0.7, 0.25, str(page), size=9, color=FAINT, align=PP_ALIGN.RIGHT)


def notes(slide, value):
    slide.notes_slide.notes_text_frame.text = value


def stat_card(slide, x, y, w, h, value, label, accent=ACCENT, value_size=30):
    rect(slide, x, y, w, h, fill=PANEL, line=LINE)
    text(slide, x + 0.25, y + 0.22, w - 0.5, 0.6, value, size=value_size, color=accent, bold=True)
    text(slide, x + 0.25, y + h - 0.72, w - 0.5, 0.5, label, size=11, color=MUTED)


def table(slide, x, y, w, h, rows, col_widths=None, font_size=12, header=True):
    shape = slide.shapes.add_table(len(rows), len(rows[0]), Inches(x), Inches(y), Inches(w), Inches(h))
    tbl = shape.table
    if col_widths:
        for i, width in enumerate(col_widths):
            tbl.columns[i].width = Inches(width)
    for r, row in enumerate(rows):
        for c, value in enumerate(row):
            cell = tbl.cell(r, c)
            cell.margin_left = Inches(0.1)
            cell.margin_right = Inches(0.08)
            cell.margin_top = Inches(0.05)
            cell.margin_bottom = Inches(0.03)
            cell.fill.solid()
            cell.fill.fore_color.rgb = PANEL_2 if (header and r == 0) else PANEL
            tf = cell.text_frame
            tf.word_wrap = True
            p = tf.paragraphs[0]
            run = p.add_run()
            run.text = str(value)
            run.font.name = FONT
            run.font.size = Pt(font_size)
            run.font.bold = header and r == 0
            run.font.color.rgb = ACCENT if (header and r == 0) else TEXT
    return tbl


# ---------------------------------------------------------------------------
# Slides
# ---------------------------------------------------------------------------
def slide_title(prs):
    s = blank(prs)
    # left copy
    text(s, 0.85, 0.75, 6.5, 0.3, "MIDNIGHT BUILDATHON  ·  WAVE 3", size=11, color=ACCENT, bold=True)
    text(s, 0.85, 1.35, 6.4, 2.2, "Standardized\nMidnight PoR", size=48, color=TEXT, bold=True, line_spacing=0.92)
    text(
        s,
        0.85,
        3.55,
        5.9,
        1.0,
        "Private, verifiable proof of reserves\nfor BTC, ETH and USDT.",
        size=20,
        color=MUTED,
        line_spacing=1.15,
    )
    text(
        s,
        0.85,
        5.15,
        6.2,
        0.9,
        "64 users  ·  three-asset Merkle Sum Tree  ·  one Compact proof",
        size=13,
        color=TEXT,
    )
    pill(s, 0.85, 5.95, 1.05, 0.36, "APACHE 2.0", color=ACCENT)
    text(s, 2.05, 6.02, 4.8, 0.3, "github.com/ardmere/ardmere-midnight-demo", size=10.5, color=FAINT)

    # right: MST motif
    cx, cy = 10.35, 3.6
    ring = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(cx - 1.55), Inches(cy - 1.55), Inches(3.1), Inches(3.1))
    ring.fill.background()
    ring.line.color.rgb = LINE
    ring.line.width = Pt(1)
    ring.shadow.inherit = False

    root = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(cx - 0.5), Inches(cy - 1.55), Inches(1.0), Inches(1.0))
    root.fill.solid()
    root.fill.fore_color.rgb = ACCENT
    root.line.fill.background()
    root.shadow.inherit = False
    text(s, cx - 0.5, cy - 1.3, 1.0, 0.45, "ROOT", size=10, color=BG, bold=True, align=PP_ALIGN.CENTER)

    children = [("BTC", -1.05, 0.25), ("ETH", 0.0, 0.85), ("USDT", 1.05, 0.25)]
    for label, dx, dy in children:
        x = cx + dx - 0.42
        y = cy + dy
        connector(s, cx, cy - 0.55, cx + dx, y + 0.1, color=LINE, width=1.4)
        node = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x), Inches(y), Inches(0.84), Inches(0.84))
        node.fill.solid()
        node.fill.fore_color.rgb = PANEL_2
        node.line.color.rgb = ACCENT_2
        node.line.width = Pt(1.2)
        node.shadow.inherit = False
        text(s, x, y + 0.22, 0.84, 0.3, label, size=9.5, color=TEXT, bold=True, align=PP_ALIGN.CENTER)

    # leaves
    for i in range(6):
        x = cx - 1.6 + i * 0.64
        y = cy + 1.95
        connector(s, cx, cy + 0.45, x + 0.1, y, color=LINE, width=0.9)
        leaf = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x), Inches(y), Inches(0.2), Inches(0.2))
        leaf.fill.solid()
        leaf.fill.fore_color.rgb = FAINT
        leaf.line.fill.background()
        leaf.shadow.inherit = False

    footer(s, 1)
    notes(
        s,
        "Wave 3 submission for the Midnight Buildathon. The deck covers the problem, "
        "the signed three-asset MST design, the Compact circuit, the local-chain reference run, "
        "the trust boundary and the roadmap.",
    )


def slide_problem(prs):
    s = blank(prs)
    kicker(s, "The problem")
    title(s, "Reserve reports are trusted, not verified.")
    text(
        s,
        0.72,
        1.55,
        11.6,
        0.7,
        "A published root and a PDF do not let a user check inclusion, and publishing balances to make them verifiable destroys privacy.",
        size=17,
        color=MUTED,
        line_spacing=1.1,
    )

    cards = [
        ("1", "Inclusion", "Users cannot prove their account is inside the published snapshot."),
        ("2", "Solvency", "A single aggregate number does not show that every user has positive net assets."),
        ("3", "Privacy", "Making the report verifiable by publishing per-user balances is not acceptable."),
    ]
    for i, (num, head, body) in enumerate(cards):
        x = 0.72 + i * 4.05
        rect(s, x, 2.55, 3.75, 2.25, fill=PANEL)
        text(s, x + 0.28, 2.75, 0.5, 0.4, num, size=13, color=ACCENT, bold=True)
        text(s, x + 0.28, 3.15, 3.1, 0.4, head, size=20, color=TEXT, bold=True)
        text(s, x + 0.28, 3.65, 3.15, 0.95, body, size=13.5, color=MUTED, line_spacing=1.1)

    rect(s, 0.72, 5.2, 11.9, 1.15, fill=RGBColor.from_string("0F2A2A"), line=ACCENT_2)
    text(
        s,
        0.98,
        5.42,
        11.4,
        0.75,
        "The missing primitive: a proof of inclusion + solvency that reveals nothing beyond the commitment.",
        size=17,
        color=TEXT,
        bold=True,
        italic=True,
    )
    footer(s, 2)
    notes(s, "Three failures: inclusion, solvency and privacy. The MVP addresses all three at the batch level.")


def slide_idea(prs):
    s = blank(prs)
    kicker(s, "The idea")
    title(s, "A private batch, one public commitment.")
    text(
        s,
        0.72,
        1.55,
        11.6,
        0.6,
        "The operator commits to a fixed 64-user batch; the circuit proves the batch is internally solvent; users verify inclusion off-chain.",
        size=16,
        color=MUTED,
    )

    steps = [
        ("01", "Private batch", "64 leaves\nBTC / ETH / USDT"),
        ("02", "Signed MST", "pos / neg per asset\n6 sums per node"),
        ("03", "Compact proof", "root · NAV · reserves\nauthority"),
        ("04", "Public snapshot", "root, prices, reserves\ngross sums"),
        ("05", "Inclusion check", "6 siblings\nroot + NAV"),
    ]
    x0 = 0.72
    width = 2.14
    gap = 0.22
    for i, (num, head, body) in enumerate(steps):
        x = x0 + i * (width + gap)
        rect(s, x, 2.45, width, 2.35, fill=PANEL if i < 4 else PANEL_2, line=LINE)
        text(s, x + 0.2, 2.62, 0.6, 0.3, num, size=10, color=ACCENT, bold=True)
        text(s, x + 0.2, 2.98, width - 0.35, 0.55, head, size=16, color=TEXT, bold=True)
        text(s, x + 0.2, 3.6, width - 0.35, 1.0, body, size=12, color=MUTED, line_spacing=1.12)
        if i < 4:
            arrow(s, x + width + 0.03, 3.53, w=0.15, h=0.18)

    rect(s, 0.72, 5.35, 11.9, 1.0, fill=PANEL, line=LINE)
    text(s, 0.98, 5.58, 11.3, 0.5, "64 users  ·  3 assets  ·  1 root  ·  0 individual balances revealed", size=20, color=ACCENT, bold=True)
    footer(s, 3)
    notes(s, "The batch is fixed-size, so the tree shape and circuit are fixed. Signed balances allow long/short positions per asset.")


def slide_why(prs):
    s = blank(prs)
    kicker(s, "Why Midnight")
    title(s, "Private witness, selective disclosure.")
    text(
        s,
        0.72,
        1.55,
        11.6,
        0.55,
        "Compact gives us a small, auditable circuit; Midnight gives us private state and a public ledger that only sees what we choose to disclose.",
        size=16,
        color=MUTED,
    )

    items = [
        ("Compact", "TypeScript-like ZK contracts with explicit disclose()."),
        ("Private state", "The 64 balances and userIdHash values stay in the witness."),
        ("Public ledger", "Only root, prices, reserves and aggregate sums are stored."),
        ("Proof server", "Generates the proof; Midnight verifies the state transition."),
    ]
    for i, (head, body) in enumerate(items):
        x = 0.72 + (i % 2) * 6.05
        y = 2.45 + (i // 2) * 1.7
        rect(s, x, y, 5.75, 1.4, fill=PANEL)
        text(s, x + 0.25, y + 0.2, 5.2, 0.35, head, size=17, color=ACCENT, bold=True)
        text(s, x + 0.25, y + 0.62, 5.2, 0.6, body, size=13, color=MUTED, line_spacing=1.08)

    rect(s, 0.72, 6.08, 11.9, 0.62, fill=PANEL_2, line=LINE)
    text(s, 0.95, 6.2, 11.4, 0.35, "No custom cryptography  ·  Apache-2.0  ·  Compact 0.31.1 / ledger-v8", size=12.5, color=TEXT)
    footer(s, 4)
    notes(s, "Midnight's selective disclosure model matches the PoR problem: prove a statement about private balances, publish only aggregates.")


def slide_architecture(prs):
    s = blank(prs)
    kicker(s, "Architecture")
    title(s, "Off-chain tree, on-chain proof.")
    text(s, 0.72, 1.5, 11.6, 0.5, "The chain verifies the proof and the state transition; it never sees the 64 leaves.", size=16, color=MUTED)

    boxes = [
        ("OFF-CHAIN (TS)", "MST builder", "build tree, root,\ngross / net sums,\ninclusion paths", 0.72),
        ("COMPACT", "submitSnapshot", "witness: 6 vectors\npublic: prices,\nreserves, root", 5.0),
        ("MIDNIGHT", "Ledger snapshot", "authorityPk,\nroot, prices,\nreserves, sums", 9.28),
    ]
    for label, head, body, x in boxes:
        rect(s, x, 2.2, 3.35, 2.35, fill=PANEL)
        text(s, x + 0.22, 2.38, 2.9, 0.25, label, size=9.5, color=ACCENT, bold=True)
        text(s, x + 0.22, 2.7, 2.95, 0.4, head, size=18, color=TEXT, bold=True)
        text(s, x + 0.22, 3.2, 2.95, 1.1, body, size=12, color=MUTED, line_spacing=1.15)

    arrow(s, 4.15, 3.25, w=0.6, h=0.3)
    arrow(s, 8.43, 3.25, w=0.6, h=0.3)

    # user verifier
    rect(s, 3.0, 5.25, 7.35, 1.2, fill=RGBColor.from_string("0F2A2A"), line=ACCENT)
    text(s, 3.25, 5.42, 6.9, 0.35, "USER VERIFIER", size=9.5, color=ACCENT, bold=True)
    text(s, 3.25, 5.72, 6.9, 0.55, "inclusion JSON  →  recompute 6 parents  →  compare root + NAV > 0", size=13, color=TEXT)
    connector(s, 10.95, 4.55, 10.95, 5.85, color=LINE, width=1.2)
    connector(s, 10.95, 5.85, 10.35, 5.85, color=LINE, width=1.2)

    footer(s, 5)
    notes(s, "Three layers: TypeScript builds the tree, the Compact circuit enforces the statement, and Midnight stores the aggregate snapshot. The verifier runs client-side.")


def slide_circuit(prs):
    s = blank(prs)
    kicker(s, "Circuit")
    title(s, "Six checks, one snapshot.")
    checks = [
        ("01", "Authority", "ownPublicKey().bytes == authorityPk"),
        ("02", "Canonical signs", "pos == 0 || neg == 0 for every asset"),
        ("03", "Per-user NAV", "Σ(pos·price) > Σ(neg·price) in micro-USDT"),
        ("04", "Root equality", "recomputed MST root == published root"),
        ("05", "Reserves", "posSum <= negSum + declaredReserves per asset"),
        ("06", "One-shot", "assert(!published) before writing the snapshot"),
    ]
    for i, (num, head, body) in enumerate(checks):
        col = i % 3
        row = i // 3
        x = 0.72 + col * 4.02
        y = 1.85 + row * 2.05
        rect(s, x, y, 3.78, 1.75, fill=PANEL)
        text(s, x + 0.22, y + 0.18, 0.45, 0.3, num, size=10, color=ACCENT, bold=True)
        text(s, x + 0.22, y + 0.5, 3.3, 0.35, head, size=15.5, color=TEXT, bold=True)
        text(s, x + 0.22, y + 0.95, 3.3, 0.65, body, size=11.5, color=MUTED, line_spacing=1.05)

    rect(s, 0.72, 6.0, 11.9, 0.62, fill=PANEL_2, line=LINE)
    text(s, 0.95, 6.14, 11.4, 0.3, "k = 20  ·  886,226 rows  ·  6 witness vectors  ·  ~291 MB prover  ·  ~2 min proof", size=12.5, color=ACCENT)
    footer(s, 6)
    notes(s, "The circuit is intentionally small in business logic: six checks. The bulk of the rows is hashing and range checks for the 64-leaf tree.")


def slide_data(prs):
    s = blank(prs)
    kicker(s, "Data model")
    title(s, "Three assets, one tree.")
    rows = [
        ["Asset", "Unit", "Decimals", "Demo price"],
        ["BTC", "satoshi", "8", "600 µUSDT"],
        ["ETH", "1e-8 ETH", "8", "30 µUSDT"],
        ["USDT", "1e-6 USDT", "6", "1 µUSDT"],
    ]
    table(s, 0.72, 1.8, 6.4, 2.35, rows, col_widths=[1.2, 2.0, 1.3, 1.9], font_size=13)
    text(s, 0.72, 4.45, 6.4, 0.55, "Prices are public inputs, bounded to 0 < price <= 1e12.", size=12.5, color=MUTED)

    rect(s, 7.55, 1.8, 5.05, 3.2, fill=PANEL)
    text(s, 7.8, 2.0, 4.5, 0.3, "PUBLIC LEDGER", size=9.5, color=ACCENT, bold=True)
    lines = [
        "authorityPk : Bytes<32>",
        "snapshotSeq, timestamp",
        "mstRoot : Bytes<32>",
        "priceBtc / priceEth / priceUsdt",
        "declaredReserves BTC / ETH / USDT",
        "liabilities*Pos / liabilities*Neg",
        "published : Boolean",
    ]
    text(s, 7.8, 2.4, 4.5, 2.8, "\n".join(lines), size=12.5, color=TEXT, line_spacing=1.35)

    rect(s, 0.72, 5.2, 11.9, 1.15, fill=PANEL_2, line=LINE)
    text(s, 0.98, 5.4, 11.4, 0.35, "SIGNED BALANCES", size=9.5, color=ACCENT, bold=True)
    text(s, 0.98, 5.72, 11.4, 0.4, "x = pos - neg  ·  pos, neg are Uint<64>  ·  node sums are Uint<128>  ·  zero-balance leaves are padding", size=12, color=TEXT)
    footer(s, 7)
    notes(s, "Three assets share one tree. Gross long and short sums are public; only the net matters for exposure. Prices are public inputs and are stored with the snapshot.")


def slide_run(prs):
    s = blank(prs)
    kicker(s, "Reference run")
    title(s, "A real transaction on undeployed.")
    rows = [
        ["Field", "Value"],
        ["Contract", "301f868d…b877d117"],
        ["Tx hash", "5a5b879b…7e430344"],
        ["Block", "32"],
        ["MST root", "115b6628…bd34a2"],
        ["Authority", "5aee546a…2ec69"],
    ]
    table(s, 0.72, 1.78, 7.1, 3.5, rows, col_widths=[1.5, 5.3], font_size=11.5)

    # right metrics
    rect(s, 8.1, 1.78, 4.5, 3.5, fill=PANEL)
    text(s, 8.35, 1.98, 3.9, 0.3, "SNAPSHOT AT BLOCK 32", size=9.5, color=ACCENT, bold=True)
    metrics = [
        ("BTC", "117.0M", "net liabilities"),
        ("ETH", "497.5M", "net liabilities"),
        ("USDT", "248.0B", "net liabilities"),
    ]
    for i, (asset, value, label) in enumerate(metrics):
        y = 2.4 + i * 0.88
        text(s, 8.35, y, 0.9, 0.3, asset, size=11, color=MUTED, bold=True)
        text(s, 9.2, y - 0.05, 1.54, 0.35, value, size=18, color=TEXT, bold=True)
        text(s, 10.9, y, 1.5, 0.3, label, size=9.5, color=FAINT)

    rect(s, 0.72, 5.45, 11.9, 0.95, fill=RGBColor.from_string("0F2A2A"), line=ACCENT)
    text(s, 0.98, 5.62, 11.4, 0.3, "PROOF", size=9.5, color=ACCENT, bold=True)
    text(s, 0.98, 5.9, 11.4, 0.35, "k=20  ·  886,226 rows  ·  ~2 min  ·  upstream: testkit local chain", size=12.5, color=TEXT)
    text(s, 0.72, 6.62, 11.9, 0.3, "The local chain is ephemeral; values are from the recorded run output.", size=9.5, color=FAINT)
    footer(s, 8)
    notes(s, "This is a real deploy + submitSnapshot on the testkit undeployed chain. The chain is ephemeral, so the values are recorded from the run rather than a permanent explorer link.")


def slide_inclusion(prs):
    s = blank(prs)
    kicker(s, "User-verifiable")
    title(s, "Prove inclusion without revealing balances.")
    steps = [
        ("1", "Receive inclusion JSON", "6 sibling nodes, signed balances, prices, expected root."),
        ("2", "Recompute the path", "Leaf hash → 6 parent hashes and sums; compare root."),
        ("3", "Check NAV", "Signed balance × published prices must be positive."),
    ]
    for i, (num, head, body) in enumerate(steps):
        y = 1.8 + i * 1.35
        circle = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.78), Inches(y + 0.1), Inches(0.42), Inches(0.42))
        circle.fill.solid()
        circle.fill.fore_color.rgb = ACCENT
        circle.line.fill.background()
        circle.shadow.inherit = False
        text(s, 0.78, y + 0.17, 0.42, 0.25, num, size=10, color=BG, bold=True, align=PP_ALIGN.CENTER)
        text(s, 1.42, y + 0.06, 4.6, 0.35, head, size=16, color=TEXT, bold=True)
        text(s, 1.42, y + 0.47, 4.95, 0.65, body, size=12, color=MUTED, line_spacing=1.1)

    rect(s, 7.2, 1.8, 5.4, 3.75, fill=RGBColor.from_string("08111F"), line=LINE)
    text(s, 7.45, 1.98, 4.9, 0.3, "$ npm run verify-inclusion", size=10, color=ACCENT, bold=True)
    code = [
        "{",
        '  "ok": true,',
        '  "leafIndex": 2,',
        '  "leafHashMatches": true,',
        '  "recomputedRootHex": "115b…34a2",',
        '  "liabilitiesMatch": true,',
        '  "navValueMicroUsdt": "37050000000",',
        '  "navPositive": true',
        "}",
    ]
    text(s, 7.45, 2.38, 4.9, 2.8, "\n".join(code), size=11, color=TEXT, line_spacing=1.25)
    text(s, 7.45, 4.95, 4.9, 0.4, "Sample leaf: BTC long, ETH short, still NAV > 0.", size=10.5, color=MUTED)
    footer(s, 9)
    notes(s, "The verifier is a normal TypeScript CLI. It does not need a wallet or a proof server; it only needs the inclusion JSON and the published root.")


def slide_trust(prs):
    s = blank(prs)
    kicker(s, "Trust boundary")
    title(s, "Be explicit about what is not proved.")
    # two columns
    rect(s, 0.72, 1.8, 5.8, 4.3, fill=PANEL)
    text(s, 0.98, 2.0, 5.2, 0.3, "PROVED BY THE CIRCUIT", size=9.5, color=GREEN, bold=True)
    proved = [
        "MST root consistency",
        "Canonical signed balances",
        "Per-user NAV > 0 at submitted prices",
        "Net exposure ≤ declared reserves",
        "Only the authority can publish",
    ]
    for i, item in enumerate(proved):
        text(s, 0.98, 2.42 + i * 0.6, 0.3, 0.3, "✓", size=14, color=GREEN, bold=True)
        text(s, 1.3, 2.4 + i * 0.6, 4.9, 0.35, item, size=13, color=TEXT)

    rect(s, 6.82, 1.8, 5.8, 4.3, fill=PANEL)
    text(s, 7.08, 2.0, 5.2, 0.3, "NOT PROVED", size=9.5, color=AMBER, bold=True)
    not_proved = [
        "Prices reflect the real market",
        "Reserves match real assets",
        "Batch covers every user",
        "userIdHash maps to a real customer",
        "Internal ledger is honest",
    ]
    for i, item in enumerate(not_proved):
        text(s, 7.08, 2.42 + i * 0.6, 0.3, 0.3, "×", size=15, color=RED, bold=True)
        text(s, 7.4, 2.4 + i * 0.6, 4.9, 0.35, item, size=13, color=TEXT)

    text(s, 0.72, 6.35, 11.9, 0.4, "Prices and reserves are operator inputs, not an oracle. The trust boundary is documented in the repo.", size=12, color=MUTED)
    footer(s, 10)
    notes(s, "This is deliberate: the MVP proves internal consistency of the batch, not external truth. The README and TRUST-BOUNDARY.md say this explicitly.")


def slide_status(prs):
    s = blank(prs)
    kicker(s, "Status")
    title(s, "Wave 3: end-to-end, tested, documented.")
    metrics = [
        ("37", "tests passing", ACCENT),
        ("1", "undeployed tx", ACCENT),
        ("k=20", "886k rows", ACCENT_2),
        ("0", "balances on-chain", ACCENT),
    ]
    for i, (value, label, color) in enumerate(metrics):
        stat_card(s, 0.72 + i * 3.02, 1.8, 2.8, 1.35, value, label, accent=color, value_size=26)

    bullets(
        s,
        0.72,
        3.55,
        5.9,
        2.5,
        [
            "Real deploy + submitSnapshot on the testkit undeployed chain",
            "Circuit simulation, inclusion verification and NAV rejection tests",
            "English README, scope, encoding, trust-boundary and progress docs",
            "Apache-2.0, public repo tagged midnightntwrk",
        ],
        size=13,
        gap=12,
    )
    rect(s, 7.0, 3.55, 5.6, 2.55, fill=PANEL)
    text(s, 7.25, 3.75, 5.1, 0.3, "WAVE 3 PROGRESS", size=9.5, color=ACCENT, bold=True)
    progress = [
        "Signed three-asset balances",
        "Public-price NAV check",
        "Authority-gated submit",
        "Undeployed reference run",
    ]
    for i, item in enumerate(progress):
        text(s, 7.25, 4.15 + i * 0.45, 0.3, 0.3, "✓", size=12, color=GREEN, bold=True)
        text(s, 7.55, 4.13 + i * 0.45, 4.8, 0.35, item, size=12, color=TEXT)
    text(s, 7.25, 5.9, 5.1, 0.3, "See docs/PROGRESS-WAVE3.md", size=9.5, color=FAINT)
    footer(s, 11)
    notes(s, "The evidence is in the repo: tests, docs and a recorded reference run. The remaining gap is external truth: prices, reserves and coverage.")


def slide_next(prs):
    s = blank(prs)
    kicker(s, "Next")
    title(s, "From MVP to production PoR.")
    items = [
        ("Preprod / ledger-9", "Upgrade the toolchain and deploy the same statement on Preprod."),
        ("On-chain inclusion", "Move the inclusion check into a second Compact circuit."),
        ("Scale", "128 → 1024 leaves and batch aggregation; measure k and proof time."),
        ("External truth", "Price oracle, reserve attestations and an auditor portal."),
    ]
    for i, (head, body) in enumerate(items):
        x = 0.72 + (i % 2) * 6.05
        y = 1.8 + (i // 2) * 1.55
        rect(s, x, y, 5.75, 1.3, fill=PANEL)
        text(s, x + 0.25, y + 0.18, 5.2, 0.35, head, size=16, color=ACCENT, bold=True)
        text(s, x + 0.25, y + 0.58, 5.2, 0.6, body, size=12, color=MUTED, line_spacing=1.05)

    rect(s, 0.72, 5.2, 11.9, 1.25, fill=RGBColor.from_string("0F2A2A"), line=ACCENT)
    text(s, 0.98, 5.38, 11.3, 0.45, "Verifiable reserves without surveillance.", size=24, color=TEXT, bold=True)
    text(s, 0.98, 5.86, 11.3, 0.35, "github.com/ardmere/ardmere-midnight-demo  ·  Apache-2.0", size=11, color=ACCENT)
    footer(s, 12)
    notes(s, "Close with the product statement and the repository link. Invite judges to run the local commands or inspect the recorded undeployed run.")


def main():
    prs = new_deck()
    slide_title(prs)
    slide_problem(prs)
    slide_idea(prs)
    slide_why(prs)
    slide_architecture(prs)
    slide_circuit(prs)
    slide_data(prs)
    slide_run(prs)
    slide_inclusion(prs)
    slide_trust(prs)
    slide_status(prs)
    slide_next(prs)

    out_dir = os.path.join(os.path.dirname(__file__), "..", "docs", "slides")
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.abspath(os.path.join(out_dir, "Standardized-Midnight-PoR-Wave3.pptx"))
    prs.save(out)
    print(out)
    print("slides:", len(prs.slides))


if __name__ == "__main__":
    main()
