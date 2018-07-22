import { HomeComponent } from "../home/home.component";
import { AboutComponent } from "../about/about.component";

export const appRoutes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'fiddle/:fiddle', component: HomeComponent},
  {path: '**', component: HomeComponent}
];


