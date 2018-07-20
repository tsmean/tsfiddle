# express-typescript-seed

Template / Boilerplate / Starterkit for Node.js Express WebService written in TypeScript.

## Usage

- Clone Repo Shallow: `git clone --depth=1 https://github.com/bersling/express-typescript-seed`
- Select a desired port (e.g. 8574), then find/replace the current port 5638
- Find/Replace the server ssh login with yours: ubuntu@18.196.229.25
- Setup a swarm cluster with traefik and a network 'traefik'. Adjust the labels in docker-compose.yml. Route AWS Route 53 (or alternative DNS stuff) to correct machine.
- replace all occurrences of tsfiddle with something to your likes

## Local development

```
npm start
```

Starts a server with nodemon.
