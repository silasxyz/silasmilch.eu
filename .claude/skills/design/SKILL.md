---
name: design
description: Design-System und verbindliche Gestaltungsregeln für silasmilch.eu - Farbschema inkl. Dark Mode, Typografie-Skala, Spacing, Elevation, Breakpoints, Micro-Interactions und Barrierefreiheit. Nutze diese Skill bei allem, was Design, Layout, Styling, Farbschema oder UI dieser Website betrifft, sowie beim Anlegen neuer Seiten oder Komponenten.
---

# Design-System — silasmilch.eu

Beschreibt das **tatsächlich vorhandene** visuelle System dieser Seite und wie
man es erweitert. Alle Werte unten sind aus `css/frame.css`, `css/controls.css`
und `css/custom.css` ausgelesen, alle Kontrastwerte nachgerechnet.

**Der Charakter der Seite:** eine ruhige, textlastige Einspalter-Visitenkarte im
**editorialen, linksbündigen** Stil. Leichte Kopfzeile mit Haarlinie statt
Balken, großer Name als Anker, schmale Lesespalte (68ch), Abschnitte durch
Weißraum und eine kurze `<hr>` getrennt — nicht durch Karten. Die linke Kante
läuft von der Kopfzeile bis zum letzten Absatz durch. Jede Änderung muss diesen
Charakter erhalten.

## Nicht verhandelbar

- `css/frame.css` und `css/controls.css` sind Upstream (`yenchiah/project-website-template`).
  **Nie editieren.** Alles Eigene nach `css/custom.css`.
- Kein Framework, kein Build-Step, kein Preprocessor. Plain CSS.
- Keine neuen Web-Fonts. Es laden bereits drei Google-Fonts — das ist zu viel,
  nicht zu wenig.

---

## 1. Typografie

### Ist-Zustand

Zwei Familien: **Open Sans** für Menü und Überschriften, **Source Sans Pro** für
den Inhaltsbereich (`frame.css:263-267`).

Die vorhandene Skala, gemappt auf Material-3-Rollen — die Namen sind das
gemeinsame Vokabular, die Werte bleiben, wie sie sind:

| M3-Rolle | Element | Größe | Gewicht | Farbe hell |
|---|---|---|---|---|
| Display | `h1` (Name) | **40px** / 1.15, `-0.5px` | bold | `#333333` |
| Display, schmal | `h1` ≤640px / ≤480px | 32px / 30px | bold | `#333333` |
| Title Large | `h2` | 24px, `-0.2px` | bold | `#333333` |
| Title Medium | `h3`, Logo | 18px | bold / 700 | `#333333` |
| Body | `.content` | 16px / 1.5 | 400 | geerbt |
| Label | Toggles | 11–13px | 400 | — |

Das `h1` mit 40px liegt bewusst **über** der Template-Skala: der Name ist der
Anker der Seite und die einzige Stelle, an der Größe die Hierarchie trägt.

Gewichte im Bestand: `400`, `700`/`bold`. Mehr braucht es nicht.

### Regeln

- **Die Skala ist 40 / 32 / 30 / 24 / 18 / 16 / 11.** Keine Zwischenwerte
  erfinden. „Etwas größer" heißt fast immer: eine Ebene höher in der Hierarchie,
  nicht `19px`. 32 und 30 sind ausschließlich die responsiven Stufen des `h1`.
- **40px bleibt dem Namen vorbehalten.** Es gibt genau ein `h1` pro Seite. Keine
  zweite Überschrift auf dieser Größe.
- **Hierarchie über Gewicht, Farbe und Abstand — nicht über Größe.** Wenn ein
  Element hervorstechen soll, prüfe in dieser Reihenfolge: mehr Abstand darum?
  dunklere Farbe? mehr Gewicht? Größer machen ist die letzte Option.
