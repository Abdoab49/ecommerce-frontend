# auto-push.ps1
while ($true) {
    Start-Sleep -Seconds 30
    $status = git status --porcelain
    if ($status) {
        git add .
        git commit -m "Auto-update $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        git push origin master
        Write-Host "Auto-push done" -ForegroundColor Green
    }
}