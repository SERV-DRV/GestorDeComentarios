# 📱 GestorDeComentarios - FaceKinal

Sistema de gestión de opiniones similar a las publicaciones de Facebook, con funcionalidades específicas centradas en la interacción y expresión de opiniones por parte de los usuarios.

---

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** (v5.2.1) - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** (v9.1.5) - ODM para MongoDB

### Seguridad
- **Helmet** (v8.1.0) - Seguridad HTTP headers
- **CORS** (v2.8.6) - Control de acceso entre orígenes
- **Express Rate Limit** (v8.2.1) - Limitación de peticiones
- **Argon2** (v0.44.0) - Encriptación de contraseñas

### Almacenamiento de Archivos
- **Cloudinary** (v2.9.0) - Servicio de almacenamiento de imágenes en la nube
- **Multer** (v2.0.2) - Manejo de archivos multipart/form-data
- **Multer Storage Cloudinary** (v4.0.0) - Integración de Multer con Cloudinary

### Validación y Utilidades
- **Express Validator** (v7.3.1) - Validación de datos
- **Dotenv** (v17.2.3) - Variables de entorno
- **Morgan** (v1.10.1) - Logger de peticiones HTTP
- **UUID** (v13.0.0) - Generación de identificadores únicos
- **Axios** (v1.13.4) - Cliente HTTP
- **JSON Web Token** (v9.0.3) - Autenticación JWT

### Desarrollo
- **Nodemon** (v3.1.11) - Reinicio automático del servidor

---

## 📋 Prerequisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

