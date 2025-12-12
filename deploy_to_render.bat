@echo off
echo Preparing for Render.com Deployment...

echo Staging changes...
git add .

echo Committing...
git commit -m "Configure Render.com: Add render.yaml and update settings"

echo Pushing to GitHub...
git push

echo.
echo SUCCESS! Now go to dashboard.render.com/blueprints
echo Click 'New Blueprint Instance' and select your repository.
echo Render will handle the rest!
pause
