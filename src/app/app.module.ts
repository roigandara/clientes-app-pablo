import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientService } from './clients/client.service';
import { HttpClientModule } from '@angular/common/http';
import { CompaniesComponent } from './companies/companies.component';
import { FormComponent } from './clients/form.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {path:'',redirectTo:'/clients', pathMatch:'full'},
  {path:'clients', component:ClientsComponent},
  {path:'companies', component:CompaniesComponent},
  {path:'clients/form', component:FormComponent},
  {path: 'clients/form/:id', component:FormComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ClientsComponent,
    CompaniesComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [ClientService], //Se incluyen aqui los servicios para que los encuentre
  bootstrap: [AppComponent]
})
export class AppModule { }
