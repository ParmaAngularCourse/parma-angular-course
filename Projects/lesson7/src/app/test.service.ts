import { Injectable } from '@angular/core';
import { SecondModuleModule } from './second-module/second-module.module';

@Injectable({
  providedIn: 'any'
})
export class TestService {

  data = Math.random();
  constructor() { }

  getData(): number {
    return this.data;
  }
}
