@echo off
echo ===========================================
echo Testing Fleetify Absensi API - Izamul Fikri
echo ===========================================

set BASE=http://127.0.0.1:8000/api

echo.
echo [1] Get all employees
curl.exe -s %BASE%/employees -H "Accept: application/json" | jq

echo.
echo [2] Create new employee EMP-004
curl.exe -s -X POST %BASE%/employees ^
  -H "Content-Type: application/json" -H "Accept: application/json" ^
  -d "{ \"employee_id\": \"EMP-005\", \"departement_id\": 1, \"name\": \"Basudara\", \"address\": \"Yogyakarta\" }" | jq

echo.
echo [3] Check-in EMP-001
curl.exe -s -X POST %BASE%/attendance/check-in ^
  -H "Content-Type: application/json" -H "Accept: application/json" ^
  -d "{ \"employee_id\": \"EMP-001\" }" | jq

echo.
echo [4] Check-out EMP-001
curl.exe -s -X PUT %BASE%/attendance/check-out ^
  -H "Content-Type: application/json" -H "Accept: application/json" ^
  -d "{ \"employee_id\": \"EMP-001\" }" | jq

echo.
echo [5] Get logs (today)
curl.exe -s "%BASE%/attendance/logs?date=%DATE:~10,4%-%DATE:~4,2%-%DATE:~7,2%" -H "Accept: application/json" | jq

echo.
echo Done!
pause
