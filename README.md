# 🌍 Navi Explore
Bienvenido a Navi Explore, una aplicación diseñada para enriquecer la experiencia turística en ciudades con alto flujo de visitantes y residentes. Este proyecto ofrece una plataforma móvil y web unificada que consolida información sobre eventos locales, atracciones, alojamiento, transporte y servicios

![image](https://github.com/YeffersonSilva/ConnectedTourism/assets/117882117/95d6df14-6e8e-4803-afcb-463c35c0d6cd)
![image](https://github.com/YeffersonSilva/ConnectedTourism/assets/117882117/9bb3a552-04d6-4334-b975-a48c66bd95b8)


## 📍 Índice

- [Instalação](#instalação)
- [Uso](#uso)
- [Recursos](#recursos)
- [Dependências](#dependências)
- [Configurações](#configurações)
- [Exemplos](#exemplos)
- [Solução de Problemas](#solução-de-problemas)
- [Colaboradores](#colaboradores)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

##  Instalação

Para utilizar o Clima Tempo localmente, siga estes passos:

1. Clone este repositório:
   ```bash
   git clone https://github.com/YeffersonSilva/ConnectedTourism.git

 
  2. Instale as dependências utilizando o Node.js:
  ```bash
  cd ConnectedTourism/sever
npm install
  ```
  3. Instala las dependencias del frontend (React):
  ```bash
  cd ../client
  npm install
  ```



## 🕹️ Uso
-Para ejecutar el backend:

   ```bash
cd sever
npm start
  ```
Para ejecutar el frontend (web):

   ```bash
cd client
npm start
  ```
Sigue las instrucciones en pantalla para visualizar la aplicación en tu navegador o dispositivo móvil.



## 🔓 Dependências

Este proyecto utiliza las siguientes tecnologías y librerías:


- *Express: Framework web para Node.js.
- *React para el frontend web.
- *React Native para el desarrollo móvil.
- MongoDB como sistema de base de datos (opcionalmente, puedes describir aquí si usas una base de datos).



## ✅ Exemplos
![image](https://github.com/YeffersonSilva/ConnectedTourism/assets/117882117/f67faf40-713b-41ba-ac69-5d83b743c479)
![image](https://github.com/YeffersonSilva/ConnectedTourism/assets/117882117/7b898c1b-b544-4e1f-a172-434b86704d3f)


## 🛠 Tecnologias Utilizadas
 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Configuración del Entorno

Antes de iniciar el proyecto, debes configurar las variables de entorno necesarias:

1. Copia el archivo `.env.example` en la raíz del proyecto y renómbralo a `.env`:
env.example
2. Edita el archivo `.env` añadiendo tus valores específicos para las siguientes variables:

```plaintext
PORT=4000
DB_HOST=localhost
DB_PORT=27017
DB_NAME=connectedTourism
DB_USER=username
DB_PASSWORD=password
MAPS_API_KEY=your_google_maps_api_key
WEATHER_API_KEY=your_openweathermap_api_key
JWT_SECRET=your_jwt_secret
TOKEN_EXPIRATION=1d
EMAIL_SERVICE_PROVIDER=your_email_service_provider
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
REACT_NATIVE_CONFIG_EXAMPLE=your_config_value
```

## 👥 Colaboradores
 Yefferson Silva : https://github.com/YeffersonSilva
