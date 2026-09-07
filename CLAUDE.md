@.claude/rules/api-conventions.md
@.claude/rules/code-style.md
@.claude/rules/testing.md

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static personal portfolio site for Silas Milch (RWTH Aachen student), served from the domain `silasmilch.eu`. No build step, no package manager, no framework — plain HTML/CSS/jQuery. Deployed as static files (likely GitHub Pages, given the `CNAME` file and repo layout).

There is no dev server, test suite, linter, or build command in this repo. To preview changes, open `index.html` directly in a browser or serve the folder with any static file server (e.g. `npx serve` or Python's `http.server`).

## Layout

- [index.html](index.html) — the single content page (the whole site). Contains the profile header, the About section (EN/DE text is injected by JS, not present in the HTML), and a Publications list. Loads all CSS/JS below and includes Google Analytics/gtag tracking inline.
- [menu.html](menu.html) — the site's nav bar markup (logo + LinkedIn/GitHub/X icon links). Not included via `<script>`/build step — it's fetched at runtime by [js/menu.js](js/menu.js) via `$(".menu-container").load("menu.html", ...)` and injected into the `.menu-container` div in `index.html`.
- `css/`
  - [frame.css](css/frame.css) and [controls.css](css/controls.css) — vendored from the upstream template (see below); header comments say not to edit these directly, put custom styles in `custom.css` instead.
  - [custom.css](css/custom.css) — site-specific overrides: profile image styling, dark-mode color scheme (`html.dark-mode`), menu social-icon styling, the fixed-position copyright text.
- `js/`
  - [menu.js](js/menu.js) — loads `menu.html` into the page and wires up the mobile hamburger menu toggle.
  - [lang-toggle.js](js/lang-toggle.js) — hardcodes the EN/DE About-section text and swaps it on click of the `#lang-toggle-about` button; also auto-triggers once on page load (site defaults to German text shown first despite `en` being the initial `data-lang`).
  - [dark-mode.js](js/dark-mode.js) — toggles the `dark-mode` class on `<html>` and persists the choice to `localStorage` (`darkMode` key). `index.html` also has an inline pre-render script that reads this same key to avoid a flash of the wrong theme.
- `img/` — profile photo (`me.jpeg`), menu hamburger icon, X/Twitter icon.
- [sitemap.xml](sitemap.xml), [google8bf87702d0f933fe.html](google8bf87702d0f933fe.html) — SEO/Search Console files.
- [CNAME](CNAME) — GitHub Pages custom domain file. Currently contains `yenchiah.me`, which does **not** match the actual site domain (`silasmilch.eu` used everywhere else, e.g. in `index.html` and `sitemap.xml`) — likely a leftover from forking the template and worth double-checking before relying on GitHub Pages custom-domain routing.
- [wetter.html](wetter.html) — empty file, unused/placeholder.
- [facicon.html](facicon.html) — not part of the site; it's a large saved HTML snapshot of a ChatGPT conversation page (~400KB). Safe to ignore or delete; do not treat it as site content.
- [LICENSE](LICENSE) — GPLv2, copyright Yen-Chia Hsu (non-commercial use only per the header note); applies to the inherited template code, not necessarily Silas's own additions.

## Origin / template

The CSS in `css/frame.css` and `css/controls.css` (and the general page structure) comes from the [yenchiah/project-website-template](https://github.com/yenchiah/project-website-template) GitHub project (v3.43). When touching layout/structure, keep in mind those two files are meant to stay close to upstream — put site-specific styling in `custom.css` instead.

## Conventions to know when editing

- No build/bundling: adding a new page means creating a plain `.html` file and manually wiring up the same `<link>`/`<script>` includes as `index.html`.
- Translated text is not in the HTML — it lives as JS string literals in `lang-toggle.js`. Adding new bilingual content means editing that file, not `index.html`.
- Dark mode state is read/written via `localStorage` client-side only; there's no server-side persistence.
- There is no cookie consent banner. It was removed deliberately — don't reintroduce one without checking with Silas first.
