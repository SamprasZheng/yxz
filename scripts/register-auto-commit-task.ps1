# One-time registration script for the hourly auto-commit Scheduled Task.
# Run this ONCE in an elevated PowerShell (or normal — uses LocalSystem-less user task).

$ErrorActionPreference = 'Stop'
$taskName = 'yxz-auto-commit-hourly'
$scriptPath = 'D:\DOT\yxz\scripts\auto-commit.ps1'

# Unregister if already exists
$existing = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
if ($existing) {
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
    Write-Host "Removed existing task: $taskName"
}

$action = New-ScheduledTaskAction `
    -Execute 'powershell.exe' `
    -Argument "-NoProfile -ExecutionPolicy Bypass -File `"$scriptPath`""

# Hourly, starting at the next top of the hour, running indefinitely
$startTime = (Get-Date).AddMinutes(5)
$trigger = New-ScheduledTaskTrigger -Once -At $startTime -RepetitionInterval (New-TimeSpan -Hours 1)

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -ExecutionTimeLimit (New-TimeSpan -Minutes 10) `
    -MultipleInstances IgnoreNew

$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited

Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Description 'Hourly auto-commit of D:\DOT\yxz (excludes credentials + files >10MB).'

Write-Host "Registered: $taskName"
Write-Host "First run: $startTime"
Write-Host "Repeats: every 1 hour"
Write-Host "Log: D:\DOT\yxz\scripts\auto-commit.log"
Write-Host ""
Write-Host "Test manually with:"
Write-Host "  powershell -NoProfile -ExecutionPolicy Bypass -File $scriptPath"
Write-Host "Disable later with:"
Write-Host "  Disable-ScheduledTask -TaskName $taskName"
Write-Host "Remove later with:"
Write-Host "  Unregister-ScheduledTask -TaskName $taskName -Confirm:`$false"
