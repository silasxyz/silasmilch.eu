# Externe Dienste & Datenschutz-Konventionen

Die Seite hat kein Backend und keine eigene API. "API" meint hier die
Schnittstellen zu Drittanbietern und die Runtime-Fetches im Browser.

## Eingebundene Drittanbieter

- **Google Analytics / gtag** — inline in `index.html`.
- **Vercel Web Analytics** — via Snippet eingebunden.

Weitere Tracker, Fonts, Werbe- oder Embed-Skripte nur nach Rücksprache
hinzufügen. Assets möglichst selbst hosten (`img/`, `css/`, `js/`) statt von
fremden CDNs laden.

## Cookies & Consent

- Die Seite setzt **keine eigenen Cookies**. Der frühere Consent-Banner wurde
  bewusst entfernt — nicht ohne Rücksprache mit Silas wieder einführen.
- Eigener Zustand gehört in `localStorage` (Muster: `darkMode`), nicht in ein
  Cookie.
- Wenn ein neuer Drittanbieter Cookies setzt oder personenbezogene Daten
  verarbeitet, ist das ein Rücksprache-Fall: dann braucht es wieder Consent und
  eine Datenschutzerklärung.

## Fetches im Browser

- `js/menu.js` lädt `menu.html` zur Laufzeit per `$.load()`. Solche Fetches
  immer mit relativen Pfaden, nie mit absoluter Domain.
- Bei jedem Runtime-Fetch einen Fehlerfall behandeln, damit die Seite nicht
  halb leer bleibt, wenn die Datei fehlt.
- Keine Secrets, API-Keys oder Tokens im Repo — der komplette Code ist
  öffentlich ausgeliefert.

## Domain & SEO

- Kanonische Domain ist `silasmilch.eu`. Neue Seiten in `sitemap.xml` eintragen.
- Achtung: `CNAME` enthält aktuell `yenchiah.me` (Rest vom Template-Fork) und
  passt nicht zur echten Domain.
