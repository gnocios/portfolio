#!/bin/bash
set -e

# Define aquí la carpeta de tu portfolio en el VPS
APP_DIR="/var/www/portfolio"

echo "🚀 Iniciando despliegue del Portfolio..."
cd "$APP_DIR"

echo "📥 Descargando cambios de Git..."
git pull origin main

echo "📦 Instalando dependencias de Node..."
npm ci

echo "🔨 Compilando build de producción (Vite)..."
npm run build

echo "🔒 Ajustando permisos para el servidor web..."
chown -R www-data:www-data "$APP_DIR/dist"
chmod -R 755 "$APP_DIR/dist"

echo "✨ ¡Despliegue del Portfolio completado con éxito!"