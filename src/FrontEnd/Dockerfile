# Usa la imagen base oficial de Ubuntu
FROM ubuntu:latest

# Evita preguntas al instalar paquetes
ENV DEBIAN_FRONTEND=noninteractive

# Instala Flutter SDK
RUN apt-get update && apt-get install -y curl git unzip xz-utils zip libglu1-mesa && \
    git clone https://github.com/flutter/flutter.git /usr/local/flutter

# Configura el PATH para Flutter y Dart
ENV PATH="/usr/local/flutter/bin:/usr/local/flutter/bin/cache/dart-sdk/bin:${PATH}"

# Ejecuta precache para descargar dependencias de Flutter y Dart SDK
RUN flutter doctor && flutter precache

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Configura el puerto (opcional, depende de cómo sirvas tu app de Flutter)
EXPOSE 8080

# Comando para correr la aplicación (ajustar según sea necesario)
CMD ["flutter", "run"]
