# Build Frontend
cd tsfiddle-frontend
npm run build
mv dist ../tsfiddle-backend
cd ..

# Build Backend (precondition: frontend is built)
cd tsfiddle-backend
npm run build:docker-image
npm run publish:docker-image
npm run deploy