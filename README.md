# 📱 Gestor de Comentarios - FaceKinal

Sistema de gestión de comentarios similar a Facebook, que permite a los usuarios crear publicaciones, comentar y gestionar perfiles con autenticación y almacenamiento de imágenes en la nube.

## 📋 Tabla de Contenidos

- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución del Proyecto](#-ejecución-del-proyecto)
- [Modelos de Base de Datos](#-modelos-de-base-de-datos)
- [API Endpoints](#-api-endpoints)
- [Ejemplos de Uso](#-ejemplos-de-uso)

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express 5.2.1** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose 9.1.5** - ODM para MongoDB

### Seguridad y Autenticación
- **Argon2 0.44.0** - Encriptación de contraseñas
- **JWT (jsonwebtoken 9.0.3)** - Autenticación mediante tokens
- **Helmet 8.1.0** - Protección de cabeceras HTTP
- **CORS 2.8.6** - Control de acceso entre dominios
- **express-rate-limit 8.2.1** - Limitación de peticiones

### Almacenamiento y Validación
- **Cloudinary 2.9.0** - Almacenamiento de imágenes en la nube
- **Multer 2.0.2** - Manejo de archivos multipart
- **express-validator 7.3.1** - Validación de datos

### Utilidades
- **dotenv 17.2.3** - Variables de entorno
- **Morgan 1.10.1** - Logger de peticiones HTTP
- **UUID 13.0.0** - Generación de identificadores únicos
- **Axios 1.13.4** - Cliente HTTP

## 📁 Estructura del Proyecto

```
GestorDeComentarios/
├── server-admin/               # Aplicación principal del backend
│   ├── configs/               # Archivos de configuración
│   │   ├── app.js            # Configuración de Express
│   │   ├── cors-configuration.js
│   │   ├── db.js             # Conexión a MongoDB
│   │   └── helmet-configuration.js
│   │
│   ├── middlewares/          # Middlewares personalizados
│   │   ├── users-validation.js
│   │   ├── publications-validation.js
│   │   ├── comentaries-validation.js
│   │   ├── file-uploader.js  # Configuración de Cloudinary
│   │   └── check-validators.js
│   │
│   ├── src/                  # Código fuente
│   │   ├── users/           # Módulo de usuarios
│   │   │   ├── user.model.js
│   │   │   ├── user.controller.js
│   │   │   └── user.routes.js
│   │   │
│   │   ├── publications/    # Módulo de publicaciones
│   │   │   ├── publication.model.js
│   │   │   ├── publication.controller.js
│   │   │   └── publication.routes.js
│   │   │
│   │   └── comentaries/     # Módulo de comentarios
│   │       ├── comentarie.model.js
│   │       ├── comentarie.controller.js
│   │       └── comentarie.routes.js
│   │
│   ├── index.js             # Punto de entrada
│   └── package.json         # Dependencias del proyecto
│
├── postman/                 # Colección de Postman para pruebas
└── README.md               # Este archivo
```

## ✅ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **pnpm** (versión 10.28.1) - Gestor de paquetes
- **MongoDB** (local o cuenta en MongoDB Atlas)
- **Cuenta en Cloudinary** (para almacenamiento de imágenes)

### Instalación de pnpm

```bash
npm install -g pnpm@10.28.1
```

## 📦 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/SERV-DRV/GestorDeComentarios.git
cd GestorDeComentarios
```

### 2. Instalar Dependencias

```bash
cd server-admin
pnpm install
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del directorio `server-admin/` con las siguientes variables:

```env
# Configuración del Servidor
PORT=3001

# Conexión a Base de Datos
# Para MongoDB Local:
URI_MONGODB=mongodb://127.0.0.1:27017/FACEKINAL

# Para MongoDB Atlas:
# URI_MONGODB=mongodb+srv://usuario:contraseña@cluster.mongodb.net/FACEKINAL

# Configuración de Cloudinary
# Obtén estas credenciales desde tu Dashboard de Cloudinary (https://cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Carpetas de almacenamiento en Cloudinary (opcional)
CLOUDINARY_USERS_FOLDER=facekinal/user-logos
CLOUDINARY_PUBLICATIONS_FOLDER=facekinal/publications
```

### Obtener Credenciales de Cloudinary

1. Regístrate en [Cloudinary](https://cloudinary.com/)
2. Accede a tu [Dashboard](https://cloudinary.com/console)
3. Copia las credenciales:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### Configurar MongoDB

#### Opción 1: MongoDB Local

```bash
# Inicia el servicio de MongoDB
mongod
```

#### Opción 2: MongoDB Atlas (Nube)

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster
3. Configura un usuario de base de datos
4. Obtén la cadena de conexión
5. Reemplaza en el `.env` la variable `URI_MONGODB`

## 🏃 Ejecución del Proyecto

### Modo Desarrollo (con auto-recarga)

```bash
pnpm run dev
```

### Modo Producción

```bash
pnpm start
```

El servidor se iniciará en: `http://localhost:3001`

Base URL de la API: `http://localhost:3001/kinalface/v1`

## 📊 Modelos de Base de Datos

### User (Usuario)

| Campo | Tipo | Descripción | Validaciones |
|-------|------|-------------|--------------|
| username | String | Nombre de usuario único | Requerido, 3-30 caracteres, único |
| email | String | Correo electrónico | Requerido, formato email válido, único |
| photo | String | URL de foto de perfil | Default: "kinalface-default.png" |
| password | String | Contraseña encriptada | Requerido, mínimo 6 caracteres |
| isActive | Boolean | Estado del usuario | Default: true |
| createAt | Date | Fecha de creación | Default: Date.now |

### Publication (Publicación)

| Campo | Tipo | Descripción | Validaciones |
|-------|------|-------------|--------------|
| userId | ObjectId | ID del usuario autor | Requerido, referencia a User |
| title | String | Título de la publicación | Requerido, máximo 150 caracteres |
| category | String | Categoría | Requerido, máximo 50 caracteres |
| content | String | Contenido de la publicación | Requerido |
| photo | String | URL de imagen | Default: "photos/default_publication" |
| isActive | Boolean | Estado de la publicación | Default: true |
| createAt | Date | Fecha de creación | Default: Date.now |

### Comentarie (Comentario)

| Campo | Tipo | Descripción | Validaciones |
|-------|------|-------------|--------------|
| text | String | Texto del comentario | Requerido, máximo 500 caracteres |
| user | ObjectId | ID del usuario autor | Requerido, referencia a User |
| publication | ObjectId | ID de la publicación | Requerido, referencia a Publication |
| isActive | Boolean | Estado del comentario | Default: true |
| createdAt | Date | Fecha de creación | Default: Date.now |

## 🌐 API Endpoints

Base URL: `http://localhost:3001/kinalface/v1`

### 👤 Users (Usuarios)

#### Obtener todos los usuarios
```http
GET /users
```

**Query Params (opcional):**
- `isActive`: `true` | `false`

**Response:**
```json
{
  "succes": true,
  "total": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "username": "juan_perez",
      "email": "juan@example.com",
      "photo": "photos/juan-1a2b3c4d.jpg",
      "isActive": true,
      "createAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### Obtener usuario por ID
```http
GET /users/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "juan_perez",
    "email": "juan@example.com",
    "photo": "photos/juan-1a2b3c4d.jpg",
    "isActive": true,
    "createAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### Crear usuario
```http
POST /users
Content-Type: multipart/form-data
```

**Body (form-data):**
```
username: maria_lopez
email: maria@example.com
password: password123
photo: [archivo de imagen]
```

**Response:**
```json
{
  "succes": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "username": "maria_lopez",
    "email": "maria@example.com",
    "photo": "photos/maria-9x8y7z6w.jpg",
    "isActive": true,
    "createAt": "2024-01-16T14:20:00.000Z"
  }
}
```

---

#### Login de usuario
```http
POST /users/login
Content-Type: application/json
```

**Body:**
```json
{
  "login": "juan_perez",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "juan_perez",
    "email": "juan@example.com",
    "photo": "photos/juan-1a2b3c4d.jpg",
    "isActive": true
  }
}
```

---

#### Actualizar usuario
```http
PUT /users/:id
Content-Type: multipart/form-data
```

**Body (form-data):**
```
username: juan_perez_updated
email: juan_new@example.com
photo: [nuevo archivo de imagen] (opcional)
passwordActual: password123 (si se cambia contraseña)
passwordNueva: newPassword456 (si se cambia contraseña)
```

**Response:**
```json
{
  "success": true,
  "message": "Usuario actualizado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "juan_perez_updated",
    "email": "juan_new@example.com",
    "photo": "photos/juan-new-5f6g7h8i.jpg"
  }
}
```

---

#### Activar usuario
```http
PUT /users/:id/activate
```

**Response:**
```json
{
  "success": true,
  "message": "Usuario activado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "isActive": true
  }
}
```

---

#### Desactivar usuario
```http
PUT /users/:id/desactivate
```

**Response:**
```json
{
  "success": true,
  "message": "Usuario desactivado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "isActive": false
  }
}
```

---

### 📝 Publications (Publicaciones)

#### Obtener todas las publicaciones
```http
GET /publications
```

**Query Params (opcional):**
- `isActive`: `true` | `false`

**Response:**
```json
{
  "succes": true,
  "total": 3,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "userId": "507f1f77bcf86cd799439011",
      "title": "Mi primera publicación",
      "category": "Tecnología",
      "content": "Este es el contenido de mi publicación sobre tecnología...",
      "photo": "photos/publicacion-a1b2c3d4.jpg",
      "isActive": true,
      "createAt": "2024-01-17T09:15:00.000Z"
    }
  ]
}
```

---

#### Obtener publicación por ID
```http
GET /publications/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Mi primera publicación",
    "category": "Tecnología",
    "content": "Este es el contenido de mi publicación sobre tecnología...",
    "photo": "photos/publicacion-a1b2c3d4.jpg",
    "isActive": true,
    "createAt": "2024-01-17T09:15:00.000Z"
  }
}
```

---

#### Crear publicación
```http
POST /publications
Content-Type: multipart/form-data
```

**Body (form-data):**
```
userId: 507f1f77bcf86cd799439011
title: Nueva publicación sobre IA
category: Inteligencia Artificial
content: La inteligencia artificial está transformando el mundo...
photo: [archivo de imagen]
```

**Response:**
```json
{
  "succes": true,
  "message": "Publicación creada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "userId": "507f1f77bcf86cd799439011",
    "title": "Nueva publicación sobre IA",
    "category": "Inteligencia Artificial",
    "content": "La inteligencia artificial está transformando el mundo...",
    "photo": "photos/ia-post-e5f6g7h8.jpg",
    "isActive": true,
    "createAt": "2024-01-18T11:00:00.000Z"
  }
}
```

---

#### Actualizar publicación
```http
PUT /publications/:id
Content-Type: multipart/form-data
```

**Body (form-data):**
```
title: Título actualizado
category: Nueva categoría
content: Contenido actualizado...
photo: [nuevo archivo de imagen] (opcional)
```

**Response:**
```json
{
  "success": true,
  "message": "Publicación actualizada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "Título actualizado",
    "category": "Nueva categoría",
    "content": "Contenido actualizado..."
  }
}
```

---

#### Activar publicación
```http
PUT /publications/:id/activate
```

**Response:**
```json
{
  "success": true,
  "message": "Publicación activada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "isActive": true
  }
}
```

---

#### Desactivar publicación
```http
PUT /publications/:id/desactivate
```

**Response:**
```json
{
  "success": true,
  "message": "Publicación desactivada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439014",
    "isActive": false
  }
}
```

---

### 💬 Comentaries (Comentarios)

#### Obtener comentarios de una publicación
```http
GET /comentaries/:idPublication
```

**Response:**
```json
{
  "succes": true,
  "total": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439015",
      "text": "¡Excelente publicación! Me gustó mucho.",
      "user": {
        "_id": "507f1f77bcf86cd799439012",
        "username": "maria_lopez",
        "photo": "photos/maria-9x8y7z6w.jpg"
      },
      "publication": "507f1f77bcf86cd799439013",
      "isActive": true,
      "createdAt": "2024-01-17T10:30:00.000Z"
    }
  ]
}
```

---

#### Obtener comentario por ID
```http
GET /comentaries/find/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439015",
    "text": "¡Excelente publicación! Me gustó mucho.",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "username": "maria_lopez",
      "photo": "photos/maria-9x8y7z6w.jpg"
    },
    "publication": "507f1f77bcf86cd799439013",
    "isActive": true,
    "createdAt": "2024-01-17T10:30:00.000Z"
  }
}
```

---

#### Crear comentario
```http
POST /comentaries
Content-Type: application/json
```

**Body:**
```json
{
  "text": "Este comentario es muy interesante, gracias por compartir.",
  "user": "507f1f77bcf86cd799439011",
  "publication": "507f1f77bcf86cd799439013"
}
```

**Response:**
```json
{
  "succes": true,
  "message": "Comentarie creado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "text": "Este comentario es muy interesante, gracias por compartir.",
    "user": "507f1f77bcf86cd799439011",
    "publication": "507f1f77bcf86cd799439013",
    "isActive": true,
    "createdAt": "2024-01-18T14:45:00.000Z"
  }
}
```

---

#### Actualizar comentario
```http
PUT /comentaries/:id
Content-Type: application/json
```

**Body:**
```json
{
  "text": "Texto del comentario actualizado",
  "user": "507f1f77bcf86cd799439011"
}
```

**Nota:** Solo el autor del comentario puede actualizarlo.

**Response:**
```json
{
  "success": true,
  "message": "Comentarie actualizado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "text": "Texto del comentario actualizado",
    "user": "507f1f77bcf86cd799439011",
    "publication": "507f1f77bcf86cd799439013"
  }
}
```

---

#### Activar comentario
```http
PUT /comentaries/:id/activate
Content-Type: application/json
```

**Body:**
```json
{
  "user": "507f1f77bcf86cd799439011"
}
```

**Nota:** Solo el autor del comentario puede activarlo.

**Response:**
```json
{
  "success": true,
  "message": "Comentarie activado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "isActive": true
  }
}
```

---

#### Desactivar comentario
```http
PUT /comentaries/:id/desactivate
Content-Type: application/json
```

**Body:**
```json
{
  "user": "507f1f77bcf86cd799439011"
}
```

**Nota:** Solo el autor del comentario puede desactivarlo.

**Response:**
```json
{
  "success": true,
  "message": "Comentarie desactivado exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439016",
    "isActive": false
  }
}
```

---

### 🏥 Health Check

#### Verificar estado del servicio
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-18T15:00:00.000Z"
}
```

---

## 📝 Ejemplos de Uso

### Ejemplo con cURL

#### Crear un usuario
```bash
curl -X POST http://localhost:3001/kinalface/v1/users \
  -F "username=carlos_ruiz" \
  -F "email=carlos@example.com" \
  -F "password=miPassword123" \
  -F "photo=@/ruta/a/tu/imagen.jpg"
```

#### Login
```bash
curl -X POST http://localhost:3001/kinalface/v1/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "login": "carlos_ruiz",
    "password": "miPassword123"
  }'
```

#### Crear una publicación
```bash
curl -X POST http://localhost:3001/kinalface/v1/publications \
  -F "userId=507f1f77bcf86cd799439011" \
  -F "title=Mi primera publicación" \
  -F "category=Tecnología" \
  -F "content=Este es el contenido de mi publicación" \
  -F "photo=@/ruta/a/imagen-publicacion.jpg"
```

#### Crear un comentario
```bash
curl -X POST http://localhost:3001/kinalface/v1/comentaries \
  -H "Content-Type: application/json" \
  -d '{
    "text": "¡Excelente publicación!",
    "user": "507f1f77bcf86cd799439011",
    "publication": "507f1f77bcf86cd799439013"
  }'
```

### Ejemplo con Postman

1. Importa la colección que se encuentra en la carpeta `postman/`
2. Configura las variables de entorno:
   - `baseUrl`: `http://localhost:3001/kinalface/v1`
3. Ejecuta las peticiones en el siguiente orden:
   - Crear usuario
   - Login
   - Crear publicación
   - Crear comentario

---

## 🔒 Seguridad

El proyecto implementa las siguientes medidas de seguridad:

- ✅ **Argon2** para encriptación de contraseñas
- ✅ **JWT** para autenticación basada en tokens
- ✅ **Helmet** para protección de cabeceras HTTP
- ✅ **CORS** configurado para peticiones cross-origin
- ✅ **Rate Limiting** para prevenir ataques de fuerza bruta
- ✅ **Validación de datos** con express-validator
- ✅ **Validación de tipos de archivo** para uploads

---

## 🐛 Troubleshooting

### Error de conexión a MongoDB

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solución:** Verifica que MongoDB esté ejecutándose:
```bash
mongod
```

### Error de Cloudinary

```
Error: Must supply api_key
```

**Solución:** Asegúrate de que las variables de Cloudinary estén correctamente configuradas en el archivo `.env`

### Error al subir imágenes

```
Error: File too large
```

**Solución:** El tamaño máximo permitido es 10MB. Comprime la imagen antes de subirla.

---

## 📄 Licencia

ISC

---

## 👥 Autor

SERV-DRV

---

## 📞 Soporte

Para reportar problemas o sugerencias, por favor abre un issue en el repositorio de GitHub.

---

**¡Gracias por usar Gestor de Comentarios - FaceKinal! 🚀**
