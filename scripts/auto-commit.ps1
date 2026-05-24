# Hourly auto-commit for D:\DOT\yxz
# Stages changes, drops anything matching credential patterns or >10MB, commits, pushes.
# Registered as a Windows Scheduled Task — see scripts/register-auto-commit-task.ps1.

$ErrorActionPreference = 'Stop'
$repo = 'D:\DOT\yxz'
$logFile = Join-Path $repo 'scripts\auto-commit.log'
$maxBytes = 10MB

# Credential / secret filename patterns (substring match, case-insensitive)
$credPatterns = @(
    '.env', '.env.', '.envrc',
    '.key', '.pem', '.pfx', '.p12', '.jks', '.keystore',
    'credentials', 'secret', 'secrets',
    'token', 'apikey', 'api-key', 'api_key',
    'id_rsa', 'id_dsa', 'id_ecdsa', 'id_ed25519',
    '.npmrc', '.netrc', 'gcloud-key', 'service-account'
)

function Log($msg) {
    $line = "[{0}] {1}" -f (Get-Date -Format 'yyyy-MM-dd HH:mm:ss'), $msg
    Add-Content -Path $logFile -Value $line -Encoding utf8
}

Set-Location $repo

try {
    # Stage all changes
    git add -A 2>&1 | Out-Null

    $staged = git diff --cached --name-only
    if (-not $staged) {
        Log "nothing to commit"
        exit 0
    }

    $dropped = @()

    foreach ($f in $staged) {
        $lower = $f.ToLower()
        $matchedPattern = $null
        foreach ($p in $credPatterns) {
            if ($lower.Contains($p.ToLower())) { $matchedPattern = $p; break }
        }
        if ($matchedPattern) {
            git reset HEAD -- "$f" 2>&1 | Out-Null
            $dropped += "$f (credential pattern: $matchedPattern)"
            continue
        }

        $full = Join-Path $repo $f
        if (Test-Path $full -PathType Leaf) {
            $size = (Get-Item $full).Length
            if ($size -gt $maxBytes) {
                git reset HEAD -- "$f" 2>&1 | Out-Null
                $dropped += "$f (size: $([math]::Round($size/1MB,2)) MB)"
            }
        }
    }

    foreach ($d in $dropped) { Log "DROPPED $d" }

    $remaining = git diff --cached --name-only
    if (-not $remaining) {
        Log "all staged files dropped by filters; nothing to commit"
        exit 0
    }

    $count = ($remaining | Measure-Object).Count
    $msg = "auto: hourly checkpoint $(Get-Date -Format 'yyyy-MM-dd HH:mm') ($count files)"
    git commit -m $msg 2>&1 | Out-Null
    Log "COMMITTED $count files: $msg"

    $branch = (git rev-parse --abbrev-ref HEAD).Trim()
    git push origin $branch 2>&1 | Out-Null
    Log "PUSHED to origin/$branch"
}
catch {
    Log "ERROR $($_.Exception.Message)"
    exit 1
}
