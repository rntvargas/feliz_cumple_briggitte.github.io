# Guía de Despliegue en GitHub Pages

## Pasos Detallados para Subir la Página

### 1. Preparar el Repositorio

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en el botón verde "New" para crear un nuevo repositorio
3. Nombra el repositorio (ejemplo: `briggitte-birthday`)
4. Marca la opción "Public" para que GitHub Pages funcione gratis
5. NO marques "Add a README file" (ya tenemos uno)
6. Haz clic en "Create repository"

### 2. Subir los Archivos

**Opción A: Subida Directa (Más Fácil)**
1. En la página del repositorio recién creado, haz clic en "uploading an existing file"
2. Arrastra y suelta TODOS los archivos de la carpeta `briggitte-birthday`:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `birthday-background.jpg`
   - `README.md`
   - `DEPLOYMENT.md` (este archivo)
3. Escribe un mensaje de commit como "Agregar página de cumpleaños de Briggitte"
4. Haz clic en "Commit changes"

**Opción B: Usando Git (Para Usuarios Avanzados)**
```bash
git clone https://github.com/TU_USUARIO/briggitte-birthday.git
cd briggitte-birthday
# Copia todos los archivos aquí
git add .
git commit -m "Agregar página de cumpleaños de Briggitte"
git push origin main
```

### 3. Activar GitHub Pages

1. En tu repositorio, ve a la pestaña "Settings"
2. Desplázate hacia abajo hasta encontrar "Pages" en el menú lateral
3. En "Source", selecciona "Deploy from a branch"
4. En "Branch", selecciona "main"
5. En "Folder", deja seleccionado "/ (root)"
6. Haz clic en "Save"

### 4. Acceder a tu Página

1. GitHub te mostrará una URL como: `https://TU_USUARIO.github.io/briggitte-birthday/`
2. La página puede tardar unos minutos en estar disponible
3. ¡Comparte esta URL con Briggitte y sus amigos!

## Solución de Problemas

### La página no se ve correctamente
- Verifica que todos los archivos se subieron correctamente
- Asegúrate de que el archivo se llame exactamente `index.html`
- Espera unos minutos, GitHub Pages puede tardar en actualizar

### El contador no funciona
- Verifica que el archivo `script.js` se subió correctamente
- Abre las herramientas de desarrollador del navegador (F12) para ver errores

### Las imágenes no se cargan
- Verifica que `birthday-background.jpg` se subió correctamente
- Los nombres de archivo son sensibles a mayúsculas y minúsculas

## Personalización Futura

Si quieres cambiar algo después:
1. Edita los archivos directamente en GitHub (haz clic en el archivo y luego en el ícono de lápiz)
2. O descarga los archivos, edítalos localmente y súbelos de nuevo
3. Los cambios se reflejarán automáticamente en la página web

## Contacto

Si tienes problemas con el despliegue, revisa la documentación oficial de GitHub Pages:
https://docs.github.com/en/pages

