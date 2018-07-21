# Build Frontend
cd tsfiddle-frontend
npm run build
rm -rf ../tsfiddle-backend/ng-dist
cp -r dist ../tsfiddle-backend/ng-dist
cd ..

# Build Backend (precondition: frontend is built)
cd tsfiddle-backend
npm run build:docker
npm run publish:docker
npm run deploy