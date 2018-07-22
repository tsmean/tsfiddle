const LOG_ENTRY_CLASS = 'log-entry';

export const setupCustomScript = `
var console = {};
console.log = function(message){
  const div = document.createElement('DIV');
  div.className = '${LOG_ENTRY_CLASS}';
  div.innerHTML = '> ' + message;
  document.body.appendChild(div);
};
`;

export function buildIframeHtml(js: string): string {
    return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <style>
        body {font-family: monospace; color: white;}
        .${LOG_ENTRY_CLASS}{padding-bottom: 5px}
      </style>
    </head>
    <body>
      <script>${js}</script>
    </body>
  </html>`
}
  

export const EDITOR_TEMPLATE = `console.log('Starting...');
const getDatabaseConnection: () => Promise<DatabaseConnection> = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        status: 'connected'
      })
    }, 1500);
  })
}
const getUser: (con: DatabaseConnection) => Promise<User> = (con) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Derp'
      })
    }, 1500)
  })
}
const getTodos: (con: DatabaseConnection, user: User) => Promise<Todo[]> = (con, user) => {
  return new Promise(resolve => {
      setTimeout(() => {
          const todo1 = {todo: 'Launder'};
          const todo2 = {todo: 'Ironing'};
          resolve([todo1, todo2]);
      }, 1500)
  })
}
const getMyTodos = async () => {
    const con = await getDatabaseConnection();
    console.log('Connection established!');
    const user = await getUser(con);
    console.log('User fetched!');
    const todos = await getTodos(con, user);
    console.log('Todos received.');
    return todos;
}
getMyTodos().then((todos) => {
    console.log(JSON.stringify(todos));
});

interface DatabaseConnection {
  status: 'connected' | 'disconnected';
}
interface User {
  name: string;
}
interface Todo {
  todo: string;
}`;