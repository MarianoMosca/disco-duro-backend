# Mi-repositorio

Este proyecto se crea con el objetivo de emular una aplicación similar a Dropbox, Google Drive, etc. En definitiva, lo que vendría a ser un almacenamiento en la nube.

Instalar:
• Crear una base de datos vacía en una instancia de MySQL local.
• Guardar el archivo ".env.example" como ".env" y cubrir los datos necesarios.
• Ejecutar el comando "npm install" o "npm i" para instalar las dependencias.
• Ejecutar "node db/initDB.js" para crear las tablas necesarias en la base de datos anteriormente creada.
• Ejecutar "npm run dev" o "npm start" para lanzar el servidor.

    Base de datos:

• users: id, name, email, password, avatar, createdAt.
• folders: id, idUsers, name, createdAt.
• files: id, idUsers, idFolders, name, createdAt, modifiedAt.

    Endpoints:
    Usuarios:

• POST [/users]: Registro de usuario. (Juan)
• POST[/users/login] : Login de usuario. (Mariano)
• GET [/users]: Devuelve información del usuario. (Juan)
• PUT[/users] : Editar nombre de usuario o email. (Juanpe)
• PUT [/users/avatar]: Editar el avatar del usuario. (Mariano)

Folders:
• POST [/folders]: Añade un carpeta. (Kevin)
• GET [/folders]: Lista todos las carpetas. (Kevin)
• DELETE [/folders]: Borra el espacio. (Kevin)

Files:

• GET [/files]: Lista todos los archivos. (Mariano)
• GET [/files/: idFiles]: Devuelve un fichero. (Juan)
• POST [/files]: Añade un archivo. (Juanpe)
• DELETE [/files/: idFiles]: Elimina un archivo del espacio. (Juanpe)
