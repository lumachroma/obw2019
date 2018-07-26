##
## npm http-server
## https://github.com/indexzero/http-server
##

Param(
    [string]$Port = 8682,
    [string]$BaseUrl = "http://localhost"
)

Start-Process -FilePath "powershell.exe" -ArgumentList "http-server ./ -p ${Port}"
Start-Sleep -Seconds 2
Start-Process -FilePath "chrome.exe" -ArgumentList  "${BaseUrl}:${Port}"