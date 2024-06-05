# Establece la imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Instala nodemon globalmente
RUN npm install -g nodemon

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que correrá la aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD ["nodemon", "index.js"]
