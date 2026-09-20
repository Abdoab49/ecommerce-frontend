# auto-git.ps1
# يراقب كل الملفات فـ المشروع وكيدفع أي تغيير أوتوماتيكياً

$watchPath = "C:\Users\AB\Documents\store\Ecomerce\frontend"
Set-Location $watchPath

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "  Auto-Git Started" -ForegroundColor Cyan
Write-Host "  Watching: $watchPath" -ForegroundColor Cyan
Write-Host "  Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host "======================================" -ForegroundColor Cyan

while ($true) {
    Start-Sleep -Seconds 10
    
    # كيشوف واش كاين تغيير
    $status = git status --porcelain
    
    if ($status) {
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Changes detected" -ForegroundColor Green
        
        # كيزيد كل التغييرات (حتى الملفات الجديدة والمحذوفة)
        git add -A
        
        # كيدير commit
        $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'
        git commit -m "Auto-update $timestamp"
        
        # كيدفع لـ GitHub
        git push origin master
        
        Write-Host "[$(Get-Date -Format 'HH:mm:ss')] Pushed to GitHub" -ForegroundColor Green
        Write-Host "Vercel will rebuild automatically." -ForegroundColor Yellow
        Write-Host "--------------------------------------" -ForegroundColor Cyan
    }
}