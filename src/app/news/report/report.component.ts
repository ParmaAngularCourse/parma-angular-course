import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../auth.service';
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
  canSubmit = this.authService.isAuth();

  constructor(private authService: AuthService) { }

  clickEditButton() {
    this.initReport.emit(this.report);
  }

  clickDeleteButton() {
    this.deleteReport.emit();
  }
}
