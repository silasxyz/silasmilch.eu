# Testen

Dieses Repo hat **kein** Test-Framework, keinen Linter und keinen Build-Step.
"Testen" heißt hier: die Seite lokal ausliefern und manuell durchklicken.

## Lokal starten

Nicht `index.html` per `file://` öffnen — `js/menu.js` lädt `menu.html` per
`$.load()`, was unter `file://` an CORS scheitert. Stattdessen:

```sh
python3 -m http.server 8000    # dann http://localhost:8000
```

## Manuelle Checkliste vor jedem Commit

Bei Änderungen an Layout, CSS oder JS jeweils prüfen:

- [ ] Nav-Bar wird geladen (kommt aus `menu.html` via `js/menu.js`) und die
      Social-Icons verlinken korrekt.
- [ ] Hamburger-Menü öffnet/schließt in schmalem Viewport (< 768px).
- [ ] Dark-Mode-Toggle schaltet um **und** überlebt einen Reload
      (`localStorage`-Key `darkMode`), ohne Aufblitzen des falschen Themes.
- [ ] Sprach-Toggle wechselt den About-Text DE ↔ EN.
- [ ] Browser-Konsole ist frei von Fehlern.
- [ ] Responsive: einmal in Mobil- und einmal in Desktop-Breite ansehen.

## Nicht automatisch einführen

Kein Jest/Vitest/Playwright und keine `package.json` hinzufügen, ohne dass Silas
das ausdrücklich möchte — das würde den "keine Build-Tools"-Charakter des Repos
brechen.
