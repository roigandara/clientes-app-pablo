import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { ClientService } from './clients/client.service';
import { HttpClientModule } from '@angular/common/http';
import { FormComponent } from './clients/form.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path:'',redirectTo:'/clients', pathMatch:'full'}, // un path vacío redirige a /clients
  {path:'clients', component:ClientsComponent}, // clients redirige al componente ClientsComponent
  {path:'clients/form', component:FormComponent},
  {path:'clients/form/:id', component:FormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientsComponent,
    FormComponent // declaración de ClientsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ClientService], // hay que incluir aquí los servicios para que funcionen
  bootstrap: [AppComponent]
})
export class AppModule { }
