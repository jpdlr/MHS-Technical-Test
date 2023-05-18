@echo off

start cmd /k "cd frontend && npm install && npm run serve"
start cmd /k "cd backend && dotnet run"