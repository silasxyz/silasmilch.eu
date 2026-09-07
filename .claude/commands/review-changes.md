---
description: Reviewt die uncommitteten/Branch-Änderungen dieser Website mit dem code-reviewer-Agent (für PR-Reviews stattdessen /review)
argument-hint: "[optional: Datei oder Bereich, auf den fokussiert werden soll]"
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*), Bash(git log:*), Task
---

Reviewe die aktuellen Änderungen an dieser Website.

Aktueller Stand:

- Branch: !`git branch --show-current`
- Status: !`git status --short`
- Diff-Umfang: !`git diff --stat HEAD`

Fokus (leer = alle Änderungen): $ARGUMENTS

Starte den `code-reviewer`-Agent auf diesen Änderungen. Wenn die Änderungen
Analytics, Cookies oder externe Skripte berühren, starte
zusätzlich den `security-auditor`-Agent — beide parallel in einer Nachricht.

Fasse die Ergebnisse anschließend zusammen: Blocker zuerst, dann der Rest, je
mit `datei:zeile` und konkretem Fix. Nimm noch keine Änderungen vor — frag, was
ich davon umgesetzt haben will.
