---
title: Regex Tester Interface
status: in_progress
priority: high
type: feature
tags: [core, ui]
created_by: agent
created_at: 2026-05-05T11:24:06Z
position: 1
---

## Notes
Build the main regex tester interface with split-pane layout. User enters regex pattern and flags, test string in a textarea, sees matches highlighted in real-time. Include a collapsible reference guide sidebar with common patterns.

## Checklist
- [x] Create RegexTester component with pattern input, flags checkboxes, test string textarea
- [x] Implement real-time pattern matching with match highlighting
- [x] Display match count, matched strings, and capture groups
- [x] Create QuickReference component with common regex patterns organized by category
- [x] Make reference guide collapsible/expandable
- [x] Add error handling for invalid regex patterns
- [x] Setup design system in globals.css and tailwind.config.ts
- [x] Update index.tsx with RegexTester as main interface

## Acceptance
- User can type a regex pattern and see matches highlight instantly in the test string
- Invalid patterns show clear error messages
- Reference guide is accessible and shows categorized common patterns