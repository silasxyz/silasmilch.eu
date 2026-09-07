---
name: design
description: Design-Prinzipien und verbindliche Regeln für silasmilch.eu - Typografie-Hierarchie, Farbsystem inkl. Dark Mode, Spacing, responsive Breakpoints, Micro-Interactions und Barrierefreiheit. Nutze diese Skill bei allem, was Design, Layout, UI, Styling oder das Farbschema dieser Website betrifft, sowie beim Anlegen neuer Seiten oder Komponenten.
---

# Design — silasmilch.eu

Verbindliche Regeln für das visuelle Erscheinungsbild dieser Seite. Sie
beschreiben den **Ist-Zustand** und wie man ihn erweitert, ohne ihn zu brechen.

Die Seite basiert auf dem Template `yenchiah/project-website-template`. Das
Design ist bewusst zurückhaltend: eine Spalte, viel Weißraum, dunkle Menüleiste,
runde Profilfoto-Kachel, zwei kleine Toggles darauf. Ziel jeder Änderung ist,
diesen ruhigen Charakter zu erhalten — nicht ihn "aufzuhübschen".

## Nicht verhandelbar

- `css/frame.css` und `css/controls.css` sind Upstream-Dateien. **Nie editieren.**
  Alles Eigene kommt nach `css/custom.css` (oder eine neue, in `index.html`
  verlinkte Komponentendatei).
- Kein Framework, kein Tailwind, kein Build-Step, keine CSS-Preprocessoren.
  Plain CSS, das direkt im Browser läuft.
- Keine neuen Web-Fonts. Es sind bereits drei Google-Fonts geladen — das ist
  eher zu viel als zu wenig.

---

## 1. Typografie

### Ist-Zustand

| Element | Größe | Farbe (hell) | Quelle |
|---|---|---|---|
| `h1` | 30px bold | `#333333` | `frame.css:49` |
| `h2` | 24px bold | `#333333` | `frame.css:58` |
| `h3` | 18px bold | `#333333` | `frame.css:67` |
| Fließtext `.content` | 16px, `line-height: 1.5` | geerbt | `frame.css:263` |

Schriften: `Open Sans` für Menü und Überschriften, `Source Sans Pro` für den
Inhaltsbereich.

### Regeln

- **Die Skala ist 30 / 24 / 18 / 16.** Keine Zwischengrößen erfinden. Wenn etwas
  „ein bisschen größer" sein soll, ist meist die nächste Ebene der Hierarchie
  gemeint, nicht eine neue Größe.
