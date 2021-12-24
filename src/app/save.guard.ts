import { Injectable } from '@angular/core';
import {  CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponentCanDeactivate } from './news/news-types';

@Injectable({
  providedIn: 'root'
})

export class SaveGuard implements CanDeactivate<ComponentCanDeactivate> {
  canDeactivate(component: ComponentCanDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
  
}
