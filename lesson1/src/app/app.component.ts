import { Component } from '@angular/core';
import { NewsService } from 'src/services/newsService';
import { Card } from './card/card';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public news :Array<Card> = new NewsService().GetNews();
  title = 'Angular project';
}
