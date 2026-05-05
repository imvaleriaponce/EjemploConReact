# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el código fuente
COPY . .

# Compilar la aplicación React
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos compilados del stage anterior
COPY --from=build /app/build /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

# Comando para ejecutar Nginx
CMD ["nginx", "-g", "daemon off;"]
