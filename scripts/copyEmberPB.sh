PB_APP_VERSION="1.17.0"

echo "==> Downloading Pilas Bloques app online..."
mkdir -p tmp
curl -o tmp/pilasbloques-${PB_APP_VERSION}-html.tar.gz -kLSs https://github.com/Program-AR/pilas-bloques-ember/releases/download/${PB_APP_VERSION}/pilasbloques-${PB_APP_VERSION}a-html.tar.gz

echo "==> Extracting, deleting, renaming Pilas Bloques app online..."
EMBERPB_FOLDER="public/emberPB"
rm -rf ${EMBERPB_FOLDER}
mkdir -p ${EMBERPB_FOLDER}
tar -xf tmp/pilasbloques-${PB_APP_VERSION}-html.tar.gz -C ${EMBERPB_FOLDER} --strip-components 1
tarsucceeded=$?
rm tmp/pilasbloques-${PB_APP_VERSION}-html.tar.gz
if [ $tarsucceeded -ne 0 ]; then 
    exit 1 
fi

