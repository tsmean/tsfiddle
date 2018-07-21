# Questions

There are some open architectural questions for this project. I'll jot them down here.

## Frontend vs Backend TypeScript->JavaScript Transpilation

Both the frontend and the backend are capable of transpiling TypeScript. So where does it make more sense?

### Pro Frontend
- It's faster (no network roundtrip)
- It's cheaper (users compile it themselves and I have no server costs)

### Pro Backend
- Heavy dependencies such as Angular can be preinstalled on the server

## Evaluating the JavaScript output: Frontend or Backend?

Both the frontend and the backend can evaluate the generated JavaScript. In the frontend, `eval` can be used or alternatively a JS parser such as https://github.com/NeilFraser/JS-Interpreter. In the backend, Node.js can be used.

### Pro Frontend
- You get the Browser API
- You don't need to worry about sandboxing the JS-Evaluation in the backend.*

* When you execute user code on your node instance nasty stuff can happen... We'd need to wait for deno https://github.com/ry/deno to come out of it's infancy to get past this or we could run it against AWS Lambda. That would make sense.

### Pro Backend
- You get the Node API
- You don't need to worry about sandboxing the JS-Evaluation in the frontend.**

** When you `eval` user code nasty stuff can happen... We'd either need a JS parser or an iframe. I don't know yet how safe the iframe would be. For example, could cookies still be accessed? Also see here https://www.quora.com/How-can-I-create-an-iframe-and-not-allow-it-to-access-cookies.