- **Sekundäres zurücknehmen statt Primäres verstärken.** Die Meta-Zeile einer
  Publikation („2025. Published by AIC.") wird leiser gefärbt — der Titel
  darüber bleibt unangetastet. Wer stattdessen den Titel fetter macht, verschiebt
  nur das Problem nach oben.
- **Labels sind kleiner und leiser als das, was sie beschreiben.** Nie ein Label
  gleich stark wie seinen Wert setzen.
- **Es gibt genau eine Spaltenbreite: `max-width: 660px`** auf `.menu` und
  `.content` (Template-Wert war 900px). Abzüglich der 20px Innenabstände
  entspricht das der Lesespalte von 68ch. Logo, `h1`, `h2`, `<hr>`, Fließtext
  und Publikationen haben dadurch **dieselbe linke und rechte Kante** — das ist
  die Grundlage des Layouts. Wer einen Block breiter macht, zerstört sie.
- Fließtext, Publikationstitel und die `<hr>` unter `h2` tragen zusätzlich
  `max-width: 68ch` als Sicherung. Neue Textblöcke ebenso.
- `line-height: 1.5` für Fließtext, `1.2`–`1.3` für Überschriften. Große Schrift
  braucht *weniger* relative Zeilenhöhe.
- **Nie ALL-CAPS für ganze Sätze.**
- **Blocksatz nur mit Silbentrennung.** Die beiden About-Absätze
  (`#about-intro`, `#about-extra`) stehen im Blocksatz — zulässig, weil sie
  zugleich `hyphens: auto` tragen und `lang-toggle.js` das `lang`-Attribut
  mitführt, der Browser also nach den richtigen Sprachregeln trennt. Ohne beides
  entstehen die typischen Löcher zwischen den Wörtern.
  - Kurze Textblöcke (Zugehörigkeitszeile, Publikations-Meta) bleiben
    linksbündig — im Blocksatz würden sie auseinandergerissen.
  - Unter 480px schaltet der Blocksatz auf linksbündig zurück: zu wenige Wörter
    pro Zeile, um die Lücken sinnvoll zu verteilen.
  - Absätze nutzen deshalb `overflow-wrap: break-word`, nicht `anywhere` —
    letzteres bricht im Blocksatz auch unnötig mitten im Wort um.

```css
/* ✅ Sekundärtext zurücknehmen, gleiche Familie, Skalenwert */
.publication .text-small-margin { font-size: 14px; color: #666666; }

/* ❌ Krumme Größe, zweite Schriftfamilie, Primäres verstärkt */
.publication-title { font-size: 19.5px; font-family: Georgia, serif; font-weight: 900; }
```

---

## 2. Farbschema

Gedacht wird in **Rollen**, nicht in Hex-Werten (M3-Prinzip). Jede neue Farbe
muss sich einer Rolle zuordnen lassen — sonst gehört sie nicht ins System.

| Rolle | Hell | Dunkel | Kontrast dunkel |
|---|---|---|---|
| `surface` (Seite **und** Kopfzeile) | `#ffffff` | `#121212` | — |
| `surface-raised` (Dropdown, Input, Button) | `#ffffff` | `#2a2a2a` | — |
| `surface-raised-hover` | — | `#3a3a3a` | — |
| `on-surface` (Fließtext) | `#333333` (12.63:1) | `#e0e0e0` | 14.19:1 |
| `on-surface-strong` (Überschriften, Logo) | `#333333` | `#f2f2f2` | — |
| `on-surface-muted` (Sekundärtext, Icons) | `#666666` (5.74:1) | `#b0b0b0` | 8.64:1 |
| `outline` (Kopfzeilen-Linie) | `#e7e7e7` | `#2a2a2a` | — |
| `outline-hr` (`<hr>`) | `rgb(220,220,220)` | `#333333` | — |
| `primary` (Links, Fokusring) | `#005cbf` (6.4:1) | `#7eb8ff` | 9.09:1 |
| `primary-hover` | `#005cbf`, Unterstreichung kräftiger | `#a8d4ff` | 12.07:1 |

Die Kopfzeile hat **keine eigene Flächenfarbe mehr.** Sie liegt auf `surface`
und wird nur durch eine 1px-`outline`-Linie abgesetzt — das ist der Kern des
editorialen Looks. Wer sie wieder einfärbt, macht das Redesign rückgängig.

### Regeln

- **Jede neue Farbe braucht sofort ihr Dark-Mode-Gegenstück** unter
  `html.dark-mode` in `custom.css`. Eine Farbe nur für hell zu setzen ist der
  mit Abstand häufigste Fehler in diesem Projekt.
- **Im Dark Mode kein `#000` und kein `#fff`.** Hintergrund `#121212`, Text
  `#e0e0e0`. Voller Kontrast erzeugt Halation.
- **Nur ein Akzent: Blau.** Das Template bringt Rot (`#a71120`), Türkis
  (`#007082`) und Info-Blau (`#17a2b8`) mit — reserviert für Status-Komponenten,
  nicht fürs Seitendesign.
- **`#007bff` ist keine Textfarbe.** Es erreicht auf Weiß nur **3.98:1** und
  verfehlt AA. Es lebt in `.custom-text-primary` und Formular-Controls; für
  Fließtext und Links gilt `#005cbf`.
- **WCAG AA ist Pflicht:** 4.5:1 für Fließtext, 3:1 ab 24px und für Icons und
  Rahmen — **in beiden Modi**. Zum Prüfen `#7d7d7d` als Warnung merken: sieht
  harmlos aus, liegt mit 4.12:1 aber darunter. `#666666` ist der dunkelste
  „leise" Grauwert, der sicher passt.
- **Farbe nie als alleiniger Informationsträger.** Links im Inhalt tragen
  deshalb eine Unterstreichung, nicht nur die Farbe.

---

## 3. Spacing

### Ist-Zustand

`custom.css` verwendet eine **4px-Basis**, und zwar ausschließlich diese Werte:

```
4 · 8 · 12 · 16 · 20 · 32 · 40 · 48 · 60 · 80
```

Typische Einsätze: 4 für Toggle-Kanten, 8 zwischen Titel und Meta-Zeile, 12 für
Logo-Padding, 20 für Seitenränder, 32 zwischen Publikationseinträgen und als
Abstand Foto ↔ Name, 48 vor `h2`, 60/80 als Innenabstand von `.content-table`.

Die Upstream-Dateien nutzen daneben noch 5/10/15/30 — die bleiben, wie sie
sind, werden aber nicht fortgeschrieben.

### Regeln

- **Nur Werte aus der Liste oben.** Kein `padding: 13px`, kein `margin: 35px`.
  Fehlt eine Stufe, ist meistens die benachbarte gemeint.
- **Abstand gehört nach oben.** Überschriften tragen `margin-top`, kein
  `margin-bottom` — so bleibt der Abschnittsabstand vorhersagbar und
  Margin-Collapsing wird kein Thema. Bei neuen Blöcken beibehalten.
- **Nähe zeigt Zugehörigkeit.** Der Abstand Publikationstitel → Meta-Zeile (8px)
  muss deutlich kleiner sein als der zum nächsten Eintrag (32px) und der wiederum
  kleiner als der vor einem neuen `h2` (48px). Wirkt ein
  Layout unklar, ist fast immer der *innere* Abstand zu groß, nicht der äußere
  zu klein.
- **Weißraum ist der Standard, Rahmen die Ausnahme.** Die Seite trennt mit
  `<hr>` und Abstand. Keine umrandeten Boxen einführen, wo Abstand genügt.
- Im Zweifel **mehr** Abstand. Diese Seite ist ein Lebenslauf, keine
  Informationsdichte-Übung.

---

## 4. Elevation & Radius

### Ist-Zustand

Es gibt genau **einen** Schatten auf der ganzen Seite:
`0 1px 4px rgba(0,0,0,0.35)` auf den beiden Toggles über dem Profilfoto. Dazu
`0 0 0 1px #2a2a2a` als Ring ums Profilbild im Dark Mode.

Der schwere Doppelschatten der Menüleiste (`0 0 4px / 0 0 10px`) aus dem
Template ist entfernt und durch eine Haarlinie ersetzt.

Radien: dominant **2px**, dazu `50%` fürs Profilfoto und `14px` für die
Pillen-Toggles.

### Regeln

- **Zwei Elevation-Stufen, mehr nicht:** flach (der Normalfall) und
  `0 1px 4px rgba(0,0,0,0.35)` für die zwei Elemente, die tatsächlich über
  etwas anderem schweben. Keine dritte erfinden.
- **Trennung geschieht über Linien und Weißraum, nicht über Schatten.** Wenn ein
  Bereich sich absetzen soll: 1px `outline`-Farbe oder mehr Abstand.
- **Im Dark Mode entsteht Tiefe über hellere Flächen, nicht über Schatten**
  (M3): `#121212` → `#1a1a1a` → `#2a2a2a` → `#3a3a3a`. Ein Schatten auf
  `#121212` ist praktisch unsichtbar.
- **Radius ist 2px**, außer bei bewusst runden Elementen (Profilfoto `50%`,
  Toggle-Pillen `14px`). Kein `border-radius: 12px` für irgendetwas Neues.

---

## 5. Was hier *nicht* gebaut wird

Diese Muster sind auf dieser Seite ausdrücklich unerwünscht. Sie sehen nach
generischem Template aus und passen nicht zu einem sachlichen Lebenslauf.

| Verboten | Warum | Stattdessen |
|---|---|---|
| Warmes Creme + Terracotta-Akzent | Die Seite ist neutral-grau mit einem blauen Akzent. Eine warme Palette wäre ein Bruch ohne Anlass. | `#ffffff`/`#121212` + `#005cbf`/`#7eb8ff` |
| Überall gleiche abgerundete Cards mit identischem grauen Schatten | Erzeugt Gleichförmigkeit statt Hierarchie und widerspricht dem „Weißraum statt Rahmen"-Prinzip. | Abschnitte mit kurzer `<hr>` und 48px Abstand trennen |
| ALL-CAPS-Eyebrow-Labels über Überschriften | Reine Dekoration, die Vorlesbarkeit verschlechtert und eine Hierarchieebene erfindet, die es nicht gibt. | `h2`/`h3` sprechen für sich |
| „→" an Button- und Linktexte gehängt | Der Pfeil trägt keine Information und liest sich im Screenreader als Zeichenmüll. | Klare Verben: „Source", „Blog" |
| Fade-Slide-Up-Animation auf jeder Sektion | Verzögert das Lesen, kollidiert mit `prefers-reduced-motion` und wirkt bei Textseiten aufdringlich. | Inhalt steht sofort; Bewegung nur auf Zustandswechsel |

Ergänzend: keine Gradient-Buttons, keine Glasmorphism-Panels, keine
Hero-Sektion mit riesiger zentrierter Schrift, keine Emoji als Icons.

---

## 6. Dark Mode

Alles unter `html.dark-mode` in `custom.css:47-111`. Die Klasse setzt ein
Inline-Skript in `index.html` **vor** dem Rendern aus `localStorage.darkMode` —
deshalb blitzt nichts auf. `js/dark-mode.js` schaltet um und führt `aria-label`
und `aria-pressed` korrekt mit.

### Regeln

- Dark Mode ist **kein Filter**, sondern ein zweites Rollen-Mapping (siehe
  Tabelle in Abschnitt 2). Nie ganze Flächen mit `filter: invert()` umfärben.
- **Zwei einfarbige PNGs brauchen modusabhängiges Invertieren**, weil sie nicht
  als SVG mit `currentColor` vorliegen:
  - `img/icon-x.png` ist schwarz → im Light Mode `filter: none`, im Dark Mode
    `invert(1)`.
  - `img/menu.png` (Hamburger) ist hell → genau umgekehrt.

  Wer hier etwas ändert, muss **beide** Modi prüfen: ein Icon verschwindet
  sonst lautlos auf gleichfarbigem Grund. Neue Icons bitte als SVG mit
  `fill="currentColor"` einbinden, wie die LinkedIn- und GitHub-Icons.
- **Test-Reihenfolge bei jeder Änderung:** hell ansehen → umschalten → neu laden
  → prüfen, dass kein weißer Blitzer auftritt.
- Bilder und Icons müssen auf **beiden** Hintergründen funktionieren. Ein
  transparentes PNG mit dunklen Linien verschwindet auf `#121212`.
- Im Dark Mode Kontraste eher **reduzieren** als erhöhen: `#e0e0e0` statt
  `#ffffff`, Rahmen `#444444` statt `#888888`.

---

## 7. Responsive

| Breite | Wo | Zweck |
|---|---|---|
| ≤ 480px | `custom.css` | Foto über den Namen gestapelt, weiterhin **linksbündig**, `h1` 30px |
| ≤ 500px | `frame.css` | Template-Anpassungen |
| ≤ 640px | `custom.css` | `h1` 32px, Foto 110px, engere Innenabstände |
| ≤ 750px | `custom.css` | Hamburger-Menü, Social-Links umbrechend |
| 500–700 / 700–900 / ≥ 900px | `frame.css` | Container-Breiten |

- **Keine neuen Breakpoints erfinden.** 480, 640, 750 und 900 sind die
  relevanten Grenzen.
- **Auch auf dem Phone bleibt es linksbündig.** Der Kopf stapelt sich, wird aber
  nicht zentriert — die durchgehende linke Kante ist der Kern des Layouts.
- Der Bestand ist **Desktop-first** (`max-width`-Queries). Dabei bleiben, nicht
  mischen.
- **Keine festen Breiten für Inhalt:** `max-width` + `width: 100%`. Das
  Profilfoto (`180px`, mobil `140px`) ist die bewusste Ausnahme.
- **Nichts scrollt horizontal.** Lange URLs und Titel brauchen
  `overflow-wrap: anywhere`.
- **Touch-Ziele ≥ 44×44px** unter 750px.
- Testen bei 375px, 768px, 1440px — je hell und dunkel.

---

## 8. Micro-Interactions

Das Template nutzt durchgängig **0.1s** (`frame.css:36,120,1183`,
`controls.css:173`). Die Social-Icons gehen von `opacity: 0.85` auf `1`.

- **0.1s übernehmen.** Für größere Bewegungen (Panel ein-/ausblenden) maximal
  200ms. 300ms+ bricht das Gefühl der Seite.
- **Nur `opacity` und `transform` animieren** (GPU). Kein `transition: all`,
  kein Animieren von `width`, `height`, `top`, `margin`.
- **Zustände sind Pflicht, Effekte sind Kür.** Jedes interaktive Element braucht
  `:hover` **und** `:focus-visible`. Ein Hover ohne Focus-Pendant ist ein Bug.
- **Kein Effekt ohne Funktion.** Bewegung signalisiert Zustandswechsel — sonst
  nichts.
- `prefers-reduced-motion` respektieren:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Barrierefreiheit

### Bereits erledigt — nicht zurückdrehen

- `aria-label` und `aria-pressed` an beiden Toggles, von `dark-mode.js` und
  `lang-toggle.js` beim Umschalten mitgeführt.
- Social-Links mit `aria-label`, SVGs mit `aria-hidden="true"`.
- Alle externen Links mit `rel="noopener noreferrer"`.
- Genau **ein** `h1` (der Name), danach `h2` → `h3` ohne Sprung.
- `lang` auf `<html>` wird vom Sprach-Toggle mitgeführt.
- Publikationen nutzen `class="publication-title"` — vorher war dieselbe `id`
  dreimal vergeben.

### Der Fallstrick, der bleibt

**`frame.css:26` setzt global `a { outline: none }`** und entfernt damit den
Tastatur-Fokusring. Der Ersatz steht als `:focus-visible`-Regel in `custom.css`
(Abschnitt 8 dort). `frame.css` ist Upstream und wird nicht angefasst — wer die
`:focus-visible`-Regeln aus `custom.css` entfernt, macht die Seite für
Tastaturnutzer unbedienbar.

### Regeln

```css
.my-button:focus-visible {
  outline: 2px solid #005cbf;
  outline-offset: 2px;
}
html.dark-mode .my-button:focus-visible { outline-color: #7eb8ff; }
```

- **Semantik vor ARIA:** `<button>` statt `<div onclick>`, Überschriften ohne
  Sprünge (`h2` → `h3`, nie `h2` → `h4`).
- **ARIA-Zustände mitführen**, wenn JS den Zustand ändert.
- **Zweisprachigkeit ist Teil der Zugänglichkeit:** neuer sichtbarer Text
  braucht DE und EN in `js/lang-toggle.js`, nicht im HTML hardcodiert.

---

## Checkliste

- [ ] Nichts in `frame.css` / `controls.css` geändert
- [ ] Jede neue Farbe hat ihre `html.dark-mode`-Entsprechung
- [ ] Alle Werte aus den Skalen: Type 40/32/30/24/18/16/11, Spacing
      4/8/12/16/20/32/40/48/60/80, Radius 2px
- [ ] Linke **und rechte** Kante laufen durch — nichts eingerückt, nichts
      zentriert, kein Block breiter als 660px
- [ ] Kein Element trägt ungewollt die Template-Klasse `flex-item`
      (bringt `margin: 0 20px` mit und bricht die Kante)
- [ ] Beide PNG-Icons (X, Hamburger) in hell **und** dunkel sichtbar
- [ ] Kontrast in beiden Modi ≥ 4.5:1 (bzw. 3:1 ab 24px)
- [ ] Bei 375 / 768 / 1440px geprüft, kein horizontales Scrollen
- [ ] Alles per Tab erreichbar, Fokus sichtbar
- [ ] Transitions ≤ 0.1s, nur `opacity`/`transform`
- [ ] Keines der Muster aus Abschnitt 5 eingebaut
- [ ] Neuer Text existiert auf DE **und** EN
- [ ] Neue CSS-Datei in `index.html` verlinkt (kein Build-Step tut das)

---

## Herkunft

- **Refactoring UI** (Wathan/Schoger) — Abschnitte 1, 3, 4: Hierarchie über
  Gewicht/Farbe/Abstand, Sekundäres zurücknehmen statt Primäres verstärken,
  Labels leiser als ihre Werte, feste Skalen statt beliebiger Pixelwerte,
  Weißraum als Standard, WCAG AA.
- **Material Design 3** — Abschnitte 2, 6: Farbrollen (`surface`/`on-surface`/
  `primary`) mit sauberer Light/Dark-Ableitung, benannte Type-Rollen, Tiefe im
  Dark Mode über Flächenhelligkeit statt Schatten.
- **Abschnitt 5** ist die bewusste Gegenposition zu generischen Template-Mustern
  und leitet sich aus dem Ist-Zustand dieser Seite ab, nicht aus einer externen
  Quelle.
