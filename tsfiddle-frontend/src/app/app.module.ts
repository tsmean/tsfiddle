import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TscService } from './tsc.service';
import { SpinnerModule } from '@tsmean/spinner';
import { FormsModule } from '@angular/forms';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { monacoConfig } from './editor.config';
import {NotifyModule} from '@tsmean/toast'
import { RouterModule } from '@angular/router';
import { appRoutes } from './router/routes';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageContainerComponent } from './page-container/page-container.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageContainerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NotifyModule.forRoot(),
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