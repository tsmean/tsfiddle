import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TscService {
  constructor() { }

  transpile = (model): Promise<EmitOutput> => {
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

}

interface EmitOutput {
  emitSkipped: boolean;
  outputFiles: {
    name: string;
    text: string;
  }[]
}