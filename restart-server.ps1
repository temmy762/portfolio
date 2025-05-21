# Restart development server script

# Stop any running dev server by finding its process ID and killing it
$processes = Get-Process -Name 'node' | Where-Object { $_.CommandLine -like '*next dev*' }
foreach ($process in $processes) {
    Stop-Process -Id $process.Id -Force
    Write-Host "Stopped Node.js process: $($process.Id)"
}

# Navigate to project directory
Set-Location -Path "c:\Users\user\Desktop\Portfolio\portfolio"

# Start the development server
npm run dev
