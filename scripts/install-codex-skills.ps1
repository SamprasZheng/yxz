$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot
$source = Join-Path $repo '.codex\skills'
$target = Join-Path $env:USERPROFILE '.codex\skills'

if (-not (Test-Path $source)) {
    throw "Repo-local skills directory not found: $source"
}

New-Item -ItemType Directory -Force -Path $target | Out-Null
Copy-Item -Path (Join-Path $source '*') -Destination $target -Recurse -Force

Write-Host "Installed repo-local Codex skills to: $target"

