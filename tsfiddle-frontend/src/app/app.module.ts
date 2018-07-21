import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TscService } from './tsc.service';
import { SpinnerModule } from '@tsmean/spinner';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';

const monacoConfig: NgxMonacoEditorConfig = {
  defaultOptions: {
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false
    }
  },
  onMonacoLoad: () => {
    const monaco = (<any>window).monaco;
    // I don't know what's wrong with this setup, but it for sure causes a lot of problems...
    // monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    //   target: monaco.languages.typescript.ScriptTarget.ES5,
    //   lib: [ "es2015", "dom" ],
    //   allowNonTsExtensions: true
    // });
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      `declare function log(input: string) : string`
    );
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SpinnerModule.forRoot({
      primaryColor: 'white',
      secondaryColor: '#00ff00',
      animation: 'spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite'
    }),
    MonacoEditorModule.forRoot(monacoConfig)
  ],
  providers: [TscService],
  bootstrap: [AppComponent]
})
export class AppModule { }
