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

  runCode() {
    this.compilationError = null;
    this.tscService.compileCode(this.input).subscribe((resp: TscResponse) => {
      if (resp.compilationError != null) {
        this.compilationError = resp.compilationError.stdout;
      } else {
        eval(resp.compiledJS);
      }
    }, errorResp => {
      console.error(errorResp);
      alert('Oops, something went wrong.');
    });
  }
}



interface TscResponse {
  compiledJS: string;
  compilationError?: any;
}
