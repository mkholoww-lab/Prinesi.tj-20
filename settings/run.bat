@echo off
setlocal

echo ================================
echo Автозапуск приложения (Windows)
echo ================================

rem Попытка запустить для Node.js
where node >nul 2>&1
if %ERRORLEVEL%==0 (
  echo [info] Node.js найден.
  if exist package.json (
    echo [info] Найден package.json -- выполняю npm install и npm start
    npm install
    if %ERRORLEVEL%==0 (
      npm start
      goto end
    )
  ) else if exist app.js (
    echo [info] Запуск node app.js
    node app.js
    goto end
  )
)

rem Попытка запустить для Python
where python >nul 2>&1
if %ERRORLEVEL%==0 (
  echo [info] Python найден.
  if exist requirements.txt (
    echo [info] Устанавливаю зависимости из requirements.txt
    pip install -r requirements.txt
  )
  if exist main.py (
    echo [info] Запуск python main.py
    python main.py
    goto end
  ) else if exist app.py (
    echo [info] Запуск python app.py
    python app.py
    goto end
  )
)

rem Попытка запустить для Java (jar)
where java >nul 2>&1
if %ERRORLEVEL%==0 (
  echo [info] Java найден.
  for %%f in (*.jar) do (
    echo [info] Найден %%f -- запускаю java -jar "%%f"
    java -jar "%%f"
    goto end
  )
)

rem Попытка запустить через docker-compose
where docker-compose >nul 2>&1
if %ERRORLEVEL%==0 (
  if exist docker-compose.yml (
    echo [info] docker-compose.yml найден -- выполняю docker-compose up --build
    docker-compose up --build
    goto end
  )
)
echo.
echo Не удалось автоматически определить, как запустить приложение.
echo Вы можете передать команду вручную:
echo   run.bat <команда>  например: run.bat "python myscript.py" или run.bat "npm start"
if "%~1" neq "" (
  echo [info] Запуск пользовательской команды: %*
  %*
  goto end
)
echo.
echo Чтобы настроить автоматический запуск, отредактируйте этот файл и укажите точную команду запуска.
:end
echo.
echo Завершено. Нажмите любую клавишу, чтобы выйти...
pause >nul
