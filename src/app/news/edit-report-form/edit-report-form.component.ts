import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Report, NewsType, newsTypeColors } from '../news-types';
import { Role } from '../roles';

@Component({
  selector: 'app-edit-report-form',
  templateUrl: './edit-report-form.component.html',
  styleUrls: ['./edit-report-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditReportFormComponent {

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.editReportForm.statusChanges.subscribe((change: any) => {
      if (this.editReportForm.dirty) this.setIsDirty.emit();
    })
  }

  @Output() saveReport: EventEmitter<Report> = new EventEmitter();
  @Output() setIsDirty: EventEmitter<void> = new EventEmitter();
  @Input() report!: Report;

  newsTypeColors = newsTypeColors;
  newsTypeEnum = NewsType;
  roleEnum = Role;
  canSubmit = this.authService.isAuth();

  ngOnChanges() { this.editReportForm.patchValue(this.report); }

  editReportForm: FormGroup = this.fb.group({
    header: ["", Validators.required],
    body: ["", [Validators.required, Validators.minLength(3)]],
    timestamp: ["", Validators.required],
    type: [null, Validators.required],
    colNum: null,
    id: 0
  });

  templates = [
    { name: 'header', header: 'Заголовок', type: 'text' },
    { name: 'body', header: 'Новость', type: 'text' },
    { name: 'timestamp', header: 'На момент времени', type: 'date' },
    { name: 'type', header: 'Тип новости', type: 'radio', enum: this.newsTypeEnum, colors: this.newsTypeColors }
  ];

  submit() {
    this.saveReport.emit(this.editReportForm.value);
  }
}
