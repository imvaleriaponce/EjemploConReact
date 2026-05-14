# =========================
# Etapa 1: Build
# =========================
FROM node:22-alpine AS build

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias primero
# Esto mejora el cache de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar el resto del proyecto
COPY . .

# Generar build de producción
RUN npm run build

# =========================
# Etapa 2: Servidor Web
# =========================
FROM nginx:stable-alpine AS production

# Remover configuración default de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos compilados
COPY --from=build /app/build /usr/share/nginx/html

# Copiar configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer puerto
EXPOSE 80

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget --quiet --tries=1 --spider http://localhost || exit 1

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]