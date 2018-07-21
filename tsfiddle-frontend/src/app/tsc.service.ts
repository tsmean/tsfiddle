import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TscService {
  constructor(
    private http: Http
  ) { }

  compileCode(typeScriptCode: string) {
    this.http.get(`${environment.apiUrl}`)
  }

}
