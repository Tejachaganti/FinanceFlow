@echo off
cd /d "%~dp0"

echo Starting FinanceFlow backend...
start "FinanceFlow Backend" cmd /k "cd /d "%~dp0backend" && npm.cmd run dev"

echo Starting FinanceFlow frontend...
start "FinanceFlow Frontend" cmd /k "cd /d "%~dp0frontend" && npm.cmd run dev -- --host 0.0.0.0"
echo Waiting for frontend...
timeout /t 4 /nobreak >nul

start "" "http://localhost:5173/"
