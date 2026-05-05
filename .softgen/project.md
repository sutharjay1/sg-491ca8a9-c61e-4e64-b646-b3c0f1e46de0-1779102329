## Vision
A real-time regular expression tester for developers. Test regex patterns instantly, visualize matches with highlighting, and access a quick reference guide for common patterns. Target users: developers, data analysts, anyone working with text pattern matching.

## Design
Terminal-inspired developer tool aesthetic with high contrast and immediate feedback.

Colors (HSL format):
- `--background: 222 15% 8%` (charcoal)
- `--foreground: 38 5% 96%` (off-white)
- `--primary: 38 100% 50%` (amber — terminal glow)
- `--secondary: 215 20% 25%` (muted slate)
- `--accent: 142 76% 45%` (emerald — match highlight)
- `--muted: 217 15% 20%` (dark slate)
- `--border: 217 15% 25%` (slate border)
- `--input: 217 15% 15%` (input background)

Typography:
- Headings: Sora (geometric, technical)
- Body/Labels: IBM Plex Sans
- Code/Patterns: JetBrains Mono (monospace, tabular-nums)

Style: Dense developer console, split-pane layout, syntax-highlighting color scheme, high contrast for readability.

## Features
- Real-time regex pattern testing with instant match feedback
- Visual match highlighting in test strings
- Support for regex flags (global, case-insensitive, multiline, etc.)
- Quick reference guide with common patterns and syntax
- Match groups display and capture group extraction
- Clear error messages for invalid patterns