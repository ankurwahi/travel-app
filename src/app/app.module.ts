import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FlightListComponent } from './flight/flight-list/flight-list.component';
import { FlightSearchComponent } from './flight/flight-search/flight-search.component';
import { RequestService } from './flight/shared/flight.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AppComponent, FlightListComponent, FlightSearchComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [RequestService],
  bootstrap: [AppComponent]
})
export class AppModule {}
