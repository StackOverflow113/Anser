import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './pages/home/home.component';
import { MaterialElevationDirective } from './directives/material-elevation.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DialogEventComponent } from './components/dialog-event/dialog-event.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment.prod';
import { LoginComponent } from './pages/login/login.component';
import { ListCustomerComponent } from './components/list-customer/list-customer.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormComponent } from './components/list-customer/form/form.component';
import { MatDialogModule } from '@angular/material/dialog';



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MaterialElevationDirective,
    HeaderComponent,
    DialogEventComponent,
    LoginComponent,
    ListCustomerComponent,
    FormComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxMaterialTimepickerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[FormComponent]
})
export class AppModule { }