### 1. Node.js y npm
- **Node.js** versión 18 o superior
- Descarga desde: [https://nodejs.org/](https://nodejs.org/)
- Verifica la instalación:
  ```bash
  node --version
  npm --version
  ```

### 2. MongoDB
Tienes dos opciones:

#### Opción A: MongoDB Local
- Descarga e instala MongoDB Community Edition
- Descarga desde: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Verifica la instalación:
  ```bash
  mongod --version
  ```

#### Opción B: MongoDB Atlas (Recomendado)
- Crea una cuenta gratuita en [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Crea un cluster gratuito
- Obtén tu cadena de conexión

### 3. Cuenta de Cloudinary
- Crea una cuenta gratuita en [https://cloudinary.com/](https://cloudinary.com/)
- Ve a tu Dashboard para obtener:
  - Nombre de la Nube (Cloud Name)
  - Clave API (API Key)
  - Secreto API (API Secret)

### 4. Git
- Descarga desde: [https://git-scm.com/](https://git-scm.com/)
- Verifica la instalación:
  ```bash
  git --version
  ```

### 5. pnpm (Gestor de Paquetes - Opcional pero Recomendado)
```bash
npm install -g pnpm
```

---

## 🛠️ Instalación y Configuración

### Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/SERV-DRV/GestorDeComentarios.git
cd GestorDeComentarios
```

### Paso 2: Navegar al Directorio del Servidor
```bash
cd server-admin
```

### Paso 3: Instalar Dependencias

Con pnpm (recomendado):
```bash
pnpm install
```

Con npm:
```bash
npm install
```

### Paso 4: Configurar Variables de Entorno

1. Crea un archivo `.env` en la carpeta `server-admin`:
```bash
touch .env
```

2. Copia el siguiente contenido y complétalo con tus credenciales:

```env
# Configuración del Servidor
PORT=3001

# Conexión a Base de Datos
# Para MongoDB Local:
URI_MONGODB=mongodb://127.0.0.1:27017/FACEKINAL

# Para MongoDB Atlas (reemplaza <username>, <password> y <cluster>):
# URI_MONGODB=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/FACEKINAL?retryWrites=true&w=majority

# Configuración de Cloudinary (Obtenlas de tu Dashboard de Cloudinary)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

**⚠️ IMPORTANTE:** 
- Reemplaza `tu_cloud_name`, `tu_api_key` y `tu_api_secret` con tus credenciales reales de Cloudinary
- NO compartas tu archivo `.env` ni subas tus credenciales a repositorios públicos

### Paso 5: Iniciar MongoDB (Si usas MongoDB Local)
```bash
mongod
```
Deja esta terminal abierta y abre una nueva para los siguientes pasos.

### Paso 6: Ejecutar el Servidor

Modo desarrollo (con reinicio automático):
```bash
npm run dev
```

Modo producción:
```bash
npm start
```

### Paso 7: Verificar que el Servidor está Corriendo
El servidor debería estar corriendo en: `http://localhost:3001`

Verifica con el endpoint de salud:
```bash
curl http://localhost:3001/kinalface/v1/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "service": "FaceKinal Admin",
  "version": "1.0.0"
}
```

---

## 📁 Estructura de Carpetas

```
GestorDeComentarios/
│
├── server-admin/                 # Aplicación del servidor
│   ├── configs/                  # Configuraciones del servidor
│   │   ├── app.js               # Configuración principal de Express
│   │   ├── db.js                # Configuración de MongoDB
│   │   ├── cors-configuration.js # Configuración de CORS
│   │   └── helmet-configuration.js # Configuración de Helmet
│   │
│   ├── middlewares/              # Middlewares personalizados
│   │   ├── check-validators.js  # Validación de errores
│   │   ├── file-uploader.js     # Manejo de archivos (Cloudinary)
│   │   ├── users-validation.js  # Validaciones de usuarios
│   │   └── publications-validation.js # Validaciones de publicaciones
│   │
│   ├── src/                      # Código fuente
│   │   ├── users/               # Módulo de usuarios
│   │   │   ├── user.model.js    # Modelo de datos de usuario
│   │   │   ├── user.controller.js # Lógica de negocio de usuarios
│   │   │   └── user.routes.js   # Rutas de usuarios
│   │   │
│   │   └── publications/        # Módulo de publicaciones
│   │       ├── publication.model.js # Modelo de datos de publicación
│   │       ├── publication.controller.js # Lógica de negocio de publicaciones
│   │       └── publication.routes.js # Rutas de publicaciones
│   │
│   ├── index.js                  # Punto de entrada de la aplicación
│   ├── package.json              # Dependencias y scripts
│   ├── pnpm-lock.yaml           # Archivo de bloqueo de pnpm
│   └── .env                      # Variables de entorno (no incluido en git)
│
├── .gitignore                    # Archivos ignorados por git
├── LICENSE                       # Licencia del proyecto
└── README.md                     # Este archivo
```

---

## 🌐 API Endpoints

Base URL: `http://localhost:3001/kinalface/v1`

### 🏥 Health Check

#### GET `/health`
Verifica el estado del servidor.

**Respuesta:**
```json
{
  "status": "ok",
  "service": "FaceKinal Admin",
  "version": "1.0.0"
}
```

---

### 👤 Usuarios (`/users`)

#### 1. GET `/users`
Obtiene la lista de todos los usuarios.

**Parámetros de Consulta (Opcionales):**
- `isActive` (boolean): Filtra por usuarios activos/inactivos

**Ejemplo de Solicitud:**
```bash
GET http://localhost:3001/kinalface/v1/users
GET http://localhost:3001/kinalface/v1/users?isActive=true
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "_id": "65f8a9b2c3d4e5f6a7b8c9d0",
      "username": "juanperez",
      "email": "juan.perez@example.com",
      "photo": "photos/user_juanperez.jpg",
      "isActive": true,
      "createAt": "2024-03-18T10:30:00.000Z"
    },
    {
      "_id": "65f8a9b2c3d4e5f6a7b8c9d1",
      "username": "mariagonzalez",
      "email": "maria.gonzalez@example.com",
      "photo": "photos/default_user",
      "isActive": true,
      "createAt": "2024-03-18T11:45:00.000Z"
    }
  ]
}
```

---

#### 2. GET `/users/:id`
Obtiene un usuario específico por su ID.

**Parámetros:**
- `id` (string): ID de MongoDB del usuario

**Ejemplo de Solicitud:**
```bash
GET http://localhost:3001/kinalface/v1/users/65f8a9b2c3d4e5f6a7b8c9d0
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d0",
    "username": "juanperez",
    "email": "juan.perez@example.com",
    "photo": "photos/user_juanperez.jpg",
    "isActive": true,
    "createAt": "2024-03-18T10:30:00.000Z"
  }
}
```

**Respuesta de Error (404):**
```json
{
  "success": false,
  "message": "Usuario no encontrado"
}
```

---

#### 3. POST `/users/login`
Inicia sesión de un usuario.

**Body (JSON):**
```json
{
  "login": "juanperez",
  "password": "miPassword123"
}
```

**Nota:** El campo `login` puede ser el username o el email.

**Ejemplo de Solicitud:**
```bash
POST http://localhost:3001/kinalface/v1/users/login
Content-Type: application/json

{
  "login": "juan.perez@example.com",
  "password": "miPassword123"
}
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d0",
    "username": "juanperez",
    "email": "juan.perez@example.com",
    "photo": "photos/user_juanperez.jpg",
    "isActive": true,
    "createAt": "2024-03-18T10:30:00.000Z"
  }
}
```

**Respuesta de Error (401):**
```json
{
  "success": false,
  "message": "Contraseña incorrecta"
}
```

---

#### 4. POST `/users`
Crea un nuevo usuario.

**Content-Type:** `multipart/form-data`

**Datos del Formulario:**
- `username` (string, requerido): Nombre de usuario (3-30 caracteres)
- `email` (string, requerido): Correo electrónico válido
- `password` (string, requerido): Contraseña (mínimo 6 caracteres)
- `photo` (file, opcional): Imagen de perfil

**Ejemplo de Solicitud (usando curl):**
```bash
curl -X POST http://localhost:3001/kinalface/v1/users \
  -F "username=juanperez" \
  -F "email=juan.perez@example.com" \
  -F "password=miPassword123" \
  -F "photo=@/ruta/a/imagen.jpg"
```

**Ejemplo de Cuerpo (JSON representativo):**
```json
{
  "username": "juanperez",
  "email": "juan.perez@example.com",
  "password": "miPassword123"
}
```

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d0",
    "username": "juanperez",
    "email": "juan.perez@example.com",
    "photo": "photos/user_juanperez.jpg",
    "isActive": true,
    "createAt": "2024-03-18T10:30:00.000Z"
  }
}
```

**Respuesta de Error (400):**
```json
{
  "success": false,
  "message": "El correo o nombre de usuario ya existe"
}
```

---

#### 5. PUT `/users/:id`
Actualiza un usuario existente.

**Parámetros:**
- `id` (string): ID de MongoDB del usuario

**Content-Type:** `multipart/form-data`

**Datos del Formulario (todos opcionales):**
- `username` (string): Nuevo nombre de usuario
- `email` (string): Nuevo correo electrónico
- `photo` (file): Nueva imagen de perfil
- `passwordActual` (string): Contraseña actual (requerida si se cambia la contraseña)
- `passwordNueva` (string): Nueva contraseña

**Ejemplo de Solicitud (usando curl):**
```bash
curl -X PUT http://localhost:3001/kinalface/v1/users/65f8a9b2c3d4e5f6a7b8c9d0 \
  -F "username=juanperez_updated" \
  -F "email=juan.perez.updated@example.com" \
  -F "photo=@/ruta/a/nueva_imagen.jpg"
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario actualizado exitosamente",
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d0",
    "username": "juanperez_updated",
    "email": "juan.perez.updated@example.com",
    "photo": "photos/user_juanperez_updated.jpg",
    "isActive": true,
    "createAt": "2024-03-18T10:30:00.000Z"
  }
}
```

---

#### 6. PUT `/users/:id/activate`
Activa un usuario.

**Parámetros:**
- `id` (string): ID de MongoDB del usuario

**Ejemplo de Solicitud:**
```bash
PUT http://localhost:3001/kinalface/v1/users/65f8a9b2c3d4e5f6a7b8c9d0/activate
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario activado exitosamente",
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d0",
    "username": "juanperez",
    "email": "juan.perez@example.com",
    "photo": "photos/user_juanperez.jpg",
    "isActive": true,
    "createAt": "2024-03-18T10:30:00.000Z"
  }
}
```

---

#### 7. PUT `/users/:id/desactivate`
Desactiva un usuario.

**Parámetros:**
- `id` (string): ID de MongoDB del usuario

**Ejemplo de Solicitud:**
```bash
PUT http://localhost:3001/kinalface/v1/users/65f8a9b2c3d4e5f6a7b8c9d0/desactivate
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario desactivado exitosamente",
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d0",
    "username": "juanperez",
    "email": "juan.perez@example.com",
    "photo": "photos/user_juanperez.jpg",
    "isActive": false,
    "createAt": "2024-03-18T10:30:00.000Z"
  }
}
```

---

### 📝 Publicaciones (`/publications`)

#### 1. GET `/publications`
Obtiene la lista de todas las publicaciones.

**Parámetros de Consulta (Opcionales):**
- `isActive` (boolean): Filtra por publicaciones activas/inactivas

**Ejemplo de Solicitud:**
```bash
GET http://localhost:3001/kinalface/v1/publications
GET http://localhost:3001/kinalface/v1/publications?isActive=true
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "_id": "65f8a9b2c3d4e5f6a7b8c9d2",
      "userId": "65f8a9b2c3d4e5f6a7b8c9d0",
      "title": "Mi primera publicación",
      "category": "Tecnología",
      "content": "Este es el contenido de mi primera publicación sobre tecnología.",
      "photo": "photos/publication_123.jpg",
      "isActive": true,
      "createAt": "2024-03-18T12:00:00.000Z"
    },
    {
      "_id": "65f8a9b2c3d4e5f6a7b8c9d3",
      "userId": "65f8a9b2c3d4e5f6a7b8c9d1",
      "title": "Opinión sobre desarrollo web",
      "category": "Desarrollo",
      "content": "Aquí comparto mi opinión sobre las últimas tendencias en desarrollo web.",
      "photo": "photos/default_publication",
      "isActive": true,
      "createAt": "2024-03-18T13:30:00.000Z"
    }
  ]
}
```

---

#### 2. GET `/publications/:id`
Obtiene una publicación específica por su ID.

**Parámetros:**
- `id` (string): ID de MongoDB de la publicación

**Ejemplo de Solicitud:**
```bash
GET http://localhost:3001/kinalface/v1/publications/65f8a9b2c3d4e5f6a7b8c9d2
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d2",
    "userId": "65f8a9b2c3d4e5f6a7b8c9d0",
    "title": "Mi primera publicación",
    "category": "Tecnología",
    "content": "Este es el contenido de mi primera publicación sobre tecnología.",
    "photo": "photos/publication_123.jpg",
    "isActive": true,
    "createAt": "2024-03-18T12:00:00.000Z"
  }
}
```

**Respuesta de Error (404):**
```json
{
  "success": false,
  "message": "Publicación no encontrada"
}
```

---

#### 3. POST `/publications`
Crea una nueva publicación.

**Content-Type:** `multipart/form-data`

**Datos del Formulario:**
- `userId` (string, requerido): ID de MongoDB del usuario que crea la publicación
- `title` (string, requerido): Título de la publicación (máximo 150 caracteres)
- `category` (string, requerido): Categoría de la publicación (máximo 50 caracteres)
- `content` (string, requerido): Contenido de la publicación
- `photo` (file, opcional): Imagen de la publicación

**Ejemplo de Solicitud (usando curl):**
```bash
curl -X POST http://localhost:3001/kinalface/v1/publications \
  -F "userId=65f8a9b2c3d4e5f6a7b8c9d0" \
  -F "title=Mi primera publicación" \
  -F "category=Tecnología" \
  -F "content=Este es el contenido de mi primera publicación sobre tecnología." \
  -F "photo=@/ruta/a/imagen.jpg"
