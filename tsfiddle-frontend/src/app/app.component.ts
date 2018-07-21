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
  input: string = `console.log("Hello world!")`;
  editor = null;

  @ViewChild('output')
  output;

  constructor(private tscService: TscService) {

  }

  onEditorInit(editor) {
    this.editor = editor;
    // this.editor.languages.register({id:"typescript"});
  }

  transpile = (): Promise<EmitOutput> => {
    let model = this.editor.getModel();
    return new Promise(resolve => {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        target: monaco.languages.typescript.ScriptTarget.ES5,
        allowNonTsExtensions: true
      });
      monaco.languages.typescript.getTypeScriptWorker()
        .then(worker => {
          worker(model.uri)
            .then(client => {
              client.getSyntacticDiagnostics(model.uri.toString()).then(r => {
                // not too helpful so far...
              })
              client.getEmitOutput(model.uri.toString()).then(r => {
                resolve(r);;
              });
            });
        });
    });
  }

  reset() {
    this.compilationError = null;
    removeAllChildren(document.getElementById('output'));
  }

  runCodeInFrontend() {
    this.reset();
    this.loading = true;
    this.transpile().then(resp => {
      const js = resp.outputFiles[0].text;
      if (js) {
        const parsedJs = loggerCode + js.replace(/console\.log/g, 'log');
        eval(parsedJs);
        this.loading = false;
      } else {
        this.noOutput = true;
      }
    }).catch(errorResp => {
      console.log(errorResp);
    });
  }

  runCode() {
    this.reset();
    this.loading = true;
    this.tscService.compileCode(this.input).subscribe((resp: TscResponse) => {
      this.loading = false;
      if (resp.compilationError != null) {
        this.compilationError = resp.compilationError.stdout;
      } else {
        eval(resp.compiledJS);
        // if (this.output.nativeElement.children.length === 0) {
        //   this.noOutput = true;
        // }
      }
    }, errorResp => {
      this.loading = false;
      console.error(errorResp);
      alert('Oops, something went wrong.');
    });
  }
}


const loggerCode: string = `const log = (input) => {
  const div = document.createElement('DIV');
  div.innerHTML = '> ' + input;
  document.getElementById('output').appendChild(div);
}\n\n`


export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
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
