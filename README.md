# 📝 GestorDeComentarios - FaceKinal

Sistema de gestión de opiniones similar a las publicaciones de Facebook, con funcionalidades específicas centradas en la interacción y expresión de opiniones por parte de los usuarios.

## 🚀 Tecnologías Utilizadas

### Backend
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js v5** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

### Seguridad y Validación
- **Helmet** - Seguridad HTTP headers
- **CORS** - Control de acceso entre dominios
- **Express Validator** - Validación de datos
- **Express Rate Limit** - Limitación de peticiones
- **Argon2** - Hash de contraseñas

### Almacenamiento y Multimedia
- **Cloudinary** - Servicio de almacenamiento de imágenes
- **Multer** - Manejo de archivos multipart/form-data
- **Multer Storage Cloudinary** - Integración Multer con Cloudinary

### Utilidades
- **dotenv** - Manejo de variables de entorno
- **Morgan** - Logger de peticiones HTTP
- **JWT (jsonwebtoken)** - Autenticación con tokens
- **UUID** - Generación de identificadores únicos
- **Axios** - Cliente HTTP

### Herramientas de Desarrollo
- **Nodemon** - Reinicio automático del servidor
- **pnpm** - Gestor de paquetes rápido

## 📁 Estructura del Proyecto

```
GestorDeComentarios/
│
├── server-admin/
│   ├── configs/
│   │   ├── app.js                    # Configuración principal de Express
│   │   ├── db.js                     # Conexión a MongoDB
│   │   ├── cors-configuration.js     # Configuración CORS
│   │   └── helmet-configuration.js   # Configuración Helmet
│   │
│   ├── middlewares/
│   │   ├── check-validators.js       # Validación de errores
│   │   ├── file-uploader.js          # Configuración de Cloudinary/Multer
│   │   ├── publications-validation.js # Validaciones de publicaciones
│   │   └── users-validation.js       # Validaciones de usuarios
│   │
│   ├── src/
│   │   ├── users/
│   │   │   ├── user.model.js         # Modelo de Usuario
│   │   │   ├── user.controller.js    # Controladores de Usuario
│   │   │   └── user.routes.js        # Rutas de Usuario
│   │   │
│   │   └── publications/
│   │       ├── publication.model.js   # Modelo de Publicación
│   │       ├── publication.controller.js # Controladores de Publicación
│   │       └── publication.routes.js  # Rutas de Publicación
│   │
│   ├── index.js                       # Punto de entrada del servidor
│   ├── package.json                   # Dependencias y scripts
│   └── pnpm-lock.yaml                 # Lock file de pnpm
│
├── .env.example                       # Ejemplo de variables de entorno
├── .gitignore                         # Archivos ignorados por Git
├── LICENSE                            # Licencia del proyecto
└── README.md                          # Este archivo

```

