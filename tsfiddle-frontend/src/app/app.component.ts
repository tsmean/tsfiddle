import { Component, ViewChild } from '@angular/core';
import { TscService } from './tsc.service';
import { Recoverable } from 'repl';

// export const EDITOR_TEMPLATE = `log("Hello world!")`;
export const EDITOR_TEMPLATE = `console.log('Hello world!')`;

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

  transpile = (): Promise<EmitOutput> => {
    let model = this.editor.getModel();
    return new Promise(resolve => {
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

  // runCodeInFrontend() {
  //   this.reset();
  //   this.loading = true;
  //   this.transpile().then(resp => {
  //     const js = resp.outputFiles[0].text;
  //     if (js) {
  //       this.reset();
  //       eval(js);
  //       this.loading = false;
  //     }
  //   }).catch(errorResp => {
  //     console.log(errorResp);
  //   });
  // }

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
