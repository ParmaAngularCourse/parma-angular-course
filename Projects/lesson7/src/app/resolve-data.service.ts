import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

interface DataObj {
  id: number,
  title: string,
  body: string
};

@Injectable({
  providedIn: 'root'
})
export class ResolveDataService implements Resolve<DataObj[]> {

  constructor(private http: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<DataObj[]> {
    return this.http.get<DataObj[]>('/api/posts').pipe(
      delay(3000)
    );    
  }
}