## ⚙️ Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior) - [Descargar Node.js](https://nodejs.org/)
- **pnpm** (gestor de paquetes) - Instalar con: `npm install -g pnpm`
- **MongoDB** (Local o cuenta en MongoDB Atlas)
  - Local: [Descargar MongoDB Community](https://www.mongodb.com/try/download/community)
  - Atlas: [Crear cuenta gratuita](https://www.mongodb.com/cloud/atlas/register)
- **Cuenta en Cloudinary** (para almacenamiento de imágenes) - [Registrarse](https://cloudinary.com/users/register/free)

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone https://github.com/SERV-DRV/GestorDeComentarios.git
cd GestorDeComentarios
```

### 2. Navegar al directorio del servidor

```bash
cd server-admin
```

### 3. Instalar Dependencias

```bash
pnpm install
```

> **Nota:** Si prefieres usar npm, ejecuta `npm install` en su lugar.

### 4. Configurar Variables de Entorno

Crea un archivo `.env` en el directorio `server-admin/` basándote en `.env.example`:

```bash
# Desde la raíz del proyecto
cp .env.example server-admin/.env
```

Edita el archivo `.env` con tus credenciales:

```env
# Configuración del Servidor
PORT=3001

# Conexión a Base de Datos
URI_MONGODB=mongodb://127.0.0.1:27017/FACEKINAL

# Cloudinary (obtenlas de: https://console.cloudinary.com/console)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
```

#### Obtener credenciales de Cloudinary:
1. Inicia sesión en [Cloudinary](https://cloudinary.com/)
2. Ve a tu Dashboard
3. Copia los valores de **Cloud name**, **API Key** y **API Secret**

### 5. Iniciar MongoDB

#### MongoDB Local:
```bash
# Windows
mongod

# Linux/Mac
sudo systemctl start mongod
# o
sudo service mongodb start
```

#### MongoDB Atlas:
Si usas MongoDB Atlas, asegúrate de:
1. Tener tu cluster creado
2. Configurar el acceso a la red (IP Whitelist)
3. Copiar la URI de conexión en tu archivo `.env`

### 6. Iniciar el Servidor

#### Modo Desarrollo (con auto-reinicio):
```bash
pnpm run dev
```

#### Modo Producción:
```bash
pnpm start
```

El servidor estará corriendo en: `http://localhost:3001`

### 7. Verificar que el servidor está funcionando

Accede a: `http://localhost:3001/kinalface/v1/health`

Deberías ver:
```json
{
  "status": "ok",
  "service": "FaceKinal Admin",
  "version": "1.0.0"
}
```

## 📚 API Endpoints

Base URL: `http://localhost:3001/kinalface/v1`

### 👤 Usuarios

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/users` | Obtener todos los usuarios | No |
| GET | `/users/:id` | Obtener usuario por ID | No |
| POST | `/users` | Crear nuevo usuario | No |
| POST | `/users/login` | Iniciar sesión | No |
| PUT | `/users/:id` | Actualizar usuario | No |
| PUT | `/users/:id/activate` | Activar usuario | No |
| PUT | `/users/:id/desactivate` | Desactivar usuario | No |

#### Ejemplos de Peticiones - Usuarios

##### 1. Obtener todos los usuarios
```http
GET /kinalface/v1/users
```

**Query Parameters (opcionales):**
- `isActive=true` - Filtrar usuarios activos
- `isActive=false` - Filtrar usuarios inactivos

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "_id": "65f8a1b2c3d4e5f6g7h8i9j0",
      "username": "juan_perez",
      "email": "juan@example.com",
      "photo": "photos/user123.jpg",
      "isActive": true,
      "createAt": "2024-03-15T10:30:00.000Z"
    }
  ]
}
```

##### 2. Obtener usuario por ID
```http
GET /kinalface/v1/users/65f8a1b2c3d4e5f6g7h8i9j0
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j0",
    "username": "juan_perez",
    "email": "juan@example.com",
    "photo": "photos/user123.jpg",
    "isActive": true,
    "createAt": "2024-03-15T10:30:00.000Z"
  }
}
```

##### 3. Crear nuevo usuario
```http
POST /kinalface/v1/users
Content-Type: multipart/form-data
```

**Body (form-data):**
```
username: maria_garcia
email: maria@example.com
password: miPassword123
photo: [archivo de imagen] (opcional)
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j1",
    "username": "maria_garcia",
    "email": "maria@example.com",
    "photo": "photos/user456.jpg",
    "isActive": true,
    "createAt": "2024-03-15T11:00:00.000Z"
  }
}
```

##### 4. Login de usuario
```http
POST /kinalface/v1/users/login
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "login": "juan_perez",
  "password": "miPassword123"
}
```

> **Nota:** El campo `login` puede ser el username o el email.

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j0",
    "username": "juan_perez",
    "email": "juan@example.com",
    "photo": "photos/user123.jpg",
    "isActive": true,
    "createAt": "2024-03-15T10:30:00.000Z"
  }
}
```

##### 5. Actualizar usuario
```http
PUT /kinalface/v1/users/65f8a1b2c3d4e5f6g7h8i9j0
Content-Type: multipart/form-data
```

**Body (form-data):**
```
username: juan_perez_updated
email: juan.nuevo@example.com
photo: [archivo de imagen] (opcional)
passwordActual: miPassword123 (si quieres cambiar contraseña)
passwordNueva: nuevaPassword456 (si quieres cambiar contraseña)
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario actualizado exitosamente",
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j0",
    "username": "juan_perez_updated",
    "email": "juan.nuevo@example.com",
    "photo": "photos/user789.jpg",
    "isActive": true,
    "createAt": "2024-03-15T10:30:00.000Z"
  }
}
```

##### 6. Activar usuario
```http
PUT /kinalface/v1/users/65f8a1b2c3d4e5f6g7h8i9j0/activate
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario activado exitosamente",
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j0",
    "username": "juan_perez",
    "email": "juan@example.com",
    "isActive": true
  }
}
```

##### 7. Desactivar usuario
```http
PUT /kinalface/v1/users/65f8a1b2c3d4e5f6g7h8i9j0/desactivate
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Usuario desactivado exitosamente",
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j0",
    "username": "juan_perez",
    "email": "juan@example.com",
    "isActive": false
  }
}
```

---

### 📄 Publicaciones

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/publications` | Obtener todas las publicaciones | No |
| GET | `/publications/:id` | Obtener publicación por ID | No |
| POST | `/publications` | Crear nueva publicación | No |
| PUT | `/publications/:id` | Actualizar publicación | No |
| PUT | `/publications/:id/activate` | Activar publicación | No |
| PUT | `/publications/:id/desactivate` | Desactivar publicación | No |

