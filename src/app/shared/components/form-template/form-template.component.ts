import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.scss']
})
export class FormTemplateComponent {

  form = new FormGroup({});
  @Input() fields: FormlyFieldConfig[] = [];
  @Input() model = {};
  @Input() submitLabel = 'Submit';
  @Input() showSubmit = true;
  @Input() showClose = true;

  @Output() submitTriggered: EventEmitter<object> = new EventEmitter<object>();
  @Output() closeTriggered: EventEmitter<void> = new EventEmitter<void>();


  submit(model) {
    if (this.form.valid) {
      // send form to server
      this.submitTriggered.emit(model);
    }
   }

   closeForm(event) {
     this.closeTriggered.emit();
   }

}

