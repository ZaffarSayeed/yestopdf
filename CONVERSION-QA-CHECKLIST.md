# YesToPDF conversion quality gate

Use this checklist before claiming production-grade Office conversion. Keep the source files and reviewed output files in a private test folder; do not upload customer documents for QA without permission.

## PDF → Word
- [ ] One-page text-only PDF
- [ ] Multi-page PDF with page breaks
- [ ] Two-column newsletter/report
- [ ] Tables with merged cells
- [ ] Headers, footers, page numbers
- [ ] Embedded images, captions, logos
- [ ] Different fonts, bold/italic, mixed font sizes
- [ ] Scanned PDF (confirm OCR is explicitly available)
- [ ] Right-to-left and non-Latin text where relevant

## Word → PDF
- [ ] DOCX with images, tables, headers/footers
- [ ] Page sizes/orientation and margins
- [ ] Page numbers and hyperlinks
- [ ] Fonts present and missing on worker
- [ ] Multi-page layout compared against Word's own PDF export

## PDF → Excel
- [ ] Simple and multi-page tables
- [ ] Currency, dates, negative values, percentages
- [ ] Repeated header rows and merged cells
- [ ] Scanned invoice/table (OCR workflow required)
- [ ] Validate row/column order and totals

## PDF → PowerPoint
- [ ] Text-heavy slide-like PDF
- [ ] Images, diagrams and charts
- [ ] Confirm background is visually aligned
- [ ] Confirm overlay text is not visibly duplicated or offset
- [ ] Check each output slide in PowerPoint and LibreOffice Impress

## Release decision
Do not release an operation if output is corrupt, the API leaks server paths or tracebacks, temp files persist after download/error, or representative documents fail the visual/content review. Record limitations in the tool page.
