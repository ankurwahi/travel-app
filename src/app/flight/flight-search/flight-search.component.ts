import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {RequestService} from './../shared/flight.service';
import {Subscription} from 'rxjs';
import {END_POINTS} from './../../app.endpoint';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  private requests$: Subscription;
  public myForm: FormGroup;
  public data: any;
  public searchData: any;
  public cityData: any = [];
  public submitted: boolean;
  public sortOrder: any = 0;

  @Output() searchClick = new EventEmitter<any>();

  constructor(public requestService: RequestService,
              private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      from: [new FormControl(), [<any>Validators.required]],
      to: [new FormControl(), [<any>Validators.required]]
    });

    const _form = {
      from: '',
      to: ''
    };
    // initializes the form
    (<FormGroup>this.myForm).setValue(_form, {onlySelf: true});

    this.requests$ = this.requestService
      .read(END_POINTS.FARES)
      .subscribe(data => {
        this.data = data.deals;
        this.data.map(item => {
          let city = {
            id: item.departure,
            name: item.departure
          };
          if (this.cityData.filter(item => item.id == city.id).length == 0) {
            this.cityData.push(city);
          }
        });


        this.cityData = [...this.cityData];
      });
  }

  sort(sortID) {
    this.sortOrder = sortID;
    this.sortItems();
  }

  save(e, model: any, isValid: boolean) {
    e.preventDefault();
    this.searchData = this.data.filter(
      item => item.departure == model.from && item.arrival == model.to
    );

    this.sortItems();
    let items: any = {
      searchData: this.searchData,
      isSubmitted: true
    }
    this.searchClick.emit(items);
  }

  sortItems() {
    if (this.sortOrder == 0) {
      this.searchData.sort(function (a, b) {
        return a.cost - b.cost
      })
    }
    else {

      this.searchData.sort(function (a, b) {
        let durationA = (a.duration.h * 60) + a.duration.m;
        let durationB = (b.duration.h * 60) + b.duration.m;
        return durationA - durationB
      })
    }
  }
}
