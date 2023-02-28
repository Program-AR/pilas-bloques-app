PB_APP_VERSION="1.13.2"

echo ::::: Download Pilas Bloques app online ::::: 
mkdir -p tmp
curl -o tmp/pilasbloques-${PB_APP_VERSION}-html.tar.gz -kLSs https://github.com/Program-AR/pilas-bloques/releases/download/${PB_APP_VERSION}/pilasbloques-${PB_APP_VERSION}a-html.tar.gz

echo ::::: Extract, delete, rename Pilas Bloques app online ::::: 
EMBERPB_FOLDER="public/emberPB"
rm -rf ${EMBERPB_FOLDER}
mkdir -p ${EMBERPB_FOLDER}
tar -xvf tmp/pilasbloques-${PB_APP_VERSION}-html.tar.gz -C ${EMBERPB_FOLDER} --strip-components 1
rm tmp/pilasbloques-${PB_APP_VERSION}-html.tar.gz