- **Hierarchie über Gewicht und Farbe, nicht nur über Größe.** Sekundärer Text
  (Datum, Quelle, „Published by AIC") wird abgeschwächt, indem er kleiner *und*
  heller wird — nicht indem der Haupttext fetter wird. So macht es die
  Publications-Liste bereits über `.text-small-margin`.
- **Zeilenlänge begrenzen.** 45–75 Zeichen pro Zeile. Der Inhalt liegt in einem
  `max-width: 900px`-Container (`frame.css:111`) — bei neuen, breiteren Layouts
  den Textblock trotzdem schmal halten.
- `line-height: 1.5` für Fließtext, `1.2`–`1.3` für Überschriften. Große Schrift
  braucht *weniger* relative Zeilenhöhe, nicht mehr.
- **Nie Text in Versalien** für ganze Sätze, und kein `text-align: justify` —
  beides ruiniert die Lesbarkeit ohne Silbentrennung.

### Do / Don't

```css
/* ✅ Sekundärtext: kleiner und leiser, gleiche Familie */
.publication-meta { font-size: 14px; color: #6d6d6d; }

/* ❌ Neue Größe außerhalb der Skala, plus zweite Schriftfamilie */
.publication-meta { font-size: 15.5px; font-family: Georgia, serif; }
```

---

## 2. Farbsystem

### Ist-Zustand

**Hell:** Body weiß, Überschriften `#333333`, Menüleiste `#333333`, Trennlinien
`rgb(220,220,220)`, Links im Template-Blau `#007bff` / Hover `#005cbf`.

**Dunkel** (`html.dark-mode`, alles in `custom.css:47-111`):

| Rolle | Wert |
|---|---|
| Hintergrund | `#121212` |
| Fließtext | `#e0e0e0` |
| Überschriften | `#f2f2f2` |
| Menüleiste | `#1a1a1a` |
| Erhöhte Fläche (Dropdown, Input, Button) | `#2a2a2a` |
| Rahmen / Trennlinien | `#444444` – `#555555` |
| Link | `#7eb8ff`, Hover `#a8d4ff` |

### Regeln

- **Denk in Rollen, nicht in Farben** (Material-3-Prinzip): Hintergrund, Fläche,
  erhöhte Fläche, Text-auf-Fläche, Rahmen, Akzent. Jede neue Farbe muss einer
  dieser Rollen zugeordnet werden können — sonst gehört sie nicht ins System.
- **Jede neue Farbe braucht sofort ihr Dark-Mode-Gegenstück** in `custom.css`
  unter `html.dark-mode`. Eine Farbe nur für den hellen Modus zu setzen ist der
  häufigste Fehler in diesem Projekt.
- **Im Dark Mode kein reines Schwarz und kein reines Weiß.** Der Hintergrund ist
  `#121212`, nicht `#000`; Text ist `#e0e0e0`, nicht `#fff`. Voller Kontrast
  erzeugt Halation und ermüdet.
- **Tiefe im Dark Mode über hellere Flächen, nicht über Schatten.** Höher
  liegende Elemente werden heller (`#121212` → `#1a1a1a` → `#2a2a2a` → `#3a3a3a`),
  wie es die Dropdown- und Button-Regeln schon machen. Schatten sind auf dunklem
  Grund praktisch unsichtbar.
- **Nur ein Akzent.** Blau ist die Akzentfarbe für Links und primäre Aktionen.
  Das Template bringt Rot (`#a71120`), Türkis (`#007082`) und Info-Blau
  (`#17a2b8`) mit — die sind für Status-Komponenten reserviert und gehören
  nicht ins normale Seitendesign.
- **Farbe nie als alleiniger Informationsträger.** Ein Link ist blau *und*
  unterstrichen oder im Fließtext klar als Link erkennbar.

### Do / Don't

```css
/* ✅ Neue Fläche mit beiden Modi */
.note-card { background: #f9f9f9; border: 1px solid #dddddd; }
html.dark-mode .note-card { background: #2a2a2a; border-color: #555555; }

/* ❌ Nur hell gedacht — im Dark Mode weißer Block auf #121212 */
.note-card { background: #ffffff; }
```

---

## 3. Spacing

### Ist-Zustand

Das Projekt arbeitet faktisch mit einer **5px-Basis**: 5 / 8 / 10 / 15 / 24 /
30 / 40. Beispiele: `h1`–`h2` haben `margin: 30px 0 0 0`, `.text` hat `10px`
oben/unten, `.text-small-margin` `5px`, `.content-table` `padding: 40px 10px`,
die Toggles auf dem Foto sitzen bei `bottom: 8px`.

### Regeln

- **Nur Vielfache von 5** verwenden (bevorzugt 5, 10, 15, 20, 30, 40). Kein
  `padding: 13px`.
- **Abstand gehört nach oben, nicht nach unten.** Überschriften im Template
  tragen `margin-top`, kein `margin-bottom` — so bleibt der Abstand zwischen
  Abschnitten vorhersagbar. Bei neuen Blöcken das Muster beibehalten.
- **Nähe zeigt Zugehörigkeit.** Der Abstand zwischen `h3` und dem zugehörigen
  Absatz (10px) muss deutlich kleiner sein als der zum nächsten Abschnitt
  (30px). Wenn ein Layout unklar wirkt, ist fast immer der *innere* Abstand zu
  groß — nicht der äußere zu klein.
- **Weißraum großzügig, Rahmen sparsam.** Die Seite trennt Abschnitte mit `<hr>`
  und Abstand, nicht mit Boxen. Keine Karten mit Rahmen und Schatten einführen,
  wo Abstand genügt.
- Vertikaler Rhythmus: nicht `margin-top` und `margin-bottom` gleichzeitig auf
  benachbarten Elementen setzen (Margin-Collapsing macht das Ergebnis
  unvorhersehbar).

---

## 4. Responsive

### Ist-Zustand

Vorhandene Breakpoints (Upstream + eigene):

| Breite | Wo | Zweck |
|---|---|---|
| ≤ 480px | `custom.css:185` | Phone: engere Paddings, zentrierter Header, kleineres Profilfoto (140px) |
| ≤ 500px | `frame.css` | Template-Anpassungen |
| ≤ 750px | `custom.css:164` | Hamburger-Menü, Social-Links umbrechend |
| 500–700 / 700–900 / ≥ 900px | `frame.css` | Container-Breiten |

### Regeln

- **Keine neuen Breakpoints erfinden.** 480px, 750px und 900px sind die
  relevanten Grenzen. Wer einen vierten hinzufügt, muss ihn in beiden Modi und
  auf beiden Achsen durchtesten.
- **Mobile first denken, auch wenn das CSS `max-width` benutzt.** Der Bestand
  ist Desktop-first (`max-width`-Queries) — bleib bei diesem Muster, statt zu
  mischen.
- **Keine festen Breiten für Inhalt.** `max-width` + `width: 100%` statt
  `width: 900px`. Das Profilbild ist mit `width: 180px` bewusst eine Ausnahme,
  weil es ein Kreis fester Größe ist — und wird bei ≤480px auf 140px reduziert.
- **Nichts darf horizontal scrollen.** Lange Links, Publikationstitel und
  URLs brauchen `overflow-wrap: anywhere`, wenn sie neu hinzukommen.
- **Touch-Ziele ≥ 44×44px** unter 750px. Die Social-Links bekommen dort bereits
  `padding: 10px 14px` (`custom.css:181`) genau dafür.
- Testen: einmal bei 375px, einmal bei 768px, einmal bei 1440px — je in hell
  und dunkel.

---

## 5. Micro-Interactions

### Ist-Zustand

Das Template nutzt konsequent **0.1s** für Zustandsübergänge:
`transition: background-color 0.1s, box-shadow 0.1s, border 0.1s`
(`frame.css:36`, `:120`, `:1183`) und `opacity 0.1s ease-in-out`
(`controls.css:173`). Die Social-Icons wechseln von `opacity: 0.85` auf `1`
beim Hover (`custom.css:113-141`).

### Regeln

- **Übernimm 0.1s.** Wer 300ms-Animationen einbaut, bricht das Gefühl der
  Seite. Für größere Bewegungen (Ein-/Ausblenden eines Panels) sind maximal
  200ms vertretbar.
- **Nur `opacity` und `transform` animieren.** Diese laufen auf der GPU. Kein
  `transition: all`, kein Animieren von `width`, `height`, `top` oder `margin`.
- **Zustände sind Pflicht, Effekte sind Kür.** Jedes interaktive Element braucht
  `:hover`, `:focus-visible` und — wo zutreffend — einen gedrückten/aktiven
  Zustand. Ein Hover-Effekt ohne Focus-Pendant ist ein Bug, kein Design.
- **Kein Effekt ohne Funktion.** Keine Parallax-Effekte, keine Scroll-Reveals,
  kein Auto-Playing. Die Seite ist ein Lebenslauf, keine Landingpage.
- **`prefers-reduced-motion` respektieren:**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 6. Barrierefreiheit

### Ist-Zustand — gut

- Die Toggles tragen `aria-label` und `aria-pressed` (`index.html:93-94`).
- Social-Links im Menü haben `aria-label`, ihre SVGs `aria-hidden="true"`,
  externe Links `rel="noopener noreferrer"` (`menu.html:10-22`).
- Das Profilbild hat ein sinnvolles `alt`.

### Ist-Zustand — offene Punkte

- `frame.css:26` setzt `a { outline: none; }` — das entfernt global den
  Tastatur-Fokusring. Da die Datei Upstream ist: in `custom.css` einen eigenen
  `:focus-visible`-Stil nachrüsten, statt `frame.css` anzufassen.
- `index.html:122` und `:125`/`:138` verwenden `id="conference-paper"`
  **doppelt**. IDs müssen eindeutig sein.
- Links im Inhalt nutzen `#005cbf` (6.4:1 auf Weiß) — das ist in Ordnung. Das
  hellere `#007bff` aus `.custom-text-primary` und den Formular-Controls
  erreicht dagegen nur **3.98:1** und darf **nicht** für Fließtext verwendet
  werden. Dark Mode ist unkritisch: `#7eb8ff` auf `#121212` liegt bei 9.09:1.
- Das X-Icon (`menu.html:21`) ist ein PNG mit `filter: invert(1)`
  (`custom.css:135`) — es ist damit im hellen Modus weiß auf dunklem Menü
  korrekt, aber die Invertierung bricht, falls die Menüfarbe je heller wird.

### Regeln

- **Kontrast:** mindestens 4.5:1 für Fließtext, 3:1 für Text ab 24px und für
  Icons/Rahmen. In **beiden** Modi prüfen. `#6d6d6d` auf Weiß ist mit ~5.1:1
  gerade noch in Ordnung, `#7d7d7d` (~4.2:1) ist es **nicht** — für sekundären
  Text also `#666666` oder dunkler.
- **Sichtbarer Fokus ist Pflicht.** Für jedes neue interaktive Element:

```css
.my-button:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
html.dark-mode .my-button:focus-visible { outline-color: #7eb8ff; }
```

- **Semantik vor ARIA.** `<button>` statt `<div onclick>`, `<nav>`, `<main>`,
  echte Überschriftenreihenfolge ohne Sprünge (`h2` → `h3`, nie `h2` → `h4`).
- **`aria-label` und `aria-pressed` aktuell halten.** `dark-mode.js` und
  `lang-toggle.js` ändern den Zustand — die ARIA-Attribute müssen mitgeführt
  werden, sonst sagt der Screenreader das Falsche.
- **Zweisprachigkeit ist auch Barrierefreiheit.** Neue sichtbare Texte brauchen
  DE und EN in `js/lang-toggle.js`; das `lang`-Attribut sollte zum angezeigten
  Text passen.
- **IDs eindeutig halten.** Für wiederholte Abschnitte Klassen verwenden.

---

## Checkliste vor dem Abschluss einer Design-Änderung

- [ ] Nichts in `frame.css` / `controls.css` geändert
- [ ] Jede neue Farbe hat eine `html.dark-mode`-Entsprechung
- [ ] In beiden Modi angesehen, kein weißer Blitzer beim Reload
- [ ] Bei 375px, 768px und 1440px geprüft, kein horizontales Scrollen
- [ ] Alle interaktiven Elemente per Tab erreichbar, Fokus sichtbar
- [ ] Kontrast in beiden Modi geprüft
- [ ] Transitions ≤ 0.1s und nur auf `opacity`/`transform`
- [ ] Neuer Text existiert auf DE **und** EN
- [ ] Neue CSS-Datei in `index.html` verlinkt (es gibt keinen Build-Step, der
      das automatisch tut)

---

## Herkunft dieser Regeln

Kombination aus drei Quellen, jeweils auf den Ist-Zustand dieser Seite
zugeschnitten:

- **Refactoring UI** (Adam Wathan & Steve Schoger) — Hierarchie über Gewicht und
  Farbe statt Größe, feste Spacing-Skala statt freier Werte, Weißraum vor
  Rahmen, sekundären Text abschwächen statt primären verstärken.
- **Material Design 3** — Farb*rollen* statt Farbwerte, Dark Mode als eigenes
  Rollen-Mapping, Tiefe im Dark Mode über hellere Flächen statt Schatten,
  Kontrast- und Touch-Target-Vorgaben.
- **Anthropic `frontend-design`-Skill** (`anthropics/claude-code`,
  `plugins/frontend-design/skills/frontend-design`) — bewusste, konsistente
  Entscheidungen statt Default-Optik; Zustände (Hover/Focus/Active) als Teil des
  Designs, nicht als Nachtrag.

Quellen: [Anthropic frontend-design Skill](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md), [Material Design 3](https://m3.material.io/styles/color/roles), [Material 3 Foundations Guide](https://medium.com/design-bootcamp/mastering-material-3-foundations-a-comprehensive-guide-for-ui-ux-designers-63a6fe40e750)
