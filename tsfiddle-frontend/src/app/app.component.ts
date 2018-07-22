import { Component, ViewChild } from '@angular/core';
import { TscService } from './tsc.service';
import { resolve } from '../../node_modules/@types/q';

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
    resetIframe();
  }

  runCode() {
    this.reset();
    this.loading = true;
    this.tscService.compileCode(this.input).subscribe((resp: TscResponse) => {
      this.loading = false;
      if (resp.compilationError != null) {
        this.compilationError = resp.compilationError.stdout;
      } else {
        runCodeInIframe(setupCustomScript, resp.compiledJS);
      }
    }, errorResp => {
      this.loading = false;
      console.error(errorResp);
      alert('Oops, something went wrong.');
    });
  }

}

const LOG_ENTRY_CLASS = 'log-entry';

function runCodeInIframe (setup: string, js: string) {
  const iframeElt = getIframe();
  const iWindow = iframeElt.contentWindow;
  const iDocument = iframeElt.contentDocument;
  iDocument.body.setAttribute('style', 'font-family: monospace; color: white;');
  const styleTag = document.createElement('STYLE');
  styleTag.innerHTML = `.${LOG_ENTRY_CLASS}{padding-bottom: 5px}`
  iDocument.head.appendChild(styleTag);
  (<any>iWindow).eval(`${setup}${js}`);
  console.log(iWindow.document.cookie);
  console.log(document.cookie);
}

const setupCustomScript = `
var console = {};
console.log = function(message){
  const div = document.createElement('DIV');
  div.className = '${LOG_ENTRY_CLASS}';
  div.innerHTML = '> ' + message;
  document.body.appendChild(div);
};
`;

function resetIframe() {
  const iframe = <HTMLIFrameElement>document.createElement('IFRAME');
  iframe.setAttribute('frameBorder', '0');
  iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts');
  iframe.id = IFRAME_ID;
  iframe.className = 'frame';
  const wrapper = getFrameWrapper();
  removeAllChildren(wrapper);
  wrapper.appendChild(iframe);
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

const IFRAME_ID = 'frame';
const IFRAME_WRAPPER_ID = 'iframe-wrapper'

function getIframe(): HTMLIFrameElement {
  return <HTMLIFrameElement>document.getElementById(IFRAME_ID);
}

function getFrameWrapper(): HTMLElement {
  return <HTMLIFrameElement>document.getElementById(IFRAME_WRAPPER_ID);
}

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
