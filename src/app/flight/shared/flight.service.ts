import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  asapScheduler,
  of,
  from,
  interval,
  merge,
  fromEvent
} from 'rxjs';
import { map, share, scan } from 'rxjs/operators';

import { pipe } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RequestService {
  public httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json'
    })
  };
  constructor(private _http: HttpClient) {}

  public read(url): Observable<any> {
    return this._http.get(`${url}`, this.httpOptions).pipe(
      map((res: Response) => {
        if (res) {
          return res;
        } else {
          return null;
        }
      }),
      share()
    );
  }
}
