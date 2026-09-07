---
description: Prüft, warum WebSearch/WebFetch (oder andere Tools) blockiert werden - checkt Hooks, Permissions und Settings
---

# Permissions & Hooks Check

Analysiere systematisch, warum Tool-Aufrufe (insbesondere WebSearch, WebFetch,
aber auch generell) durch Hooks oder Permissions blockiert werden könnten.

## 1. Settings-Dateien prüfen

Lies und zeige den vollständigen Inhalt von:
- `.claude/settings.json`
- `.claude/settings.local.json`
- `~/.claude/settings.json` (falls vorhanden)

Achte besonders auf:
- `permissions.deny` / `permissions.allow` Listen
- `hooks` Konfiguration (PreToolUse, PostToolUse, etc.)
- Ob `WebSearch`, `WebFetch`, oder ein zu breiter Matcher wie `"*"` dort auftaucht
- `enabledPlugins` — Plugins bringen eigene Hooks mit, die nicht in den
  Settings-Dateien selbst stehen (siehe `~/.claude/plugins/`)

## 2. Hook-Skripte prüfen

Lies alle Skripte unter `.claude/hooks/` (z.B. `validate-bash.sh`) und prüfe:
- Auf welche Tools/Matcher reagiert der Hook tatsächlich?
- Gibt es eine Bedingung, die versehentlich auch WebSearch/WebFetch matcht,
  obwohl der Hook eigentlich nur Bash-Commands validieren sollte?
- Welchen Exit-Code gibt das Skript in welchen Fällen zurück (0 = erlaubt,
  ungleich 0 = blockiert)?

## 3. Zusammenfassung

Gib eine klare, kurze Diagnose:
- **Welche Regel/welcher Hook genau blockiert das Tool?**
- **Datei + Zeile**, wo das steht
- **Vorschlag zur Korrektur** (z.B. Matcher einschränken, Tool zur allow-Liste
  hinzufügen, Hook-Bedingung präzisieren)

Ändere nichts automatisch — zeig mir die Diagnose und den vorgeschlagenen Fix,
bevor du etwas editierst. Frag mich um Bestätigung, bevor du Settings- oder
Hook-Dateien veränderst.
