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
    text(s, 0.85, 0.75, 6.5, 0.3, "MIDNIGHT BUILDATHON  ·  WAVE 3", size=11, color=ACCENT, bold=True)
    text(s, 0.85, 1.35, 6.6, 2.2, "Standardized\nMidnight PoR", size=46, color=TEXT, bold=True, line_spacing=0.92)
    text(s, 0.85, 3.55, 5.9, 1.0, "A standard protocol for private,\nverifiable proof of reserves.", size=20, color=MUTED, line_spacing=1.15)
    text(s, 0.85, 5.15, 6.6, 0.9, "Multi-asset Merkle Sum Tree  ·  one Compact proof", size=13, color=TEXT)
    pill(s, 0.85, 5.95, 1.05, 0.36, "APACHE 2.0", color=ACCENT)
    text(s, 2.05, 6.02, 4.8, 0.3, "github.com/ardmere/ardmere-midnight-demo", size=10.5, color=FAINT)

    cx, cy = 10.35, 3.55
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

    for dx, dy in [(-1.1, 0.35), (0.0, 0.95), (1.1, 0.35)]:
        x = cx + dx - 0.42
        y = cy + dy
        connector(s, cx, cy - 0.55, cx + dx, y + 0.1, color=LINE, width=1.4)
        node = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x), Inches(y), Inches(0.84), Inches(0.84))
        node.fill.solid()
        node.fill.fore_color.rgb = PANEL_2
        node.line.color.rgb = ACCENT_2
        node.line.width = Pt(1.2)
        node.shadow.inherit = False
        inner = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x + 0.34), Inches(y + 0.34), Inches(0.16), Inches(0.16))
        inner.fill.solid()
        inner.fill.fore_color.rgb = ACCENT
        inner.line.fill.background()
        inner.shadow.inherit = False

    for i in range(8):
        x = cx - 1.75 + i * 0.5
        y = cy + 2.0
        connector(s, cx - 1.1 + (i % 3) * 1.1, cy + 1.25, x + 0.1, y, color=LINE, width=0.8)
        leaf = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(x), Inches(y), Inches(0.2), Inches(0.2))
        leaf.fill.solid()
        leaf.fill.fore_color.rgb = FAINT
        leaf.line.fill.background()
        leaf.shadow.inherit = False

    footer(s, 1)
    notes(s, "Wave 3 submission for the Midnight Buildathon. The deck covers the industry problem, the standard protocol, why Midnight, the reference demo and the path to production.")


def slide_thesis(prs):
    s = blank(prs)
    kicker(s, "Thesis")
    title(s, "A standard protocol, not another PoR product.")
    text(s, 0.72, 1.55, 11.6, 0.6, "One schema, one contract interface, one verifier — reusable by any exchange.", size=18, color=MUTED, line_spacing=1.1)

    cards = [
        ("Standard schema", "The same fields and encoding for every operator, so snapshots are comparable."),
        ("Standard circuit", "The same guarantees — not a bespoke circuit per exchange."),
        ("Standard verifier", "One verification path for users, regulators and independent verifiers."),
    ]
    for i, (head, body) in enumerate(cards):
        x = 0.72 + i * 4.05
        rect(s, x, 2.5, 3.75, 2.15, fill=PANEL)
        text(s, x + 0.28, 2.72, 3.2, 0.4, head, size=18, color=ACCENT, bold=True)
        text(s, x + 0.28, 3.25, 3.2, 1.15, body, size=13, color=MUTED, line_spacing=1.12)

    rect(s, 0.72, 5.15, 11.9, 1.0, fill=RGBColor.from_string("0F2A2A"), line=ACCENT)
    text(s, 0.98, 5.38, 11.4, 0.5, "The reference implementation proves the standard is practical on Midnight.", size=17, color=TEXT, bold=True)
    footer(s, 2)
    notes(s, "The product is the standard, not a single exchange deployment. The reference implementation proves the standard is practical on Midnight.")


