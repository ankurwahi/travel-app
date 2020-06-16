import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public searchData: any = [];
  public sortOrder: number;
  title = 'flight-search-ang';

  onSearchClick(data) {
    this.searchData = data;
  }
}