```

**Ejemplo de Cuerpo (JSON representativo):**
```json
{
  "userId": "65f8a9b2c3d4e5f6a7b8c9d0",
  "title": "Mi primera publicación",
  "category": "Tecnología",
  "content": "Este es el contenido de mi primera publicación sobre tecnología."
}
```

**Respuesta Exitosa (201):**
```json
{
  "success": true,
  "message": "Publicación creada",
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d2",
    "userId": "65f8a9b2c3d4e5f6a7b8c9d0",
    "title": "Mi primera publicación",
    "category": "Tecnología",
    "content": "Este es el contenido de mi primera publicación sobre tecnología.",
    "photo": "photos/publication_123.jpg",
    "isActive": true,
    "createAt": "2024-03-18T12:00:00.000Z"
  }
}
```

---

#### 4. PUT `/publications/:id`
Actualiza una publicación existente.

**Parámetros:**
- `id` (string): ID de MongoDB de la publicación

**Content-Type:** `multipart/form-data`

**Datos del Formulario (todos opcionales):**
- `title` (string): Nuevo título
- `category` (string): Nueva categoría
- `content` (string): Nuevo contenido
- `photo` (file): Nueva imagen

**Ejemplo de Solicitud (usando curl):**
```bash
curl -X PUT http://localhost:3001/kinalface/v1/publications/65f8a9b2c3d4e5f6a7b8c9d2 \
  -F "title=Título actualizado" \
  -F "content=Contenido actualizado de la publicación." \
  -F "photo=@/ruta/a/nueva_imagen.jpg"
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Publicación actualizada",
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d2",
    "userId": "65f8a9b2c3d4e5f6a7b8c9d0",
    "title": "Título actualizado",
    "category": "Tecnología",
    "content": "Contenido actualizado de la publicación.",
    "photo": "photos/publication_updated.jpg",
    "isActive": true,
    "createAt": "2024-03-18T12:00:00.000Z"
  }
}
```

---

#### 5. PUT `/publications/:id/activate`
Activa una publicación.

**Parámetros:**
- `id` (string): ID de MongoDB de la publicación

**Ejemplo de Solicitud:**
```bash
PUT http://localhost:3001/kinalface/v1/publications/65f8a9b2c3d4e5f6a7b8c9d2/activate
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Publicación activada",
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d2",
    "userId": "65f8a9b2c3d4e5f6a7b8c9d0",
    "title": "Mi primera publicación",
    "category": "Tecnología",
    "content": "Este es el contenido de mi primera publicación sobre tecnología.",
    "photo": "photos/publication_123.jpg",
    "isActive": true,
    "createAt": "2024-03-18T12:00:00.000Z"
  }
}
```

---

#### 6. PUT `/publications/:id/desactivate`
Desactiva una publicación.

**Parámetros:**
- `id` (string): ID de MongoDB de la publicación

**Ejemplo de Solicitud:**
```bash
PUT http://localhost:3001/kinalface/v1/publications/65f8a9b2c3d4e5f6a7b8c9d2/desactivate
```

**Respuesta Exitosa (200):**
```json
{
  "success": true,
  "message": "Publicación desactivada",
  "data": {
    "_id": "65f8a9b2c3d4e5f6a7b8c9d2",
    "userId": "65f8a9b2c3d4e5f6a7b8c9d0",
    "title": "Mi primera publicación",
    "category": "Tecnología",
    "content": "Este es el contenido de mi primera publicación sobre tecnología.",
    "photo": "photos/publication_123.jpg",
    "isActive": false,
    "createAt": "2024-03-18T12:00:00.000Z"
  }
}
```

---

## 📮 Colección de Postman

Para facilitar las pruebas de la API, puedes encontrar ejemplos de solicitudes en la carpeta `postman/` del repositorio. Incluye:

- Colección completa de todos los endpoints
- Ejemplos de requests con diferentes escenarios
- Variables de entorno pre-configuradas

### Cómo Importar la Colección:
1. Abre Postman
2. Click en "Import"
3. Selecciona el archivo `postman/GestorDeComentarios.postman_collection.json`
4. Importa también el archivo de variables de entorno `postman/GestorDeComentarios.postman_environment.json`

---

## 🔧 Scripts Disponibles

En el directorio `server-admin`, puedes ejecutar:

### `npm start`
Inicia el servidor en modo producción.

### `npm run dev`
Inicia el servidor en modo desarrollo con nodemon (reinicio automático al detectar cambios).

---

## 🐛 Solución de Problemas

### Error: "No se puede conectar a MongoDB"
- **Solución 1:** Verifica que MongoDB esté corriendo localmente (`mongod`)
- **Solución 2:** Verifica que tu URI de MongoDB Atlas sea correcta
- **Solución 3:** Verifica que tu IP esté en la lista blanca de MongoDB Atlas

### Error: "Credenciales de Cloudinary inválidas"
- Verifica que hayas configurado correctamente las variables de entorno de Cloudinary
- Asegúrate de que las credenciales sean correctas en tu Dashboard de Cloudinary

### Error: "El puerto ya está en uso"
- El puerto 3001 ya está siendo usado por otra aplicación
- Cambia el puerto en tu archivo `.env` a otro disponible (ej: 3002, 3003)

### Error al subir imágenes
- Verifica que estés enviando el archivo con el nombre de campo correcto: `photo`
- Verifica que el tipo de contenido sea `multipart/form-data`

---

## 🔒 Seguridad

- Las contraseñas deben tener al menos 6 caracteres
- Se utilizan headers de seguridad con Helmet
- CORS está configurado para controlar el acceso
- Rate limiting para prevenir abuso de la API
- Nunca compartas tu archivo `.env` ni tus credenciales

---

## 📝 Notas Importantes

1. **Variables de Entorno:** Siempre configura tu archivo `.env` antes de ejecutar el proyecto
2. **MongoDB:** Asegúrate de que MongoDB esté corriendo antes de iniciar el servidor
3. **Cloudinary:** Las imágenes se almacenan en Cloudinary, no localmente
4. **Puerto:** Por defecto el servidor corre en el puerto 3001, puedes cambiarlo en el archivo `.env`
5. **Base URL:** Todos los endpoints comienzan con `/kinalface/v1`

---

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir los cambios que te gustaría hacer.

---

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo `LICENSE` para más detalles.

---

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un issue en el repositorio de GitHub.

---

**¡Gracias por usar GestorDeComentarios - FaceKinal! 🚀**
