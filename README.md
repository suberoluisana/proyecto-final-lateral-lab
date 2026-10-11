# Informe – Evaluación final

# Lateral Lab – Proyecto Final

## 1. Descripción del proyecto

Lateral Lab es un laboratorio orientado al desarrollo local, la innovación y el fortalecimiento de capacidades. El objetivo del sitio web es presentar de forma clara la propuesta del proyecto y facilitar el contacto con personas interesadas.

El proyecto final integra los conocimientos desarrollados durante el curso, desde la construcción de la interfaz hasta el desarrollo del servidor y la gestión de datos.

## 2. Tecnologías utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Base de datos
- MongoDB
- Mongoose

### Despliegue
- GitHub para almacenamiento y versionamiento del proyecto.

## 3. Funcionamiento

El usuario interactúa con la página web y completa el formulario de solicitud de información. JavaScript procesa la interacción y envía los datos al servidor mediante una solicitud HTTP.

Express.js recibe y valida la información a través de la API. Posteriormente, Mongoose permite gestionar la comunicación con MongoDB para almacenar y consultar los registros.

Flujo principal:

Frontend → JavaScript → API Express.js → Mongoose → MongoDB

## 4. Repositorio

Repositorio GitHub:

https://github.com/suberoluisana/proyecto-final-lateral-lab

Sitio publicado (GitHub Pages):

https://suberoluisana.github.io/proyecto-final-lateral-lab/public/

> En GitHub Pages el formulario funciona en modo demostración (guarda en el navegador). Para guardar en MongoDB, ejecutar el servidor con `npm start`.

## 5. Cómo ejecutar el proyecto

1. Instalar dependencias: `npm install`
2. Crear un archivo `.env` (ver `.env.example`) con la variable `MONGODB_URI`.
3. Iniciar el servidor: `npm start`
4. Abrir `http://localhost:3000` en el navegador.

## 6. Aprendizajes y dificultades

Durante el curso aprendí a desarrollar una solución web integrando frontend, backend y base de datos. También aprendí a trabajar con rutas, solicitudes HTTP, APIs, Node.js, Express.js y MongoDB.

Una de las principales dificultades fue comprender cómo conectar las diferentes capas del proyecto y organizar correctamente los archivos y dependencias. La resolución de errores y el uso de herramientas de IA mediante prompting me ayudaron a comprender mejor el código y avanzar de manera progresiva.

## 7. Mejoras futuras

Si tuviera más tiempo, incorporaría nuevas funcionalidades, mejoraría la experiencia visual, agregaría validaciones adicionales y prepararía el proyecto para su publicación en un entorno de producción.
