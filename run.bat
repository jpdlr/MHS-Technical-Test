@echo off

start cmd /k "cd frontend && npm install && npm run server"
start cmd /k "cd backend && dotnet run"