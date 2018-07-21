import { Component } from '@angular/core';
import { TscService } from './tsc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  input: string;
  output: string;

  constructor(private tscService: TscService) {

  }

  runCode() {
    this.tscService.compileCode(this.input).subscribe((resp: TscResponse) => {
      this.output = resp.compiledJS;
      eval(this.output);
    }, errorResp => {
      console.error(errorResp);
      alert('Oops, something went wrong.');
    });
  }
}

interface TscResponse {
  compiledJS: string;
}
