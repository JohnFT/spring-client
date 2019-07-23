import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component'
import { FooterComponent } from './footer/footer.component'
import { DirectivaComponent } from './directiva/directiva.component'
import { ClientesComponent } from './clientes/clientes.component'
import { ClienteService } from './clientes/cliente.service'
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { FormComponent } from './clientes/form.component'
import { PaginatorComponent } from './paginator/paginator.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material'
import { DetailComponent } from './clientes/detail/detail.component'
const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clients', component: ClientesComponent },
  { path: 'clients/page/:page', component: ClientesComponent },
  { path: 'clients/form', component: FormComponent },
  { path: 'clients/form/:id', component: FormComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule {}
