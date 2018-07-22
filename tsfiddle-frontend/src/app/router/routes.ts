import { AppComponent } from "../app.component";
import { HomeComponent } from "../home/home.component";

export const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'fiddle/:fiddle', component: HomeComponent},
  {path: '**', component: HomeComponent}
];


