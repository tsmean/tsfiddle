import { Component } from '@angular/core';
import { TscService } from './tsc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  input: string;

  constructor(private tscService: TscService) {

  }

  runCode() {
    this.tscService.compileCode(this.input);
  }
}
