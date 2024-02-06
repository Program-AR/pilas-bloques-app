![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) 	
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/Program-AR/pilas-bloques-app/issues)
[![open issues](https://badgen.net/github/open-issues/Program-AR/pilas-bloques-app)](https://github.com/Program-AR/pilas-bloques-app/issues)
![downloads](https://img.shields.io/github/downloads/Program-AR/pilas-bloques-app/total.svg)
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

[:argentina: Leer en español](https://github.com/Program-AR/pilas-bloques-app/blob/develop/README.md) 
_____________

# Pilas Bloques - A tool to learn computer programming

<p align="center">
  <img src="https://user-images.githubusercontent.com/5421992/216465215-be8ae60c-5498-42ef-acc2-1d57fa38b349.svg" width="70%" />
</p>

## About

Pilas Bloques is an application to learn computer programming, specially developed for the classroom. We offer challenges with different levels of complexity to introduce students into the universe of computer programming with blocks. For more information read [the spanish about page](https://pilasbloques.program.ar/acerca-de-pilas-bloques/).

## Contributing

You can find all the information you need to start contributing in Pilas Bloques in the [CONTRIBUTING](https://github.com/Program-AR/pilas-bloques-app/blob/develop/CONTRIBUTING_en.md) guidelines!

## Getting Started

### Prerequisites

* Install [Git](https://git-scm.com/) and then you must clone the [Pilas Bloques](https://github.com/Program-AR/pilas-bloques-app) repository.

```
git clone https://github.com/Program-AR/pilas-bloques-app.git
```

* Node. The version required is indicated in `.nvmrc` file.

Debian/Ubuntu:
  ```
  git clone https://github.com/nvm-sh/nvm.git ~/.nvm
  source ~/.nvm/nvm.sh
  source ~/.nvm/install.sh
  nvm install .
  ```

### Dependencies and configuration

* Install dependencies
```
nvm use
npm install
```

* Create a file named `.env` with the required environment variables. File [`sample.env`](sample.env) can be copied for this purpose.

## Daily Development commands

The app was built using Create React App and then ejected. The main scripts are still from CRA:

- `npm test` - Runs interactive tests.
- `npm start` - Runs the app, auto reloading on changes.
- `npm run build` - Prepares app for production (minify, etc.)

Other commands:

- `npm run start:electron` - Packs with Electron and runs app. Dev only.
- `npm run start:emberDev` - Replaces `npm start`. To be used when developing in Ember subapp.
- `npm run pack:linux` (and `pack:osx`, `pack:win`) - Generates installers for each OS. Run `npm run build` beforehand. See `npm run release`.
- `npm run release` - Version and tag the app. After the push, the CI will automatically generate the installers and upload them to Github.

### Packing installers:

- If you want to pack an installer for another OS you need to know that this is only possible if you use linux. In addition, you need to install the following dependencies:
  - **Windows:** you need to install `nsis`, `wine` and `wine-mono`.
    - Debian/Ubuntu:

      ```
      sudo apt install nsis
      ```
    - Arch:

      ```
      yay -S nsis
      ```
  - **macOS:** unavailable.

### Preparing backend (optional):

If you want to test users stuff or save challenges it is necessary to fulfill some requirements: Run the apps Pilas Bloques API, Pilas Bloques Analytics (both accesible in the [backend project](https://github.com/Program-AR/pilas-bloques-app)) and a [MongoDB](https://www.mongodb.com/) database. That project has the instructions to do this.
