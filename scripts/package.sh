#!/bin/bash

# The folder with all the publishable webapp
DIST=dist
[[ -d $DIST ]] || { echo "ERROR: The folder $DIST doesn't exist. You have to build Pilas Bloques before packaging." ; exit 1; }

#The project name, used by electron-packager in order to create files and folders for the app binaries.
NAME=$(sh scripts/projectName.sh)
# The project version.
VERSION="$(sh scripts/projectVersion.sh)"

eco(){
    echo ""
    echo "==> |"$(date "+%F|%T%z")"| "$1
}

help() {
    echo ""
	echo "Commands available for Pilas Bloques - version $VERSION"
	echo ""
	echo "  for packaging :"
	echo ""
	echo "    -osx         Packs w/ Electron and makes an OSX dmg installer."
	echo "    -linux_deb   Packs w/ Electron and makes a Debian deb x64 installer."
	echo "    -linux_zip   Packs w/ Electron and makes a zipfile linux x64 executable."
	echo "    -linux       linux_deb + linux_zip"
	echo "    -win       Packs w/ Electron and makes a Windows installer."
    echo "    -html        Makes zipfile with html to serve."
	echo ""
	echo "  NOTE: every version generates a binary automatically in CI."
	echo ""
}

prepack() {
    mkdir -p ./binaries
    cp package.json $DIST/package.json
    cp packaging/electron.js $DIST
    cp -R locales $DIST
    node scripts/fixingAbsolutePath.js $DIST
    node scripts/setEmberRoot.js "$DIST/emberPB" ""
}

pack() {
    PLATFORM=$1
    ARCH=$2
    ICON_EXTENSION=$3

    prepack
    ./node_modules/.bin/electron-packager ./$DIST $NAME --app-version=$VERSION --platform=$PLATFORM --arch=$ARCH --ignore=node_modules --out=binaries --overwrite --icon=packaging/icono.$ICON_EXTENSION
}

linux_deb() {
    eco "Generating linux x64 debian installer..."
    rm -f "./binaries/$NAME_$VERSION_amd64.deb"
    pack "linux" "x64" "icns"
    ./node_modules/.bin/electron-installer-debian --arch amd64 --config=packaging/linux-package.json
}

linux_zip() {
    eco "Generating linux x64 zip..."
    rm -f ./binaries/$NAME-$VERSION-x64.zip
    pack "linux" "x64" "icns"
    cd binaries; zip -r $NAME-$VERSION-linux-x64.zip $NAME-linux-x64/; cd ..
}

linux() {
    linux_zip
    linux_deb
}

osx() {
    eco "Generating installer for osx..."
    pack "darwin" "all" "icns"
    hdiutil create binaries/$NAME-$VERSION.dmg -srcfolder ./binaries/$NAME-darwin-x64/$NAME.app -size 1g
}

windows_exe() {
    eco "Generating installer for windows..."
    sudo apt install wine64
    npm install makensis
    pack "win32" "ia32" "ico"
	cp packaging/instalador.nsi binaries/$NAME-win32-ia32/
	cd binaries/$NAME-win32-ia32/; makensis instalador.nsi; cd ../..
	mv binaries/$NAME-win32-ia32/$NAME.exe binaries/$NAME-$VERSION.exe
}

windows_zip() {
    eco "Generating windows portable zip..."
    rm -f ./binaries/$NAME-$VERSION-win-portable.zip
    pack "win32" "ia32" "ico"
    cd binaries; zip -r $NAME-$VERSION-win-portable.zip $NAME-win32-ia32/; cd ..
}

windows() {
    windows_exe
    windows_zip
}

html() {
    eco "Generating html zip from build folder..."
    mkdir -p ./binaries
    tar czf ./binaries/$NAME-$VERSION-html.tar.gz $DIST
}

case "$1" in
    (-help)        help;;
    (-linux_deb)   linux_deb;;
    (-linux_zip)   linux_zip;;
    (-linux)       linux;;
    (-osx)         osx;;
    (-win)         windows;;
    (-win_zip)     windows_zip;;
    (-win_exe)     windows_exe;;
    (-html)        html;;
    (*)            help;;
esac 