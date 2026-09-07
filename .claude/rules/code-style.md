# Code-Stil

Gilt für alle Dateien in diesem Repo (plain HTML/CSS/jQuery, kein Build-Step).

## Allgemein

- Einrückung: 2 Spaces, keine Tabs. Zeilenende LF.
- Keine Build-Tools, keine npm-Pakete, kein Framework einführen — die Seite muss
  weiterhin funktionieren, wenn man `index.html` direkt im Browser öffnet.
- Keine Abhängigkeiten von CDNs hinzufügen, die nicht schon eingebunden sind.

## HTML

- Semantische Tags bevorzugen (`<header>`, `<section>`, `<nav>`, `<footer>`).
- Neue Seiten kopieren die `<link>`/`<script>`-Includes aus `index.html` 1:1 —
  es gibt kein Layout-System, das das automatisch macht.
- Attribute in doppelten Anführungszeichen.
- Zweisprachiger Text gehört **nicht** ins HTML, sondern in `js/lang-toggle.js`
  (siehe unten).

## CSS

- `css/frame.css` und `css/controls.css` sind vom Upstream-Template
  (yenchiah/project-website-template) — **nicht editieren**.
- Alle eigenen Styles kommen nach `css/custom.css`, thematisch abgegrenzte
  Komponenten bekommen eine eigene Datei (Muster: `css/cookie-banner.css`).
- Klassennamen in `kebab-case`.
- Dark Mode immer mitdenken: Farben unter `html.dark-mode` gegenprüfen, nie eine
  Farbe nur für den hellen Modus setzen.

## JavaScript

- ES5-kompatibles, schlichtes JS mit jQuery — passend zum Bestand. Kein Modul-
  System, keine `import`-Statements.
- Eine Datei pro Feature in `js/`, benannt in `kebab-case` (`dark-mode.js`).
- Code in eine IIFE oder einen `$(document).ready()`-Block kapseln, statt
  Globals anzulegen.
- `const`/`let` statt `var`, Strings in einfachen Anführungszeichen, Semikolons
  setzen.
- Persistenz nur clientseitig: `localStorage` (z. B. `darkMode`) oder Cookies
  (z. B. `cookie-consent`). Es gibt keinen Server.

## Zweisprachigkeit (DE/EN)

Neuer sichtbarer Text muss in beiden Sprachen existieren. Die Strings liegen als
JS-Literale in `js/lang-toggle.js` — dort ergänzen, nicht im Markup hardcoden.
