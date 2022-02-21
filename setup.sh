cd front
npm run build
mv build ../public
cd ..
npm run dist:linux
cp -r public release/*/