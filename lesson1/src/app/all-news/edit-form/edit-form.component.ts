import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { News } from '../news';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {
  constructor() { }
 
@Input() itemToEdit?:News;
@Input() isEdit : boolean = false;

  @Output() closeForm: EventEmitter<void> = new EventEmitter();
  @Output() saveNews: EventEmitter<News> = new EventEmitter();
  @Output() updateNews: EventEmitter<News> = new EventEmitter();

  ngOnInit(): void {
  }

  close() {
    this.closeForm.emit();
  }

  save(header: string, date: string) {
    let newNews = new News(0, header, date, false);
    this.saveNews.emit(newNews)
  }

  update(header: string, date:string){
    this.itemToEdit!.header = header;
    this.itemToEdit!.dateTime = date;
    this.updateNews.emit(this.itemToEdit);
  }



}
