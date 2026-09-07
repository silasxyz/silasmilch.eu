#!/usr/bin/env bash
# PreToolUse-Hook für das Bash-Tool.
#
# Liest das Tool-Input als JSON auf stdin und blockiert Kommandos, die in diesem
# Repo (statische Website, kein Build-Step) destruktiv oder schlicht falsch sind.
#
# Exit-Codes:
#   0 = erlauben
#   2 = blockieren, stderr geht zurück an Claude als Begründung
set -uo pipefail

input=$(cat)

if command -v jq >/dev/null 2>&1; then
  command=$(printf '%s' "$input" | jq -r '.tool_input.command // empty')
else
  # Fallback ohne jq: lieber durchlassen als fälschlich blockieren.
  exit 0
fi

[ -z "$command" ] && exit 0

deny() {
  echo "Blockiert von .claude/hooks/validate-bash.sh: $1" >&2
  exit 2
}

# Destruktives Löschen
case "$command" in
  *"rm -rf /"*|*"rm -rf ~"*|*"rm -rf ."|*"rm -rf .."*|*"rm -fr /"*)
    deny "rekursives Löschen an einem gefährlichen Pfad." ;;
esac

# Git-Operationen, die Arbeit vernichten oder History umschreiben
case "$command" in
  *"git push"*"--force"*|*"git push"*" -f "*)
    deny "Force-Push. Frag stattdessen nach, oder nutze --force-with-lease nach Rücksprache." ;;
  *"git reset --hard"*|*"git clean -"*[fdx]*)
    deny "das verwirft uncommittete Arbeit unwiderruflich. Erst nachfragen." ;;
  *"git checkout main"*|*"git switch main"*)
    : ;;
esac

# Direkt auf main pushen
if printf '%s' "$command" | grep -Eq 'git +push[^|;&]* (main|origin +main)\b'; then
  deny "direkter Push auf main. Bitte über einen Branch und einen PR gehen."
fi

# Interaktive Kommandos hängen in diesem Harness
case "$command" in
  *"git rebase -i"*|*"git add -i"*|*"git commit --amend"*"-i"*)
    deny "interaktive Git-Kommandos werden hier nicht unterstützt." ;;
esac

# Das Repo ist bewusst ohne Paketmanager/Build-Step
case "$command" in
  *"npm install"*|*"npm i "*|*"yarn add"*|*"pnpm add"*|*"npm init"*)
    deny "dieses Repo ist absichtlich ohne package.json und ohne Build-Step. Erst mit Silas abklären."
esac

exit 0
