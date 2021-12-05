import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Report, NewsType } from '../news-types';

@Component({
  selector: 'app-edit-report-form',
  templateUrl: './edit-report-form.component.html',
  styleUrls: ['./edit-report-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditReportFormComponent {

  @Output() saveReport: EventEmitter<Report> = new EventEmitter();
  @Input() report!: Report;

  editReportForm!: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnChanges() { this.initForm(); }

  initForm() {
    this.editReportForm = this.fb.group(this.report);
  }

  submit() {
    this.saveReport.emit(this.editReportForm.value);
  }

  newsTypeEnum = NewsType;
}
