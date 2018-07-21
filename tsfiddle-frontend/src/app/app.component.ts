import { Component } from '@angular/core';
import { TscService } from './tsc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  input: string;
  compilationError: string;
  loading: boolean = false;

  constructor(private tscService: TscService) {

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

interface TscResponse {
  compiledJS: string;
  compilationError?: any;
}
