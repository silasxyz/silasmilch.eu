---
name: deploy
description: Deployt die persönliche Website silasmilch.eu bzw. bereitet ein Deploy vor - Pre-Deploy-Checks, Push auf main und Verifikation der Live-Seite. Nutze diese Skill, wenn nach "deploy", "live schalten", "veröffentlichen" oder dem Status eines Deployments gefragt wird.
---

# Deploy — silasmilch.eu

Die Seite ist statisch und wird direkt aus dem Repo ausgeliefert. Es gibt keinen
Build-Step: was im Repo liegt, geht so live. Deshalb passiert das eigentliche
"Deployment" beim Merge nach `main`.

## 1. Hosting-Ziel bestätigen

Im Repo liegen Hinweise auf **beide** möglichen Wege — GitHub Pages (`CNAME`)
und Vercel (Vercel Web Analytics, per PR hinzugefügt). Kläre einmalig mit
Silas, welcher aktiv ist, bevor du etwas versprichst:

```sh
gh api repos/{owner}/{repo}/pages 2>/dev/null || echo "Kein GitHub Pages"
ls vercel.json .vercel 2>/dev/null
```

Achtung: `CNAME` enthält `yenchiah.me` (Rest vom Template-Fork), nicht
`silasmilch.eu`. Wenn GitHub Pages das Hosting ist, ist das ein Blocker und muss
vor dem Deploy korrigiert werden.

## 2. Pre-Deploy-Checks

Vor jedem Deploy:

- [ ] `git status` ist sauber, alles Gewollte ist committet.
- [ ] Die manuelle Checkliste aus `.claude/rules/testing.md` ist lokal
      durchlaufen (`python3 -m http.server 8000`).
- [ ] Keine Konsolenfehler, Dark Mode und Sprach-Toggle funktionieren.
- [ ] Neue Seiten stehen in `sitemap.xml`.
- [ ] Keine Secrets oder privaten Dateien im Diff (im Zweifel den
      `security-auditor`-Agent laufen lassen).

## 3. Deployen

Nie direkt auf `main` pushen. Der Weg ist:

```sh
git push -u origin <branch>
gh pr create --base main
```

Nach dem Merge des PRs deployt der Host automatisch. Frag vor `git push` und vor
dem Merge um Bestätigung — ein Merge nach `main` ist ein Live-Deploy.

## 4. Verifizieren

Nach ein bis zwei Minuten:

```sh
curl -sI https://silasmilch.eu | head -n 1
```

Dann die Live-Seite mit hartem Reload prüfen (Caching!): Nav lädt, Bilder da,
Dark Mode, Sprach-Toggle. Berichte ehrlich, was du verifizieren
konntest und was Silas selbst im Browser ansehen muss.

## Rollback

Deploy kaputt? Den Merge-Commit auf `main` reverten und das Revert pushen —
das löst ein neues Deploy des vorherigen Stands aus.

```sh
git revert -m 1 <merge-commit-sha>
```
