import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Report, NewsType, newsTypeColors } from '../news-types';
import { Role } from '../roles';

@Component({
  selector: 'app-edit-report-form',
  templateUrl: './edit-report-form.component.html',
  styleUrls: ['./edit-report-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditReportFormComponent {

  constructor(private fb: FormBuilder) { }

  @Output() saveReport: EventEmitter<Report> = new EventEmitter();
  @Input() report!: Report;

  newsTypeColors = newsTypeColors;
  newsTypeEnum = NewsType;
  roleEnum = Role;

  ngOnChanges() { this.editReportForm.patchValue(this.report); }

  editReportForm: FormGroup = this.fb.group({
    header: ["", Validators.required],
    body: ["", [Validators.required, Validators.minLength(3)]],
    timestamp: ["", Validators.required],
    type: [null, Validators.required],
    colNum: null
  });

  submit() {
    this.saveReport.emit(this.editReportForm.value);
  }
}
