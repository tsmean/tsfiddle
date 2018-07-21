import { Component, ViewChild } from '@angular/core';
import { TscService } from './tsc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  compilationError: string;
  loading: boolean = false;

  editorOptions = { theme: 'vs-dark', language: 'typescript' };
  input: string = EDITOR_TEMPLATE;
  editor = null;

  @ViewChild('output')
  output;

  constructor(private tscService: TscService) {
  }

  onEditorInit(editor) {
    this.editor = editor;
  }

  reset() {
    this.compilationError = null;
    removeAllChildren(document.getElementById('output'));
  }

  runCode() {
    this.reset();
    this.loading = true;
    this.tscService.compileCode(this.input).subscribe((resp: TscResponse) => {
      this.loading = false;
      if (resp.compilationError != null) {
        this.compilationError = resp.compilationError.stdout;
      } else {
        this.reset();
        eval(resp.compiledJS);
      }
    }, errorResp => {
      this.loading = false;
      console.error(errorResp);
      alert('Oops, something went wrong.');
    });
  }
}

export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
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

interface EmitOutput {
  emitSkipped: boolean;
  outputFiles: {
    name: string;
    text: string;
  }[]
}

interface TscResponse {
  compiledJS: string;
  compilationError?: any;
}
