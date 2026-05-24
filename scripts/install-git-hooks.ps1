$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

git config core.hooksPath .githooks
Write-Host "Configured git hooks path: .githooks"
Write-Host "Active pre-commit hook: .githooks/pre-commit"

