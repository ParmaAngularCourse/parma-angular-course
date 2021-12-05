import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Report } from '../news-types';

@Component({
  selector: 'app-edit-report-form',
  templateUrl: './edit-report-form.component.html',
  styleUrls: ['./edit-report-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditReportFormComponent implements OnInit {

  @Output() saveReport: EventEmitter<Report> = new EventEmitter();
  @Input() report!: Report;

  editReportForm!: FormGroup;

  constructor(private fb: FormBuilder) { }
  ngOnInit() { this.initForm(); }

  initForm() {
    this.editReportForm = this.fb.group(this.report);
  }

  submit() {
    this.saveReport.emit(this.editReportForm.value);
  }
}
