import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './module/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './Component/login/login.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { JwtInterceptorService } from './Interceptor/jwt-interceptor.service';
import {JwtModule} from '@auth0/angular-jwt';
import { UserfilterPipe } from './Pipes/userfilter.pipe';
import { ErrorService } from './Interceptor/error.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    UserfilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule,
    HighchartsChartModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return (localStorage.getItem('curToken')?localStorage.getItem('curToken') as string:null);
        }
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
