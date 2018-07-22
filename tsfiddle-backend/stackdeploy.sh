#!/usr/bin/env bash

server=ubuntu@18.196.229.25

ssh $server "mkdir -p ~/tsfiddle"
scp -r ./docker/docker-compose.yml $server:~/tsfiddle/docker-compose.yml
ssh $server "sudo docker stack deploy -c ./tsfiddle/docker-compose.yml tsfiddle"
