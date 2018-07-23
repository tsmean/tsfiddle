import { Component, OnInit } from '@angular/core';
import { TscService } from '../tsc.service';
import { EDITOR_TEMPLATE, buildIframeHtml, setupCustomScript } from '../templates';
import { FiddleService } from '../fiddle.service';
import { NotifyService } from '@tsmean/toast'
import { Router, ActivatedRoute } from '@angular/router';
import { Fiddle } from '../fiddle.model';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  compilationError: string;
  loading: boolean = false;

  editorOptions = { theme: 'vs-dark', language: 'typescript' };
  input: string;
  editor = null;

  constructor(private tscService: TscService,
    private notify: NotifyService,
    private router: Router,
    private route: ActivatedRoute,
    private fiddleService: FiddleService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const fiddleId = params.fiddle;
      if (fiddleId != null) {
        this.fiddleService.getFiddle(fiddleId).subscribe((resp: Fiddle) => {
          this.input = resp.content;
        }, errorResp => {
          this.notify.error('Oops, the fiddle could not be loaded.');
          this.input = '';
        })
      } else {
        this.input = EDITOR_TEMPLATE;
      }
    });

  }

  onEditorInit(editor) {
    this.editor = editor;
  }

  saveFiddle() {
    this.fiddleService.createFiddle(this.input).subscribe((resp: Fiddle) => {
      this.router.navigate(['/fiddle', resp.id]);
      this.notify.success('Saved');
    }, errorResp => {
      this.notify.error('Oops, the fiddle could not be stored.');
    });
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
        this.compilationError = resp.compilationError;
      } else {
        runCodeInIframe(setupCustomScript, resp.compiledJS);
      }
    }, errorResp => {
      this.loading = false;
      console.error(errorResp);
      alert('Oops, something went wrong.');
    });
  }

  transpile = (): Promise<EmitOutput> => {
    let model = this.editor.getModel();
    return new Promise(resolve => {
      monaco.languages.typescript.getTypeScriptWorker()
        .then(worker => {
          worker(model.uri)
            .then(client => {
              client.getEmitOutput(model.uri.toString()).then(r => {
                resolve(r);;
              });
            });
        });
    });
  }

  runCodeInFrontend() {
    this.reset();
    this.loading = true;
    this.transpile().then(resp => {
      const js = resp.outputFiles[0].text;
      if (js) {
        this.reset();
        runCodeInIframe(setupCustomScript, js);
        this.loading = false;
      }
    }).catch(errorResp => {
      console.log(errorResp);
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
