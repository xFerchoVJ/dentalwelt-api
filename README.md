**Nombre del Proyecto: API DentalWelt**

## Descripción

Este proyecto es una API desarrollada en Node.js utilizando Express, Typescript y Docker. Proporciona una estructura sólida y escalable para crear y mantener APIs modernas.

## Funcionalidades

- **Endpoint**: Proporciona una variedad de endpoints para manejar solicitudes HTTP.
- **Type Safety**: Utiliza Typescript para asegurar la seguridad y la robustez del código.
- **Dockerizado**: Empaquetado en contenedores Docker para una fácil instalación y despliegue.

## Requisitos Previos

Asegúrese de tener instalado Docker en su sistema antes de ejecutar el proyecto.

## Instalación y Ejecución

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/xFerchoVJ/dentalwelt-api
```

2. Navega hasta el directorio del proyecto:

```bash
cd dentalwelt-api
```

3. Ejecuta el siguiente comando para iniciar el proyecto en modo desarrollo:

```bash
docker-compose -f dev/docker-compose.dev.yml up
```

4.- Entrar al contenedor de la API

```bash
docker exec -it <id_contenedor> bash
```
5.- Correr las migraciones

```bash
npx prisma migrate dev
```

## Estructura del Proyecto

El proyecto sigue una estructura clara y organizada:

```
.
├── dev
│   └── docker-compose.dev.yml
├── src
│   ├── index.ts
│   └── server.ts
├── Dockerfile
├── Dockerfile.dev
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

- **`dev/`**: Contiene archivos de configuración para el entorno de desarrollo.
- **`src/`**: Contiene el código fuente de la aplicación.
  - **`index.ts`**: Punto de entrada de la aplicación.
  - **`server.ts`**: Configuración del servidor Express.
- **`Dockerfile`**: Archivo de configuración para la construcción de la imagen Docker.
- **`Dockerfile`**: Archivo de configuración para la construcción de la imagen Docker para desarrollo.
- **`package.json`**: Archivo de configuración de npm con las dependencias del proyecto.
- **`tsconfig.json`**: Configuración del compilador Typescript.
- 
## Licencia

Este proyecto está bajo la Licencia [MIT](https://opensource.org/licenses/MIT).

---

¡Mimo desarrollando con Node.js, Express, Typescript y Docker! 🚀
