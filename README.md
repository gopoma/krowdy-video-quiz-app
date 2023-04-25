# krowdy-video-quiz-app

Implementación a nivel del Front End de una aplicación de cuestionarios con respuestas en video, desarrollado con **React**, **WebRTC** y **TypeScript**.

## Getting Started

En primera instancia, instala todas las **dependencias** del proyecto con el siguiente comando:

```bash
make install # pnpm install
```

Finalmente, corre el servidor de **desarrollo**:

```bash
make dev # pnpm dev
```

Puedes correr el linter con el siguiente comando:

```bash
make lint # pnpm lint
```

Puedes correr un servidor en un ambiente de **producción** con el siguiente comando:

```bash
make prod # Correrlo en un contenedor de Docker con NGINX
pnpm build && pnpm preview # Correrlo en nuestro entorno local
```
