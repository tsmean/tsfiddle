IMAGE=tsmean/tsfiddle
docker build -t $IMAGE .
docker push $IMAGE
