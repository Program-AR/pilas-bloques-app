![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 	
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Program-AR/pilas-bloques-app/issues)
[![open issues](https://badgen.net/github/open-issues/Program-AR/pilas-bloques-app)](https://github.com/Program-AR/pilas-bloques-app/issues)
![downloads](https://img.shields.io/github/downloads/Program-AR/pilas-bloques-app/total.svg)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

[:gb: Read in English](https://github.com/Program-AR/pilas-bloques-app/blob/develop/README_en.md)

# Pilas Bloques - Una herramienta para aprender a programar

<p align="center">
  <img src="https://user-images.githubusercontent.com/5421992/216465215-be8ae60c-5498-42ef-acc2-1d57fa38b349.svg" width="70%" />
</p>

## Sobre la aplicación

Pilas Bloques es una aplicación para enseñar y aprender a programar, desarrollada especialmente para el aula. Se proponen desafíos con diversos niveles de dificultad para acercar a las y los estudiantes al mundo de la programación por medio de bloques. Para más información, ver el [Acerca De](https://pilasbloques.program.ar/acerca-de-pilas-bloques/) de Pilas Bloques.

## Cómo contribuír

¡En la guia de [CONTRIBUTING](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CONTRIBUTING.md) tenés toda la informacion necesaria para contribuir al proyecto!

## Preparar entorno de desarrollo

### Pre-requisitos
* Instalar [Git](https://git-scm.com/) y clonar el repositorio de [Pilas Bloques](https://github.com/Program-AR/pilas-bloques-app)

```
git clone https://github.com/Program-AR/pilas-bloques-app.git
```

* Node. La version requerida para el proyecto está en el archivo `.nvmrc`.

  Debian/Ubuntu:
  ```
  git clone https://github.com/nvm-sh/nvm.git ~/.nvm
  source ~/.nvm/nvm.sh
  source ~/.nvm/install.sh
  nvm install .
  ```

### Dependencias y configuración

* Instalar dependencias
```
nvm use
npm install
```

* Crear un archivo `.env` con las variables de entorno requeridas. El archivo [`sample.env`](sample.env) puede copiarse para tal efecto.

## Comandos comunes de desarrollo

La aplicación fue desarrollada con Create React App, y luego realizado el "eject". Estos scripts siguen siendo los de CRA:

- `npm test` - Corre los tests para desarrollo.
- `npm start` - Levanta la aplicación para desarrollo.
- `npm run build` - Prepara la aplicación para producción (minifica, etc.).

Otros:

- `npm run start:electron` - Empaqueta la aplicación con Electron y la ejecuta (para desarrollo)
- `npm run start:emberDev` - Levanta la aplicación compilando Ember en una carpeta paralela. Para ser usada cuando se desarrolla en esa subaplicación.
- `npm run pack:linux` (y `pack:osx`, `pack:win`) - Genera los instaladores para cada sistema operativo. Antes hacer un `build`. Ver `npm run release`.
- `npm run release` - Versiona y taggea la aplicación. Al hacerlo, el CI se encarga de generar todos los instaladores y los sube a Github.

### Empaquetando instaladores
- Si se desea empaquetar (`npm run pack...`) para otro SO (que no sea el tuyo) hay que tener en cuenta que solamente se puede hacer desde linux. Además, hay que tener instaladas ciertas dependencias:
  - **Windows:** se necesita tener instalado `nsis`, `wine` y `wine-mono`.
    - Debian/Ubuntu:

      ```
      sudo apt install nsis
      ```
    - Arch:

      ```
      yay -S nsis
      ```
  - **macOS:** no disponible.

### Preparar el backend (opcional)

Para tener un backend para probar funcionalidades relacionadas a usuarios y a guardar desafíos es necesario tener levantado los proyectos de Pilas Bloques API, Pilas Bloques Analytics, (ambos disponibles en el proyecto [backend](https://github.com/Program-AR/pilas-bloques-backend)) y una base de datos [MongoDB](https://www.mongodb.com/). Las instrucciones para hacerlo están en ese repositorio.
_____________

### Release & deploy (Solo para el equipo de Pilas Bloques)
https://github.com/Program-AR/pilas-bloques-ember/wiki/Release-y-Deploy
