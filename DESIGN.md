---
version: 1.0.0
name: Income & Expense Tracker
description: |
  Personal finance tracker with a clean dashboard, receipt upload,
  and monthly Excel export — built with Next.js + Node.js backend.
  Inspired by Revolut's high-contrast design system.
colors:
  primary: "#494fdf"
  primary-bright: "#4f55f1"
  primary-deep: "#3a40c4"
  on-primary: "#ffffff"
  ink: "#191c1f"
  body: "#1f2226"
  charcoal: "#3a3d40"
  mute: "#505a63"
  ash: "#5c5e60"
  stone: "#8d969e"
  faint: "#c9c9cd"
  on-dark: "#ffffff"
  on-dark-mute: "rgba(255,255,255,0.72)"
  canvas-light: "#ffffff"
  canvas-dark: "#000000"
  surface-soft: "#f4f4f4"
  surface-card: "#ffffff"
  surface-deep: "#0a0a0a"
  surface-elevated: "#16181a"
  hairline-light: "#e2e2e7"
  hairline-dark: "rgba(255,255,255,0.12)"
  hairline-strong: "#191c1f"
  accent-teal: "#00a87e"
  accent-green: "#428619"
  accent-warning: "#ec7e00"
  accent-danger: "#e23b4a"
  link: "#376cd5"
  income-green: "#00a87e"
  expense-red: "#e23b4a"

typography:
  display-xl:
    fontFamily: Aeonik Pro, Inter
    fontSize: 80px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: -0.8px
  display-lg:
    fontFamily: Aeonik Pro, Inter
    fontSize: 48px
    fontWeight: 500
    lineHeight: 1.21
    letterSpacing: -0.48px
  heading-lg:
    fontFamily: Aeonik Pro, Inter
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.19
    letterSpacing: -0.32px
  heading-md:
    fontFamily: Aeonik Pro, Inter
    fontSize: 24px
    fontWeight: 500
    lineHeight: 1.33
  heading-sm:
    fontFamily: Aeonik Pro, Inter
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.56
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.24px
  body-md-bold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.43
  button-lg:
    fontFamily: Aeonik Pro, Inter
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.4
  button-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: 0.24px
  button-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.43
  caption:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4

rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 20px
  xl: 28px
  full: 9999px

spacing:
  xxs: 4px
  xs: 6px
  sm: 8px
  md: 14px
  lg: 16px
  xl: 24px
  xxl: 32px
  xxxl: 48px
  block-to-pad: 80px
  section: 88px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
    height: 48px
  button-primary-outline:
    backgroundColor: transparent
    borderColor: "{colors.primary}"
    textColor: "{colors.primary}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 13px 27px
    height: 48px
  button-dark:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
    height: 48px
  button-soft:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.button-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
    height: 48px
  text-input:
    backgroundColor: "{colors.canvas-light}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    borderColor: "{colors.hairline-light}"
    rounded: "{rounded.md}"
    padding: 14px 16px
    height: 56px
  card-light:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
    border: 1px solid "{colors.hairline-light}"
  card-dark:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 32px
  stat-card:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.lg}"
    padding: 24px
  badge-income:
    backgroundColor: "{colors.accent-green}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  badge-expense:
    backgroundColor: "{colors.accent-danger}"
    textColor: "{colors.on-primary}"
    typography: "{typography.caption}"
    rounded: "{rounded.full}"
    padding: 4px 12px
  nav-bar:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark}"
    typography: "{typography.button-md}"
    rounded: "{rounded.none}"
    height: 64px
    padding: 0 24px
  sidebar:
    backgroundColor: "{colors.surface-deep}"
    textColor: "{colors.on-dark-mute}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    width: 240px
  footer:
    backgroundColor: "{colors.canvas-dark}"
    textColor: "{colors.on-dark-mute}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: 48px 24px

## Overview

Income & Expense Tracker is a personal finance web app with a clean
Revolut-inspired dark UI. Core features:

- **Dashboard** — balance overview, income vs expense chart (line/bar), monthly summary
- **Transaction list** — filterable table with search, date range, category
- **Receipt upload** — drag-and-drop photo/file upload with preview
- **Excel export** — monthly report as downloadable .xlsx

## Design Principles

- Dark canvas base (`#000000`) with elevated card surfaces (`#16181a`)
- Primary cobalt `#494fdf` for CTAs and accents
- Green `#00a87e` for income, red `#e23b4a` for expenses
- Pill buttons (`border-radius: 9999px`), rounded-lg cards (20px)
- Recharts for all data visualizations
- Inter for body, Aeonik Pro / system sans for display headings

## Colors

- **Income**: `#00a87e` (teal-green)
- **Expense**: `#e23b4a` (danger red)
- **Primary CTA**: `#494fdf` (cobalt violet)
- **Surface elevated**: `#16181a` (dark card)
- **Canvas dark**: `#000000` (page background)
- **Hairline dark**: `rgba(255,255,255,0.12)` (dividers on dark)

## Layout

- **Sidebar nav** (240px wide, dark) + **main content area**
- **Max content width**: 1200px, centered in main area
- **Grid**: 4-column stat cards → 2-column → 1-column (responsive)
- **Section padding**: 88px vertical between major bands

## Pages

1. `/` — Dashboard: balance hero, income/expense chart, recent transactions
2. `/transactions` — Full transaction list with filters
3. `/add` — Add new income or expense entry + file upload
4. `/export` — Select month and export Excel report
