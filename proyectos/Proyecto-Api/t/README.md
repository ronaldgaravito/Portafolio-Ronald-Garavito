# 🌟 Lumina Library

Lumina Library es una moderna aplicación web de descubrimiento de libros diseñada con **Vue 3**. Permite a los usuarios explorar millones de títulos a través de la API de Open Library, visualizar portadas en alta resolución y gestionar una colección personal persistente.

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-ffd859?style=for-the-badge&logo=pinia&logoColor=black)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## ✨ Características

- 🔍 **Búsqueda Avanzada**: Motor de búsqueda en tiempo real conectado a [Open Library](https://openlibrary.org/).
- 💎 **Diseño Premium**: Interfaz oscura con efectos de **Glassmorphism**, desenfoques de fondo y micro-animaciones.
- 🇪🇸 **Localización**: Totalmente adaptado al español, priorizando resultados y descripciones en este idioma.
- 📦 **Colección Personal**: Sistema de "Favoritos" que guarda tus libros localmente en el navegador (`LocalStorage`).
- 📱 **Totalmente Responsive**: Optimizado para dispositivos móviles, tablets y escritorio.

---

## 🚀 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone <url-de-tu-repositorio>
cd t
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`.

---

## 🛠️ Stack Tecnológico

- **Frontend**: [Vue 3](https://vuejs.org/) (Composition API)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Estado Global**: [Pinia](https://pinia.vuejs.org/)
- **Enrutamiento**: [Vue Router 4](https://router.vuejs.org/)
- **Iconografía**: [Lucide Vue Next](https://lucide.dev/)
- **Cliente HTTP**: [Axios](https://axios-http.com/)
- **Estilos**: Vanilla CSS con variables modernas y Flexbox/Grid.

---

## 📂 Estructura del Proyecto

```text
src/
├── assets/         # Estilos globales y fuentes
├── components/     # Piezas reutilizables (BookCard, etc.)
├── router/         # Configuración de navegación
├── stores/         # Lógica de la API y estado global (Pinia)
├── views/          # Páginas principales (Inicio, Mi Colección)
└── App.vue         # Componente raíz con el Layout
```

---

## 🔌 Documentación Detallada de la API

Lumina Library utiliza la **Open Library API**, un servicio gratuito y abierto. A continuación, se detallan los endpoints técnicos implementados en el proyecto:

### 1. Motor de Búsqueda (Search API)
Se utiliza para localizar libros por cualquier término (título, autor, ISBN).

- **Endpoint**: `https://openlibrary.org/search.json`
- **Método**: `GET`
- **Parámetros Clave**:
  - `q`: Término de búsqueda (obligatorio).
  - `language`: Establecido en `spa` para priorizar resultados en español.
  - `limit`: Limitado a `20` resultados para optimizar la carga.

**Implementación en el Store (`library.js`):**
```javascript
const response = await axios.get(`.../search.json?q=${query}&language=spa&limit=20`);
```

### 2. Información Detallada (Works API)
Utilizado para obtener el resumen (sinopsis) y metadatos extendidos de un libro específico al hacer clic en él.

- **Endpoint**: `https://openlibrary.org/works/{OLDID}.json`
- **Método**: `GET`
- **Dato Crítico**: La API devuelve la descripción en dos formatos posibles: un string simple o un objeto con la propiedad `value`. El proyecto maneja ambos automáticamente.

### 3. Sistema de Portadas (Covers API)
Las imágenes no se descargan por API de datos, sino que se enlazan dinámicamente mediante el ID de portada.

- **URL de Imagen**: `https://covers.openlibrary.org/b/id/{cover_id}-{size}.jpg`
- **Tamaños usados**:
  - `M`: Para las tarjetas del catálogo (equilibrio peso/calidad).
  - `L`: Para la vista detallada (máxima resolución disponible).

### 4. Consideraciones Técnicas
- **CORS**: La API tiene habilitado CORS, lo que permite peticiones directas desde el navegador.
- **Tasa de refresco**: Se recomienda no realizar búsquedas en cada pulsación de tecla para evitar ser bloqueado temporalmente por la API.
- **Formato**: Todas las respuestas se procesan en formato **JSON**.


---

## 📋 Licencia

Este proyecto está bajo la Licencia MIT. ¡Siéntete libre de usarlo y mejorarlo! 

---
Desarrollado con  para amantes de la lectura.