def slide_pain(prs):
    s = blank(prs)
    kicker(s, "01 · Industry pain")
    title(s, "Proof of reserves is still a specialist build.")
    text(s, 0.72, 1.55, 11.6, 0.6, "Fragmented proofs, high cryptography cost, and verification that is too hard for users.", size=17, color=MUTED, line_spacing=1.1)

    cards = [
        ("01", "Fragmentation", "Every exchange builds its own proof system, circuit, tree and verifier. Regulators, users and independent third parties have no common verification tool, so snapshots cannot be compared across exchanges."),
        ("02", "Cost and scarce expertise", "ZK circuits require specialist engineers and continuous security review; smaller operators cannot justify a bespoke build."),
        ("03", "Verification is too hard", "Users are asked to verify global proofs themselves and follow long exchange runbooks — so most users never verify."),
    ]
    for i, (num, head, body) in enumerate(cards):
        x = 0.72 + i * 4.05
        rect(s, x, 2.45, 3.75, 2.65, fill=PANEL)
        text(s, x + 0.28, 2.65, 0.5, 0.4, num, size=10, color=ACCENT, bold=True)
        text(s, x + 0.28, 3.02, 3.2, 0.45, head, size=16, color=TEXT, bold=True)
        text(s, x + 0.28, 3.55, 3.2, 1.3, body, size=11.2, color=MUTED, line_spacing=1.08)

    rect(s, 0.72, 5.5, 11.9, 0.9, fill=PANEL_2, line=LINE)
    text(s, 0.98, 5.72, 11.4, 0.4, "No common verification path — for regulators, users, or independent verifiers.", size=14, color=TEXT)
    footer(s, 3)
    notes(s, "The assessment document highlights fragmentation and cryptographic cost; the third pain is the user-facing verification burden. Per-user NAV is treated as a baseline circuit requirement, not an industry pain.")


def slide_who(prs):
    s = blank(prs)
    kicker(s, "01 · Who needs this")
    title(s, "Who needs a standard PoR protocol?")
    text(s, 0.72, 1.55, 11.6, 0.55, "The buyer is the exchange; the beneficiary is the user; the standard is the public good.", size=16, color=MUTED)

    rows = [
        ["Audience", "What they need"],
        ["Mid-tier exchanges", "No in-house ZK team. Need a turnkey way to build, prove and publish a snapshot."],
        ["Regulators, auditors and independent verifiers", "One schema and one verifier, so snapshots from different operators are comparable and independently checkable."],
        ["Users", "A simple inclusion check against the anchored root — no global proof, no runbook, no public balance disclosure."],
        ["Custodians / payment institutions", "The same reserve-attestation pattern beyond centralized exchanges."],
    ]
    table(s, 0.72, 2.25, 11.9, 3.45, rows, col_widths=[3.5, 8.4], font_size=12)

    text(s, 0.72, 6.0, 11.9, 0.4, "Lower cost for operators, comparability for regulators and independent verifiers, and a one-path check for users.", size=12.5, color=MUTED)
    footer(s, 4)
    notes(s, "This is the demand side. The standard is a public good, but the exchange is the buyer because it reduces compliance and engineering cost. Regulators, auditors and independent verifiers get the same schema and the same check, which is what makes cross-exchange comparison possible.")