#### Ejemplos de Peticiones - Publicaciones

##### 1. Obtener todas las publicaciones
```http
GET /kinalface/v1/publications
```

**Query Parameters (opcionales):**
- `isActive=true` - Filtrar publicaciones activas
- `isActive=false` - Filtrar publicaciones inactivas

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "total": 3,
  "data": [
    {
      "_id": "65f8a1b2c3d4e5f6g7h8i9j2",
      "userId": "65f8a1b2c3d4e5f6g7h8i9j0",
      "title": "Mi primera publicación en FaceKinal",
      "category": "Tecnología",
      "content": "¡Hola a todos! Esta es mi primera publicación en esta increíble plataforma.",
      "photo": "photos/pub123.jpg",
      "isActive": true,
      "createAt": "2024-03-15T12:00:00.000Z"
    }
  ]
}
```

##### 2. Obtener publicación por ID
```http
GET /kinalface/v1/publications/65f8a1b2c3d4e5f6g7h8i9j2
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j2",
    "userId": "65f8a1b2c3d4e5f6g7h8i9j0",
    "title": "Mi primera publicación en FaceKinal",
    "category": "Tecnología",
    "content": "¡Hola a todos! Esta es mi primera publicación en esta increíble plataforma.",
    "photo": "photos/pub123.jpg",
    "isActive": true,
    "createAt": "2024-03-15T12:00:00.000Z"
  }
}
```

##### 3. Crear nueva publicación
```http
POST /kinalface/v1/publications
Content-Type: multipart/form-data
```

**Body (form-data):**
```
userId: 65f8a1b2c3d4e5f6g7h8i9j0
title: Aprendiendo Node.js
category: Educación
content: Hoy estoy aprendiendo Node.js y Express. ¡Es muy interesante!
photo: [archivo de imagen] (opcional)
```

**Respuesta exitosa (201):**
```json
{
  "success": true,
  "message": "Publicación creada",
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j3",
    "userId": "65f8a1b2c3d4e5f6g7h8i9j0",
    "title": "Aprendiendo Node.js",
    "category": "Educación",
    "content": "Hoy estoy aprendiendo Node.js y Express. ¡Es muy interesante!",
    "photo": "photos/pub456.jpg",
    "isActive": true,
    "createAt": "2024-03-15T13:00:00.000Z"
  }
}
```

##### 4. Actualizar publicación
```http
PUT /kinalface/v1/publications/65f8a1b2c3d4e5f6g7h8i9j3
Content-Type: multipart/form-data
```

**Body (form-data):**
```
title: Aprendiendo Node.js y Express
category: Educación
content: Hoy estoy aprendiendo Node.js, Express y MongoDB. ¡Es muy interesante y útil!
photo: [archivo de imagen] (opcional)
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Publicación actualizada",
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j3",
    "userId": "65f8a1b2c3d4e5f6g7h8i9j0",
    "title": "Aprendiendo Node.js y Express",
    "category": "Educación",
    "content": "Hoy estoy aprendiendo Node.js, Express y MongoDB. ¡Es muy interesante y útil!",
    "photo": "photos/pub789.jpg",
    "isActive": true,
    "createAt": "2024-03-15T13:00:00.000Z"
  }
}
```

##### 5. Activar publicación
```http
PUT /kinalface/v1/publications/65f8a1b2c3d4e5f6g7h8i9j3/activate
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Publicación activada",
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j3",
    "userId": "65f8a1b2c3d4e5f6g7h8i9j0",
    "title": "Aprendiendo Node.js y Express",
    "isActive": true
  }
}
```

##### 6. Desactivar publicación
```http
PUT /kinalface/v1/publications/65f8a1b2c3d4e5f6g7h8i9j3/desactivate
```

**Respuesta exitosa (200):**
```json
{
  "success": true,
  "message": "Publicación desactivada",
  "data": {
    "_id": "65f8a1b2c3d4e5f6g7h8i9j3",
    "userId": "65f8a1b2c3d4e5f6g7h8i9j0",
    "title": "Aprendiendo Node.js y Express",
    "isActive": false
  }
}
```

---

## 🔍 Modelos de Datos

### Usuario (User)
```javascript
{
  username: String,      // 3-30 caracteres, único
  email: String,         // Formato email válido, único
  photo: String,         // URL de la foto (Cloudinary)
  password: String,      // Mínimo 6 caracteres (hasheado)
  isActive: Boolean,     // Estado del usuario (default: true)
  createAt: Date         // Fecha de creación
}
```

### Publicación (Publication)
```javascript
{
  userId: ObjectId,      // Referencia al usuario creador
  title: String,         // Máximo 150 caracteres
  category: String,      // Máximo 50 caracteres
  content: String,       // Contenido de la publicación
  photo: String,         // URL de la foto (Cloudinary)
  isActive: Boolean,     // Estado de la publicación (default: true)
  createAt: Date         // Fecha de creación
}
```

## ❌ Manejo de Errores

Todas las respuestas de error siguen el siguiente formato:

```json
{
  "success": false,
  "message": "Descripción del error",
  "error": "Detalle técnico del error"
}
```

### Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200 | OK - Petición exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos inválidos o faltantes |
| 401 | Unauthorized - Credenciales incorrectas |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias
pnpm install

# Iniciar en modo desarrollo
pnpm run dev

# Iniciar en modo producción
pnpm start

# Ejecutar tests (cuando estén disponibles)
pnpm test
```

## 🐛 Solución de Problemas

### Error: Cannot connect to MongoDB
- Verifica que MongoDB esté corriendo
- Verifica que la URI en `.env` sea correcta
- Si usas MongoDB local, asegúrate de que el servicio esté activo

### Error: Cloudinary credentials invalid
- Verifica tus credenciales en el Dashboard de Cloudinary
- Asegúrate de copiar correctamente el Cloud Name, API Key y API Secret
- Verifica que no haya espacios antes o después de las credenciales

### Error: Port already in use
- El puerto 3001 ya está en uso
- Cambia el puerto en el archivo `.env`
- O cierra el proceso que está usando el puerto 3001

## 📝 Notas Adicionales

- Las contraseñas se almacenan en texto plano actualmente (se recomienda implementar hashing con Argon2)
- Las imágenes se suben automáticamente a Cloudinary
- Si no se proporciona una imagen, se usa una imagen por defecto
- Los usuarios y publicaciones pueden ser activados/desactivados sin eliminarlos

## 📄 Licencia

Este proyecto está bajo la licencia especificada en el archivo [LICENSE](LICENSE).

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerencias o mejoras.

---

**Desarrollado con ❤️ para FaceKinal**
