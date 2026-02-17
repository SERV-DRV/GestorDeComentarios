# 📮 Ejemplos de Postman para GestorDeComentarios

Esta carpeta contiene la colección de Postman con todos los endpoints de la API de FaceKinal.

## 📁 Archivos Incluidos

- **GestorDeComentarios.postman_collection.json** - Colección completa con todos los endpoints
- **GestorDeComentarios.postman_environment.json** - Variables de entorno para la colección

## 🚀 Cómo Usar

### 1. Importar la Colección en Postman

1. Abre Postman
2. Click en el botón "Import" en la esquina superior izquierda
3. Arrastra el archivo `GestorDeComentarios.postman_collection.json` o selecciónalo manualmente
4. La colección aparecerá en tu barra lateral

### 2. Importar el Ambiente (Environment)

1. En Postman, ve a la pestaña "Environments"
2. Click en "Import"
3. Selecciona el archivo `GestorDeComentarios.postman_environment.json`
4. Selecciona el ambiente "GestorDeComentarios Environment" en el selector de ambientes (esquina superior derecha)

### 3. Configurar Variables

Las siguientes variables están disponibles:

- **baseUrl**: `http://localhost:3001/kinalface/v1` - La URL base de tu API
- **userId**: Almacena el ID de un usuario para reutilizarlo en las peticiones
- **publicationId**: Almacena el ID de una publicación para reutilizarlo en las peticiones

**Nota:** Después de crear un usuario o publicación, copia su ID de la respuesta y pégalo en las variables de entorno para usarlo en otras peticiones.

## 📋 Colección de Endpoints

### Verificación de Estado (Health Check)
- **Get Health Status** - Verifica que el servidor esté corriendo

### Usuarios (Users)
- **Get All Users** - Obtiene todos los usuarios
- **Get Active Users** - Obtiene solo usuarios activos
- **Get User By ID** - Obtiene un usuario específico
- **Login User** - Inicia sesión
- **Create User** - Crea un nuevo usuario (con foto opcional)
- **Update User** - Actualiza información del usuario
- **Update User Password** - Cambia la contraseña del usuario
- **Activate User** - Activa un usuario
- **Deactivate User** - Desactiva un usuario

### Publicaciones (Publications)
- **Get All Publications** - Obtiene todas las publicaciones
- **Get Active Publications** - Obtiene solo publicaciones activas
- **Get Publication By ID** - Obtiene una publicación específica
- **Create Publication** - Crea una nueva publicación (con foto opcional)
- **Update Publication** - Actualiza una publicación
- **Activate Publication** - Activa una publicación
- **Deactivate Publication** - Desactiva una publicación

## 💡 Ejemplos de Uso

### Flujo de Trabajo Típico

1. **Verificar el servidor**
   - Ejecuta "Get Health Status" para confirmar que el servidor está corriendo

2. **Crear un usuario**
   - Ejecuta "Create User" con los datos necesarios
   - Copia el `_id` del usuario de la respuesta
   - Pega el ID en la variable de entorno `userId`

3. **Iniciar sesión**
   - Ejecuta "Login User" con el username/email y contraseña

4. **Crear una publicación**
   - Ejecuta "Create Publication"
   - Asegúrate de que el campo `userId` tenga el ID del usuario creado
   - Copia el `_id` de la publicación
   - Pega el ID en la variable de entorno `publicationId`

5. **Consultar datos**
   - Ejecuta "Get All Publications" para ver todas las publicaciones
   - Ejecuta "Get Publication By ID" para ver una publicación específica

### Subir Archivos (Fotos)

Para endpoints que permiten subir fotos:

1. En el Body de la petición, busca el campo `photo`
2. Está marcado como `disabled` por defecto
3. Habilita el campo quitando el check de "disabled"
4. Click en "Select Files" y selecciona una imagen de tu computadora
5. Envía la petición

## 🔧 Personalización

Puedes modificar las variables de entorno según tu configuración:

- Si tu servidor corre en un puerto diferente, actualiza `baseUrl`
- Si usas un deployment remoto, actualiza `baseUrl` con la URL del servidor

## 📝 Notas

- Todos los endpoints que crean o actualizan usuarios/publicaciones con fotos usan `multipart/form-data`
- Los endpoints de login y algunos GET usan `application/json`
- Los IDs en las variables son ejemplos, debes reemplazarlos con IDs reales de tu base de datos
- Algunos campos como `photo` son opcionales

## 🐛 Solución de Problemas

### Error: "No se pudo obtener respuesta"
- Verifica que el servidor esté corriendo en `http://localhost:3001`
- Verifica que MongoDB esté conectado

### Error: "ID no válido"
- Asegúrate de usar IDs válidos de MongoDB (24 caracteres hexadecimales)
- Actualiza las variables `userId` y `publicationId` con IDs existentes en tu base de datos

### Error al subir archivos
- Asegúrate de habilitar el campo `photo` en el formulario
- Verifica que el archivo sea una imagen válida
- Confirma que tus credenciales de Cloudinary estén configuradas correctamente en el `.env`

---

**¡Feliz testing! 🚀**