def slide_why(prs):
    s = blank(prs)
    kicker(s, "02 · Why Midnight")
    title(s, "Midnight makes PoR a protocol, not a project.")
    text(s, 0.72, 1.55, 11.6, 0.55, "Private witness, public verification, and automatic proof checking at submission.", size=16, color=MUTED)

    items = [
        ("Compact", "TypeScript-like ZK contracts with explicit disclose(); the circuit and verifier are generated by the compiler."),
        ("Private state", "Balances and userIdHash values stay in the witness; they never reach the public ledger."),
        ("Public ledger", "Only the anchored root, prices, reserves and aggregate values are stored."),
        ("Automatic verification", "At submission, the contract verifies the global proof. An invalid proof cannot update state."),
    ]
    for i, (head, body) in enumerate(items):
        x = 0.72 + (i % 2) * 6.05
        y = 2.45 + (i // 2) * 1.7
        rect(s, x, y, 5.75, 1.45, fill=PANEL)
        text(s, x + 0.25, y + 0.2, 5.2, 0.35, head, size=17, color=ACCENT, bold=True)
        text(s, x + 0.25, y + 0.62, 5.2, 0.7, body, size=11.5, color=MUTED, line_spacing=1.05)

    rect(s, 0.72, 6.15, 11.9, 0.55, fill=PANEL_2, line=LINE)
    text(s, 0.95, 6.27, 11.4, 0.3, "The global proof is a submission-time check, not a user task.", size=13, color=TEXT)
    footer(s, 5)
    notes(s, "This is the key UX shift. Midnight's dual-state model and on-chain verification make the protocol practical: the operator proves once, the contract verifies once, and users only check their own path.")


def slide_problems(prs):
    s = blank(prs)
    kicker(s, "03 · Solution")
    title(s, "Four hard problems. Four design responses.")
    text(s, 0.72, 1.5, 11.6, 0.5, "The protocol has to stay usable as the operator, the asset set and the user base grow.", size=15, color=MUTED)

    cards = [
        ("01", "Scale", "Bounded batch proofs today; sharded batches and aggregation for large user bases."),
        ("02", "Cross-chain reserves", "reserveProofHash anchor plus challenge-response and time locking for external assets."),
        ("03", "Omission attacks", "Standardized inclusion path and a one-path local verifier / skill."),
        ("04", "Compiler and cryptography trust", "Pin an audited Compact version and state the compiler / proof-system trust boundary explicitly."),
    ]
    for i, (num, head, body) in enumerate(cards):
        x = 0.72 + (i % 2) * 6.05
        y = 2.2 + (i // 2) * 1.75
        rect(s, x, y, 5.75, 1.5, fill=PANEL)
        text(s, x + 0.24, y + 0.18, 0.45, 0.3, num, size=10, color=ACCENT, bold=True)
        text(s, x + 0.24, y + 0.5, 5.2, 0.35, head, size=15.5, color=TEXT, bold=True)
        text(s, x + 0.24, y + 0.92, 5.2, 0.55, body, size=11, color=MUTED, line_spacing=1.05)

    footer(s, 6)
    notes(s, "These are the four bottlenecks from the assessment: scale, cross-chain asset anchoring, omission, and compiler trust. The next slides show how the protocol addresses them.")


def slide_architecture(prs):
    s = blank(prs)
    kicker(s, "03 · Solution")
    title(s, "Exchange-local proving, chain-level verification.")
    text(s, 0.72, 1.5, 11.6, 0.5, "The exchange keeps the data; Midnight keeps the commitment.", size=16, color=MUTED)

    boxes = [
        ("EXCHANGE LOCAL", "Build + prove", "MST builder, proof server, private balances, inclusion JSON.", 0.72),
        ("MIDNIGHT CONTRACT", "Verify + anchor", "Verifies the global proof; stores root, prices, reserves, aggregates; authority.", 4.75),
        ("USER", "Read + check one path", "Reads the anchored root; verifies inclusion locally with a skill.", 8.78),
    ]
    for label, head, body, x in boxes:
        rect(s, x, 2.15, 3.8, 2.15, fill=PANEL)
        text(s, x + 0.22, 2.35, 3.35, 0.25, label, size=9, color=ACCENT, bold=True)
        text(s, x + 0.22, 2.68, 3.35, 0.4, head, size=16, color=TEXT, bold=True)
        text(s, x + 0.22, 3.2, 3.35, 0.95, body, size=10.8, color=MUTED, line_spacing=1.08)

    arrow(s, 4.55, 3.1, w=0.18, h=0.22)
    arrow(s, 8.58, 3.1, w=0.18, h=0.22)

    rect(s, 1.5, 5.2, 10.3, 1.15, fill=RGBColor.from_string("0F2A2A"), line=ACCENT)
    text(s, 1.75, 5.38, 9.8, 0.3, "REGULATORS / AUDITORS / INDEPENDENT VERIFIERS", size=9, color=ACCENT, bold=True)
    text(s, 1.75, 5.7, 9.8, 0.45, "Same public state and snapshot history; compare operators on one schema.", size=12.5, color=TEXT)

    footer(s, 7)
    notes(s, "The division of labor is deliberate. The exchange does the heavy proving; the contract does the global verification; the user does only a local path check; auditors read the same public state.")


def slide_schema(prs):
    s = blank(prs)
    kicker(s, "03 · Solution")
    title(s, "One snapshot schema for every exchange.")
    text(s, 0.72, 1.55, 11.6, 0.5, "Same fields, same encoding, same verifier.", size=16, color=MUTED)

    rows = [
        ["Field", "Purpose"],
        ["snapshotId, timestamp", "Ordered snapshot identity and time anchor."],
        ["merkleSumRoot", "The root users check their inclusion path against."],
        ["declaredReserves", "Per-asset reserves, as a vector or a commitment."],
        ["declaredLiabilities", "The aggregate liabilities proved by the circuit."],
        ["reserveProofHash", "External-chain reserve anchor (production extension)."],
        ["authority, published", "Who may publish; whether the snapshot is live."],
    ]
    table(s, 0.72, 2.2, 11.9, 3.55, rows, col_widths=[4.1, 7.8], font_size=12)
    text(s, 0.72, 6.0, 11.9, 0.5, "The reference implementation covers the root, prices, reserves, aggregate sums, authority and published flag. reserveProofHash is the cross-chain extension point.", size=10.5, color=MUTED, line_spacing=1.1)
    footer(s, 8)
    notes(s, "Standardization is mostly about agreeing on fields and encoding. Once the schema is fixed, the same verifier works for every operator.")


def slide_guarantees(prs):
    s = blank(prs)
    kicker(s, "03 · Solution")
    title(s, "What the circuit actually guarantees.")
    checks = [
        ("01", "Authority", "Only the operator's coin public key can publish."),
        ("02", "Balance encoding", "Non-negative in the assessment MVP; canonical signed (pos, neg) in the reference. Encoding, not solvency."),
        ("03", "Per-user solvency", "NAV > 0 at public prices; a single-asset net may be negative."),
        ("04", "Root integrity", "The recomputed MST root equals the anchored root."),
        ("05", "Reserve check", "Total or per-asset exposure is within declared reserves."),
        ("06", "One-shot publication", "published prevents silent replacement."),
    ]
    for i, (num, head, body) in enumerate(checks):
        col = i % 3
        row = i // 3
        x = 0.72 + col * 4.02
        y = 1.8 + row * 2.0
        rect(s, x, y, 3.78, 1.7, fill=PANEL)
        text(s, x + 0.22, y + 0.16, 0.45, 0.3, num, size=10, color=ACCENT, bold=True)
        text(s, x + 0.22, y + 0.46, 3.3, 0.35, head, size=14.5, color=TEXT, bold=True)
        text(s, x + 0.22, y + 0.86, 3.3, 0.75, body, size=10.2, color=MUTED, line_spacing=1.02)

    rect(s, 0.72, 6.0, 11.9, 0.55, fill=PANEL_2, line=LINE)
    text(s, 0.95, 6.12, 11.4, 0.3, "These are consistency guarantees; external truth is covered by the trust boundary.", size=12, color=TEXT)
    footer(s, 9)
    notes(s, "Balance encoding is not the solvency check. Because the reference supports lending and short positions, a single-asset net balance may be negative; solvency is enforced by per-user NAV > 0 at the submitted prices. In a single-asset deployment this reduces to net balance > 0.")


def slide_status(prs):
    s = blank(prs)
    kicker(s, "03 · Solution")
    title(s, "From assessment to a working reference.")
    text(s, 0.72, 1.5, 11.6, 0.5, "The four-phase MVP plan is largely implemented; the user-facing skill is the next layer.", size=15, color=MUTED)

    rows = [
        ["Phase", "Plan", "Status"],
        ["1", "MST library and serialization", "Done"],
        ["2", "Compact contract and circuit tests", "Done"],
        ["3", "Deploy and submit", "Local undeployed chain done; Preprod pending"],
        ["4", "User verifier and documentation", "CLI and English docs done; one-click skill pending"],
    ]
    table(s, 0.72, 2.15, 11.9, 2.55, rows, col_widths=[0.9, 5.4, 5.6], font_size=12)

    rect(s, 0.72, 5.0, 11.9, 1.15, fill=PANEL)
    text(s, 0.98, 5.18, 11.4, 0.3, "SCOPE NOTE", size=9, color=ACCENT, bold=True)
    text(s, 0.98, 5.48, 11.4, 0.55, "The assessment MVP targets a single core asset, non-negative balances and total liabilities ≤ reserves. The reference already generalizes to multi-asset signed balances, per-user NAV and per-asset exposure.", size=10.5, color=MUTED, line_spacing=1.08)
    footer(s, 10)
    notes(s, "Be explicit about the delta: the reference implementation goes beyond the assessment's first MVP in asset modeling, but it still follows the same four-phase delivery path. The remaining gap is the user-facing skill and Preprod.")


def slide_results(prs):
    s = blank(prs)
    kicker(s, "04 · Demo")
    title(s, "A real snapshot, verified end to end.")
    text(s, 0.72, 1.55, 11.6, 0.5, "A real transaction on a local Midnight chain; the contract verified the proof before updating state.", size=14, color=MUTED)

    rows = [
        ["Field", "Value"],
        ["Contract", "301f868d…b877d117"],
        ["Tx hash", "5a5b879b…7e430344"],
        ["Block", "32"],
        ["MST root", "115b6628…bd34a2"],
        ["Authority", "5aee546a…2ec69"],
    ]
    table(s, 0.72, 1.95, 7.1, 3.3, rows, col_widths=[1.5, 5.3], font_size=11.5)

    rect(s, 8.1, 1.95, 4.5, 3.3, fill=PANEL)
    text(s, 8.35, 2.15, 3.9, 0.3, "SNAPSHOT VERIFICATION", size=9.5, color=ACCENT, bold=True)
    checks = [("published", "true"), ("exposure checks", "pass"), ("inclusion check", "pass"), ("test suite", "37 passed")]
    for i, (label, value) in enumerate(checks):
        y = 2.58 + i * 0.62
        text(s, 8.35, y, 2.4, 0.3, label, size=11.5, color=MUTED)
        text(s, 10.55, y, 1.8, 0.3, value, size=13, color=GREEN, bold=True)

    rect(s, 0.72, 5.45, 11.9, 0.95, fill=RGBColor.from_string("0F2A2A"), line=ACCENT)
    text(s, 0.98, 5.62, 11.4, 0.3, "PROOF", size=9.5, color=ACCENT, bold=True)
    text(s, 0.98, 5.9, 11.4, 0.35, "k=20  ·  ~886k rows  ·  ~2 min  ·  upstream: testkit local chain", size=12.5, color=TEXT)
    text(s, 0.72, 6.62, 11.9, 0.3, "The local chain is ephemeral; values are from the recorded run output.", size=9.5, color=FAINT)
    footer(s, 11)
    notes(s, "This is a real deploy and submitSnapshot on the testkit undeployed chain. The contract verified the global proof before the state update; the user-side path check is on the next slide.")


def slide_verification(prs):
    s = blank(prs)
    kicker(s, "04 · Demo — User verification")
    title(s, "Verification in one Merkle path.")
    text(s, 0.72, 1.55, 11.6, 0.55, "The global proof is verified once, by the contract. The user verifies only their own inclusion path.", size=15, color=MUTED, line_spacing=1.05)

    steps = [
        ("1", "The contract anchors the root", "At submission, the contract verifies the global proof and stores the root only if the proof is valid."),
        ("2", "The user receives an inclusion JSON", "Sibling nodes, signed balances and the published prices."),
        ("3", "One local check", "Recompute the leaf and parent steps; compare with the anchored root; optionally check NAV > 0."),
    ]
    for i, (num, head, body) in enumerate(steps):
        y = 2.2 + i * 1.2
        circle = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(0.78), Inches(y + 0.08), Inches(0.4), Inches(0.4))
        circle.fill.solid()
        circle.fill.fore_color.rgb = ACCENT
        circle.line.fill.background()
        circle.shadow.inherit = False
        text(s, 0.78, y + 0.15, 0.4, 0.25, num, size=9.5, color=BG, bold=True, align=PP_ALIGN.CENTER)
        text(s, 1.4, y + 0.03, 4.8, 0.35, head, size=14.5, color=TEXT, bold=True)
        text(s, 1.4, y + 0.42, 4.95, 0.7, body, size=10.8, color=MUTED, line_spacing=1.05)

    rect(s, 7.0, 1.9, 5.6, 3.3, fill=RGBColor.from_string("08111F"), line=LINE)
    text(s, 7.25, 2.08, 5.1, 0.3, "$ verify-user --root 0x115b… --path alice.json", size=9.5, color=ACCENT, bold=True)
    code = [
        "✓ leaf included",
        "✓ root matches",
        "✓ NAV > 0",
    ]
    text(s, 7.25, 2.65, 5.1, 1.6, "\n".join(code), size=14, color=TEXT, line_spacing=1.5)
    text(s, 7.25, 4.35, 5.1, 0.55, "No proof server. No global proof. No exchange runbook.", size=11.5, color=ACCENT, bold=True, line_spacing=1.1)

    text(s, 0.72, 5.7, 11.9, 0.4, "No public balance disclosure. The user checks only their own path.", size=12, color=TEXT)
    text(s, 0.72, 6.15, 11.9, 0.4, "Reference CLI: npm run verify-inclusion  ·  production: one-click verification skill or browser widget.", size=9.5, color=FAINT)
    footer(s, 12)
    notes(s, "This is the UX differentiator. Existing PoR flows ask users to verify the global proof and follow complex instructions. Here the global proof is already checked by the contract; the user only checks one path, which a simple skill can automate.")


def slide_trust(prs):
    s = blank(prs)
    kicker(s, "04 · Demo / Trust")
    title(s, "What this proves — and what it does not.")
    rect(s, 0.72, 1.8, 5.8, 4.3, fill=PANEL)
    text(s, 0.98, 2.0, 5.2, 0.3, "PROVED BY THE CIRCUIT", size=9.5, color=GREEN, bold=True)
    proved = [
        "MST root consistency",
        "Canonical signed-balance encoding",
        "Per-user NAV > 0 at submitted prices",
        "Exposure within declared reserves",
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
        "The batch covers every user",
        "userIdHash maps to a real customer",
        "The internal ledger is honest",
    ]
    for i, item in enumerate(not_proved):
        text(s, 7.08, 2.42 + i * 0.6, 0.3, 0.3, "×", size=15, color=RED, bold=True)
        text(s, 7.4, 2.4 + i * 0.6, 4.9, 0.35, item, size=13, color=TEXT)

    text(s, 0.72, 6.35, 11.9, 0.4, "The contract verifies the proof, not external truth. Prices and reserves are operator inputs, not an oracle.", size=12, color=MUTED)
    footer(s, 13)
    notes(s, "The trust boundary is part of the product. The protocol makes verification cheap; it does not replace external reserve attestation or price oracles.")


def slide_next(prs):
    s = blank(prs)
    kicker(s, "05 · Next")
    title(s, "From reference MVP to production PoR.")
    items = [
        ("One-click verification skill", "A browser widget or CLI that takes the anchored root and an inclusion JSON and returns pass/fail, with no runbook."),
        ("Sharded aggregation", "Bounded batches and a batch-root aggregation tree for large user bases."),
        ("Cross-chain reserve anchor", "reserveProofHash, challenge-response and time locking so external reserves and liabilities share one timestamp."),
        ("Auditor portal and Preprod", "Snapshot history, schema versioning, compiler audit and the ledger-9 upgrade."),
    ]
    for i, (head, body) in enumerate(items):
        x = 0.72 + (i % 2) * 6.05
        y = 1.8 + (i // 2) * 1.55
        rect(s, x, y, 5.75, 1.35, fill=PANEL)
        text(s, x + 0.25, y + 0.18, 5.2, 0.35, head, size=15.5, color=ACCENT, bold=True)
        text(s, x + 0.25, y + 0.58, 5.2, 0.65, body, size=10.5, color=MUTED, line_spacing=1.02)

    rect(s, 0.72, 5.2, 11.9, 1.25, fill=RGBColor.from_string("0F2A2A"), line=ACCENT)
    text(s, 0.98, 5.38, 11.3, 0.45, "Verifiable reserves without surveillance.", size=24, color=TEXT, bold=True)
    text(s, 0.98, 5.86, 11.3, 0.35, "github.com/ardmere/ardmere-midnight-demo  ·  Apache-2.0", size=11, color=ACCENT)
    footer(s, 14)
    notes(s, "Close on the standard and the simple user path. The next milestone is the one-click skill; the larger architecture work is aggregation, cross-chain anchoring and the auditor portal.")


def main():
    prs = new_deck()
    slide_title(prs)
    slide_thesis(prs)
    slide_pain(prs)
    slide_who(prs)
    slide_why(prs)
    slide_problems(prs)
    slide_architecture(prs)
    slide_schema(prs)
    slide_guarantees(prs)
    slide_status(prs)
    slide_results(prs)
    slide_verification(prs)
    slide_trust(prs)
    slide_next(prs)

    out_dir = os.path.join(os.path.dirname(__file__), "..", "docs", "slides")
    os.makedirs(out_dir, exist_ok=True)
    out = os.path.abspath(os.path.join(out_dir, "Standardized-Midnight-PoR-Wave3.pptx"))
    prs.save(out)
    print(out)
    print("slides:", len(prs.slides))


if __name__ == "__main__":
    main()
