# Establecer la imagen base de Node.js
FROM node:16

# Crear directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar los archivos de dependencia
COPY package*.json ./

# Instalar todas las dependencias, incluidas las de desarrollo
RUN npm install

# Copiar el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Exponer el puerto que utiliza tu aplicación
EXPOSE 3000

# Comando para ejecutar la aplicación usando nodemon
CMD ["npm", "run", "start"]
