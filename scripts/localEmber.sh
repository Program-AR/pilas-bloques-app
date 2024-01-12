cd ../pilas-bloques-ember
npm run build
cd ../pilas-bloques-app/public
rm -r emberPB/*
rsync -av ../../pilas-bloques-ember/dist/ emberPB/
cd .. 
npm start