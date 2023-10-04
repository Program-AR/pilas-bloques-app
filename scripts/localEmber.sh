cd ../pilas-bloques
npm run build
cd ../pilas-bloques-react/public
rm -r emberPB/*
rsync -av ../../pilas-bloques/dist/ emberPB/
cd .. 
npm start