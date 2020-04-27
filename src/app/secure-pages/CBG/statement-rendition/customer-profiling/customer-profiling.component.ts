import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { filesEx } from '../utitilities';
import { emailRegexFn } from './../../../../shared/constants/regex';
import { DataService } from './../../../../shared/service/data.service';
import { UtilityService } from './../../../../shared/service/utility.service';

@Component({
  selector: 'app-customer-profiling',
  templateUrl: './customer-profiling.component.html',
  styleUrls: ['./customer-profiling.component.scss']
})

export class CustomerProfilingComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  showNotFoundMsg = false;
  isInprogress = false;
  submitLabel = 'Submit Record';

  searchText1 = '';
  searchAccount = '';
  accno = '';
  selectedAccounts: string[] = [];

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = { Frequency: 'Daily' };
  accountModel: any = {};

  reportData: any[] = [];
  statementHeader = [
    {
      name: 'ACCOUNTNAME',
      title: 'Account Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCOUNTNUMBER',
      title: 'Account No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCOUNTTYPEDESC',
      title: 'Account Desc.',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CURRENCY',
      title: 'Currency',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BRANCH',
      title: 'Branch',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'EMAIL',
      title: 'Email',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  newOptions = [];
  fieldLists: FormlyFieldConfig[] = [];

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'AccountNumber',
          templateOptions: {
            label: 'Account Number',
            required: true,
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.AccountNumber'
          // }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'CifAccount',
          templateOptions: {
            label: 'Cif Number',
            required: true,
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.CifAccount'
          // }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountName',
          templateOptions: {
            label: 'Account Name',
            required: true,
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.AccountName'
          // }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'PrimaryEmail',
          templateOptions: {
            label: 'PrimaryEmail (ex: john.doe@gmail.com)',
            required: true,
            disabled: false
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.PrimaryEmail'
          // },
          validators: {
            email: {
              expression: (c) => emailRegexFn(c.value),
              message: (error, field: FormlyFieldConfig) => `"${field.formControl.value}" is not a email`,
            },
          },
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'ccEmail',
          templateOptions: {
            label: 'cc Email'
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'bccEmail',
          templateOptions: {
            label: 'Bcc Email'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'select',
          key: 'DocFormat',
          templateOptions: {
            label: 'DocumentType',
            required: true,
            options: filesEx
          }
        },
        {
          className: 'col-6',
          type: 'select',
          key: 'Frequency',
          templateOptions: {
            label: 'Frequency',
            required: true,
            options: [
              { label: 'Daily', value: 'Daily' },
              { label: 'Weekly', value: 'Weekly' },
              { label: 'Monthly', value: 'Monthly' },
              { label: 'Bi-Annually', value: 'Bi-Annually' },
              { label: 'Annually', value: 'Annually' }
            ],
            valueProp: 'label',
            labelProp: 'value',
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'select',
          key: 'month',
          hideExpression: (model) => {
            if (model.Frequency === 'Monthly') {
              if (this.form.get('month')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('month').markAsUntouched();
              }
              delete model.month;

              return true;
            }

            if (model.Frequency === 'Weekly') {
              if (this.form.get('month')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('month').markAsUntouched();
              }
              delete model.month;
              return true;
            }

            if (model.Frequency === 'Daily') {
              if (this.form.get('month')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('month').markAsUntouched();
              }
              delete model.month;
              return true;
            }

            return false;
          },
          templateOptions: {
            label: 'Month',
            options: [
              { label: 'January', value: 'January' },
              { label: 'Febuary', value: 'Febuary' },
              { label: 'March', value: 'March' },
              { label: 'March', value: 'March' },
              { label: 'May', value: 'May' },
              { label: 'June', value: 'June' },
              { label: 'July', value: 'July' },
              { label: 'August', value: 'August' },
              { label: 'September', value: 'September' },
              { label: 'October', value: 'October' },
              { label: 'November', value: 'November' },
              { label: 'December', value: 'December' },
            ],
            valueProp: 'label',
            labelProp: 'value',
            required: true,
          }
        },
        {
          className: 'col-6',
          type: 'select',
          key: 'day',
          templateOptions: {
            label: 'Day',
            options: [
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' },
              { label: '6', value: '6' },
              { label: '7', value: '7' },
              { label: '8', value: '8' },
              { label: '9', value: '9' },
              { label: '10', value: '10' },
              { label: '11', value: '11' },
              { label: '12', value: '12' },
              { label: '13', value: '13' },
              { label: '14', value: '14' },
              { label: '15', value: '15' },
              { label: '16', value: '16' },
              { label: '17', value: '17' },
              { label: '18', value: '18' },
              { label: '19', value: '19' },
              { label: '20', value: '20' },
              { label: '21', value: '21' },
              { label: '22', value: '22' },
              { label: '23', value: '23' },
              { label: '24', value: '24' },
              { label: '25', value: '25' },
              { label: '26', value: '26' },
              { label: '27', value: '27' },
              { label: '28', value: '28' },
              { label: '29', value: '29' },
              { label: '30', value: '30' },
              { label: '31', value: '31' },
            ],
            valueProp: 'label',
            labelProp: 'value',
            required: true,
          },
          hideExpression: (model) => {
            if (model.Frequency === 'Weekly') {
              if (this.form.get('day')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('day').markAsUntouched();
              }
              delete model.day;
              return true;
            }

            if (model.Frequency === 'Daily') {
              if (this.form.get('day')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('day').markAsUntouched();
              }
              delete model.day;
              return true;
            }

            return false;
          }
        },
        {
          className: 'col-6',
          type: 'select',
          key: 'weekday',
          templateOptions: {
            label: 'Week Day',
            options: [
              { label: 'Monday', value: 'Monday' },
              { label: 'Tuesday', value: 'Tuesday' },
              { label: 'Wednesday', value: 'Wednesday' },
              { label: 'Thursday', value: 'Thursday' },
              { label: 'Friday', value: 'Friday' },
              { label: 'Saturday', value: 'Saturday' },
              { label: 'Sunday', value: 'Sunday' }
            ],
            valueProp: 'label',
            labelProp: 'value',
            required: true,
          },
          hideExpression: (model) => {

            if (model.Frequency === 'Annually') {
              if (this.form.get('weekday')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('weekday').markAsUntouched();
              }
              delete model.weekday;
              return true;
            }

            if (model.Frequency === 'Bi-Annually') {
              if (this.form.get('weekday')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('weekday').markAsUntouched();
              }
              delete model.weekday;
              return true;
            }

            if (model.Frequency === 'Monthly') {
              if (this.form.get('month')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('month').markAsUntouched();
              }
              delete model.month;
              return true;
            }

            if (model.Frequency === 'Daily') {
              if (this.form.get('weekday')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('weekday').markAsUntouched();
              }
              delete model.weekday;
              return true;
            }

            return false;
          }
        }
      ]
    }
  ];

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {}

  getAccountsByAccountNo(accno: string) {
    this.isInprogress = true;

    this.dataService
      .Get(`get_sr_customer_accounts?accno=${accno}`)
      .subscribe(
        res => {

          // if (res.message) {
          //   this.utilityService.showInfoToast(res.message, 'Some Records Found!');
          //  }

         if (!res.data || res.data.length < 1) {
          this.utilityService.showErrorToast('No record', 'No record found!');
          this.isInprogress = false;
          this.cancel();
           return;
         }

          this.reportData = res.data;

          // refill the model
          if (this.reportData.length) {
            const searchAcc = this.reportData.filter(x => x.ACCOUNTNUMBER === this.searchAccount);
            // console.log(this.reportData);
            // console.log( this.searchAccount);
            // console.log(searchAcc);
            if(searchAcc.length) {
              this.model = {
                AccountNumber: this.searchAccount,
                PrimaryEmail: searchAcc[0].EMAIL,
                AccountName: searchAcc[0].ACCOUNTNAME,
                CifAccount: searchAcc[0].CUSTOMERID,
                Frequency: 'Daily'
              };
            }
        }

          this.isInprogress = false;
        },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
  }

  multiSelectedRows($event) {
    if ($event === []) {
    this.selectedAccounts = [];
    } else {
      const sel = $event.map(a => a.ACCOUNTNUMBER);
      this.selectedAccounts = [...sel];
    }
  }

  onSearch($event) {
    if (!$event.sText1 || !Number.isInteger(Number($event.sText1)) || $event.sText1.length !== 10) {
      this.utilityService.showErrorToast('Validation Failed', 'Invalid account number');
      return;
    }

    this.searchAccount = $event.sText1;
    this.getAccountsByAccountNo($event.sText1);
  }

  mulitiEmailValidator(emailString: string): Boolean {
    let allPassed = true;

    const emails = emailString.trim().split(';');
// console.log(emails);
      emails.forEach(email => {
        const tremail = email.trim();

        if (tremail) {
        if (!emailRegexFn(tremail)) {
         // console.log('invalid email: ', tremail);
          allPassed = false;
        }
        }
      });

    return allPassed;
  }

  submit() {

    if (!this.selectedAccounts || this.selectedAccounts.length < 1) {
      this.utilityService.showInfoToast(
        'Please select One or More Associated Account!',
        'Valid Associated Account Required'
      );
      return;
    }

    if (this.model.ccEmail !== undefined) {
      if (!this.mulitiEmailValidator(this.model.ccEmail)) {
        this.utilityService.showInfoToast(
          'Please enter a valid ccEmail(s)!',
          'Valid Email Format Required'
        );
        return;
      }

    }

    if (this.model.bccEmail !== undefined) {
      if (!this.mulitiEmailValidator(this.model.bccEmail)) {
        this.utilityService.showInfoToast(
          'Please select a valid bccEmail!',
          'Valid Email Format Required'
        );
        return;
      }
    }


    if (this.model.CifAccount === undefined) {
      this.utilityService.showInfoToast(
        'Enter Valid CIF!',
        'Valid Account CIF Required'
      );
      return;
    }

    this.model = {
      ...this.model,
      accountList: this.selectedAccounts
    };

    const url = `post_statement-rendition`;

    this.dataService.Post(this.model, url).subscribe(
      res => {
        this.isInprogress = false;
        // this.newOptions = [];
        this.resetForm();
        this.utilityService.showSuccessToast(res.message, 'Statement Profiling Success');
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  cancel() {
    this.resetForm();
    this.reportData = [];
    this.selectedAccounts = [];
  }

  resetForm() {

    this.reportData = [];
  this.searchText1 = '';
    this.model = {
      AccountName: '',
      AccountNumber: '',
      CifAccount: '',
      DocFormat: '',
      Frequency: '',
      PriaryEmail: '',
      PrimaryEmail: '',
      accountList: '',
      bccEmail: '',
      ccEmail: ''
    };

  }


  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
