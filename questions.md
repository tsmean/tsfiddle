# Questions

There are some open architectural questions for this project. I'll jot them down here.

## Frontend vs Backend TypeScript->JavaScript Transpilation

Both the frontend and the backend are capable of transpiling TypeScript. So where does it make more sense?

### Pro Frontend
- It's faster (no network roundtrip)
- It's cheaper (users compile it themselves and I have no server costs)

### Pro Backend
- Heavy dependencies such as Angular can be preinstalled on the server
- I haven't figured out yet how I get the info, whether the TypeScript compiles or not from the Monaco editor...

### Intermediate Decision
Let's leave it in the backend for now. If I've got more time at some point I can still try to make it work in the Frontend. It's not that much slower with the roundtrip anyways and the load won't be that big in the beginning. I think in max. 3h I should be able to get it switched to the frontend if I decide to do so...

## Evaluating the JavaScript output: Frontend or Backend?

Both the frontend and the backend can evaluate the generated JavaScript. In the frontend, `eval` can be used or alternatively a JS parser such as https://github.com/NeilFraser/JS-Interpreter. In the backend, Node.js can be used.

### Pro Frontend
- You get the Browser API
- You don't need to worry about sandboxing the JS-Evaluation in the backend.*
- You immediately see the result. If you have a long running process (e.g. setTimeout), with evaluating in the backend you'd either get all output at once in the end or you'd need to send intermediate results back to the frontend.

* When you execute user code on your node instance nasty stuff can happen... We'd need to wait for deno https://github.com/ry/deno to come out of it's infancy to get past this or we could run it against AWS Lambda. That would make sense.

### Pro Backend
- You get the Node API
- You don't need to worry about sandboxing the JS-Evaluation in the frontend.**

** When you `eval` user code nasty stuff can happen... We'd either need a JS parser or an iframe. I don't know yet how safe the iframe would be. For example, could cookies still be accessed? Also see here https://www.quora.com/How-can-I-create-an-iframe-and-not-allow-it-to-access-cookies.

### Intermediate Decision
Let's leave it at frontend `eval` for now. There isn't really anything else on the page, no login information or anything. However, should be replaced by a different solution soon. ETA: 6h.

## Logging

How should I do it with the logging? Should I take `console.log` and modify it? Should I use a custom `log` function? Should I let the user import the logger (`import {log} from '@tsfiddle/logger'`) or should I provide this implicitly...?

### Intermediate Decision

I think a custom `log` is okay... I mean it's better than fumbling around in the behaviour of console.log, right? Hm, then on the other hand, it's not even that hard to define a custom behaviour:
```
var console = {};
console.log = function(){};
```


## Storage
Once the users can store their fiddles, we also need a good concept.

### Database
Where should we store the fiddles? MongoDB? PostgreSQL? https://github.com/HouzuoGuo/tiedot?

### How sould we version docs?
How about each save generates a new id...? That way you don't need a login concept (just yet).



