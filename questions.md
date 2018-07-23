# Questions

There are some open architectural questions for this project. I'll jot them down here.

## Frontend vs Backend Transpilation

Both the frontend and the backend are capable of transpiling TypeScript. So where does it make more sense?

### Pro Frontend
- It's faster (no network roundtrip)
- It's cheaper (users compile it themselves and I have no server costs)

### Pro Backend
- Heavy dependencies such as Angular could be preinstalled on the server
- I haven't figured out yet how I get the info, whether the TypeScript compiles or not from the Monaco editor...

### Intermediate Decision
Let's leave it in the backend for now. If I've got more time at some point I can still try to make it work in the Frontend. It's not that much slower with the roundtrip anyways and the load won't be that big in the beginning. I think in max. 6h I should be able to get it switched to the frontend if I decide to do so...


## How should we version fiddles?
How about each save generates a new id...? That way you don't need a login concept (just yet).

### Intermediate decision
Append only creating new entries seems alright for now...


# Question History

Answered questions are put here for documentation how the project developed.

## Exposing the database id (mysql integer) isn't really nice

Possible Solution: Use https://github.com/ivanakimov/hashids.js

pro's:
- other fiddles aren't immediately searchable

con's
- another dependency
- it's really hard to get rid of this...

What would be a possible 'get rid of this' plan?

### Final decision

Use the library suggested. Another question was, should I use a secret or not? I decided to go for the 'not' case, since it keeps everything a bit simpler and the fiddles don't really need protection. I even thought it's ok to expose the mysql id, but hashing does make it look a bit more professional.

## Storage
We need a good concept how fiddles are stored.

### Database/Storage
MySQL? PostgreSQL? S3? MongoDB? PostgreSQL? https://github.com/HouzuoGuo/tiedot?

I thought a while about using S3. Most compelling reasons are:
- It's serverless, no setup and I need things to be simple and low maintenance with tsfiddle
- It's immensely durable
- It scales well

But there are obvious problems:
- No sophisticated database features (querying, transactions, ...)
- It's probably slower

So what if I could use an immensely durable, scalable and serverless **database**? Meet AWS RDS...
- It's managed, so easy setup
- It's durable
- It scales well

#### Final decision
AWS MySQL. It's managed, it's a relational database, it't everything we need & want.


## Evaluating the JavaScript output: Frontend or Backend?

Both the frontend and the backend can evaluate the generated JavaScript. In the frontend, `eval` can be used or alternatively a JS parser such as https://github.com/NeilFraser/JS-Interpreter. In the backend, Node.js can be used.

### Pro Frontend
- You get the Browser API
- You don't need to worry about sandboxing the JS-Evaluation in the backend.(1)
- You immediately see the result. If you have a long running process (e.g. setTimeout), with evaluating in the backend you'd either get all output at once in the end or you'd need to send intermediate results back to the frontend.

(1) When you execute user code on your node instance nasty stuff can happen... We'd need to wait for deno https://github.com/ry/deno to come out of it's infancy to get past this or we could run it against AWS Lambda. That would make sense.

### Pro Backend
- You get the Node API
- You don't need to worry about sandboxing the JS-Evaluation in the frontend.(2)

(2) When you `eval` user code nasty stuff can happen... We'd either need a JS parser or an iframe. I don't know yet how safe the iframe would be. For example, could cookies still be accessed? Also see here https://www.quora.com/How-can-I-create-an-iframe-and-not-allow-it-to-access-cookies.

### Final Decision
It's a perfect use case for an iframe with the `sandbox` attribute https://www.w3schools.com/tags/att_iframe_sandbox.asp. You don't even need eval, you can use an iframe with a data-url and pass the js as a script tag.


## Logging
How should I do it with the logging? Should I take `console.log` and modify it? Should I use a custom `log` function? Should I let the user import the logger (`import {log} from '@tsfiddle/logger'`) or should I provide this implicitly...?

### Final Decision
The more isomorphic the better. Meaning: It's nice when users can copy their code from A to B and don't have to replace all their console.logs. With the standard `console.log` we can't be so wrong?
