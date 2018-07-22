import { Component, ViewChild } from '@angular/core';
import { TscService } from './tsc.service';
import { EDITOR_TEMPLATE, buildIframeHtml, setupCustomScript } from './templates';
import { FiddleService } from './fiddle.service';

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

  constructor(private tscService: TscService,
    private fiddleService: FiddleService) {
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



function runCodeInIframe(setup: string, js: string) {
  const iframe = <HTMLIFrameElement>document.createElement('IFRAME');
  iframe.setAttribute('frameBorder', '0');
  iframe.setAttribute('sandbox', 'allow-scripts');
  iframe.id = IFRAME_ID;
  iframe.className = 'frame';
  const html = buildIframeHtml(setup.concat(js));
  iframe.src = "data:text/html;charset=utf-8," + escape(html);
  const wrapper = getFrameWrapper();
  wrapper.appendChild(iframe);
}



function resetIframe() {
  const wrapper = getFrameWrapper();
  removeAllChildren(wrapper);
}

export function removeAllChildren(node: HTMLElement) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}


const IFRAME_ID = 'frame';
const IFRAME_WRAPPER_ID = 'iframe-wrapper'

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
