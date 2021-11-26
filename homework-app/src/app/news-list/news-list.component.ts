import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { News } from './news-types';
import { MatDialog } from '@angular/material/dialog';
import { NewsEditformComponent } from './news-editform/news-editform.component';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsListComponent implements OnInit {

  public allNews: News[] = [
    {
      id: 1,
      date: new Date(2021,10,17),
      title: 'В Бразилии обнаружены останки редкого вида беззубых динозавров',
      text: 'Беззубые динозавры не так страшны, как те, что с зубами',
      selected: false
    },
    {
      id: 2,
      date: new Date(2021,10,18),
      title: 'В Германии вырастили гриб со вкусом и ароматом земляники',
      text: 'Планируются эксперименты с вареньем из грибов',
      selected: false
    },
    {
      id: 3,
      date: new Date(2021,10,19),
      title: 'Трение человеческой кожи оказалось идеальным для щелчков пальцами',
      text: 'Отличная кожа, повезло нам',
      selected: false
    }
  ];

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onRemoveNews($event: number) {
    this.allNews = this.allNews.filter(item => item.id !== $event);
  }

  openCreateNewsDialog() {
    const dialogRef = this.dialog.open(NewsEditformComponent);

    const subOnSaveNews = dialogRef.componentInstance.saveNews.subscribe(($newsToAdd: News) => {
      $newsToAdd.id = Math.max(...(this.allNews.map(el => el.id))) + 1;
      this.allNews.push($newsToAdd);
      this.cdr.detectChanges();
    })

    dialogRef.afterClosed().subscribe(result => {
      subOnSaveNews.unsubscribe();
    });
  }
}
