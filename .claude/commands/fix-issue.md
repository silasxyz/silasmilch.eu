---
description: Holt ein GitHub-Issue, implementiert den Fix auf einem Branch und öffnet einen PR
argument-hint: "<issue-nummer>"
allowed-tools: Read, Edit, Write, Grep, Glob, Bash(git:*), Bash(gh:*)
---

Behebe GitHub-Issue #$1 in diesem Repo.

Issue-Details: !`gh issue view $1`
Aktueller Branch: !`git branch --show-current`

Gehe so vor:

1. **Verstehen** — Lies das Issue inklusive Kommentaren. Wenn unklar ist, was
   erwartet wird, frag mich, bevor du Code änderst.
2. **Branch** — Arbeite nie direkt auf `main`. Leg von `main` aus einen Branch
   `fix/$1-<kurzbeschreibung>` an (falls du nicht schon auf einem passenden
   Branch bist).
3. **Finden** — Lokalisiere die betroffenen Stellen. Denk daran: es gibt keinen
   Build-Step, sichtbarer Text lebt in `js/lang-toggle.js`, die Nav in
   `menu.html`, eigene Styles in `css/custom.css`.
4. **Umsetzen** — Halte dich an die Regeln aus `.claude/rules/code-style.md`.
   Änderungen minimal halten, kein Refactoring nebenbei.
5. **Prüfen** — Geh die manuelle Checkliste aus `.claude/rules/testing.md`
   durch (`python3 -m http.server 8000`) und berichte ehrlich, was du davon
   tatsächlich verifiziert hast und was ich im Browser nachprüfen muss.
6. **Commit & PR** — Commit-Message beschreibt das *Warum* und referenziert
   `Fixes #$1`. Dann `gh pr create` gegen `main` mit kurzer Zusammenfassung und
   Testhinweisen.

Frag mich vor `git push` und vor dem Erstellen des PRs um Bestätigung.
