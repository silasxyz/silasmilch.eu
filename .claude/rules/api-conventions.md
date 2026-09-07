# Externe Dienste & Datenschutz-Konventionen

Die Seite hat kein Backend und keine eigene API. "API" meint hier die
Schnittstellen zu Drittanbietern und die Runtime-Fetches im Browser.

## Eingebundene Drittanbieter

- **Google Analytics / gtag** — inline in `index.html`.
- **Vercel Web Analytics** — via Snippet eingebunden.

Weitere Tracker, Fonts, Werbe- oder Embed-Skripte nur nach Rücksprache
hinzufügen. Assets möglichst selbst hosten (`img/`, `css/`, `js/`) statt von
fremden CDNs laden.

## Consent

- Der Consent-Status steht im Cookie `cookie-consent` (365 Tage), gesetzt von
  `js/cookie-banner.js`.
- Alles, was Tracking macht, muss diesen Status respektieren: **kein**
  Analytics-Request vor einem "accept", und nach einem "reject" gar keiner.
- Der Banner verlinkt auf `/privacy-policy`. Diese Seite existiert im Repo noch
  nicht — beim Anlegen als plain `privacy-policy.html` mit den gleichen
  Includes wie `index.html` bauen.
- Neue Drittanbieter müssen in der Datenschutzerklärung auftauchen.

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
