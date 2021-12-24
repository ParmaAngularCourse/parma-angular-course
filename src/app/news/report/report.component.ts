import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { newsTypeColors, Report } from '../news-types';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportComponent {
  @Input() report!: Report;
  @Output() initReport: EventEmitter<Report> = new EventEmitter();
  @Output() deleteReport: EventEmitter<void> = new EventEmitter();
  newsTypeColors = newsTypeColors;

  clickEditButton() {
    this.initReport.emit(this.report);
  }

  clickDeleteButton() {
    this.deleteReport.emit();
  }
}
