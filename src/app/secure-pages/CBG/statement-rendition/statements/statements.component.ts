import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { ISRCustomerProfilingWithPagination } from '../IStatementRendition';
import { filesEx } from '../utitilities';
import { IAccountStatement } from './../../../../shared/Interface/Banking/IStatementRendition';
import { DataService } from './../../../../shared/service/data.service';
import { UtilityService } from './../../../../shared/service/utility.service';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.scss']
})

export class StatementsComponent implements OnInit {
  showModalSubmit = true;
  model = {};
  isInprogress = false;
  showNotFoundMsg = false;
  accountStatement: IAccountStatement[] = [];
  searchAccount = '';
  reportData = [] = [];
  statementProfiles = [] = [];
  statementHeader = [
    {
      name: 'cifAccount',
      title: 'CifAccount',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'accountName',
      title: 'AccountName',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'primaryEmail',
      title: 'PrimaryEmail',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'docFormat',
      title: 'DocFormat',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'setupDate',
      title: 'setupDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'scheduleTime',
      title: 'ScheduleTime',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'frequency',
      title: 'Frequency',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'status',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  options: FormlyFormOptions = {};
  form = new FormGroup({});
  fields: any[] = [];


  currentAction = '';


  page = 1; // current page
  per_page = 50;
  total_pages = 0;
  totalRecords = 0; // total records

  dateFrom = '';
  dateTo = '';
  cif = '';

  // rejectFields
  showForm = false;
  submitLabel = 'Submit';
  formTitle = '';

  accessKey = '';

  reportTitle = 'Pending Statement Report';
  reportName = 'pending';
  selectedType = 'pending';
  reportNameList = [
    { code: 'pending', name: 'Pending' },
    { code: 'approved', name: 'Approved' }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getStatements(this.reportName);
  }


  formFields = (showComment: boolean): FormlyFieldConfig[] =>  [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'cifAccount',
          templateOptions: {
            label: 'Cif Number',
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.cifAccount'
          // }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'accountName',
          templateOptions: {
            label: 'Account Name',
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.accountName'
          // }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'primaryEmail',
          templateOptions: {
            label: 'PrimaryEmail',
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.primaryEmail'
          // }
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
            label: 'cc Email',
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.cifAccount'
          // }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'bccEmail',
          templateOptions: {
            label: 'Bcc Email',
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.cifAccount'
          // }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'select',
          key: 'docFormat',
          templateOptions: {
            label: 'DocumentType',
            options: filesEx,
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.docFormat'
          // }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'frequency',
          templateOptions: {
            label: 'Frequency',
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.frequency'
          // }
        }
      ]
    },


    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'month',
          hideExpression: (model) => {
            if (model.frequency === 'Monthly') {
              if (this.form.get('month')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('month').markAsUntouched();
              }
              delete model.month;

              return true;
            }

            if (model.frequency === 'Weekly') {
              if (this.form.get('month')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('month').markAsUntouched();
              }
              delete model.month;
              return true;
            }

            if (model.frequency === 'Daily') {
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
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.cifAccount'
          // }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'day',
          templateOptions: {
            label: 'Day'
          },
          expressionProperties: {
            'templateOptions.disabled': 'model.cifAccount'
          },
          hideExpression: (model) => {
            if (model.frequency === 'Weekly') {
              if (this.form.get('day')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('day').markAsUntouched();
              }
              delete model.day;
              return true;
            }

            if (model.frequency === 'Daily') {
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
          type: 'input',
          key: 'weekday',
          templateOptions: {
            label: 'Week Day',
            disabled: true
          },
          // expressionProperties: {
          //   'templateOptions.disabled': 'model.cifAccount'
          // },
          hideExpression: (model) => {

            if (model.frequency === 'Annually') {
              if (this.form.get('weekday')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('weekday').markAsUntouched();
              }
              delete model.weekday;
              return true;
            }

            if (model.frequency === 'Bi-Annually') {
              if (this.form.get('weekday')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('weekday').markAsUntouched();
              }
              delete model.weekday;
              return true;
            }

            if (model.frequency === 'Monthly') {
              if (this.form.get('month')) {
                (this.options.parentForm as any).submitted = false;
                this.form.get('month').markAsUntouched();
              }
              delete model.month;
              return true;
            }

            if (model.frequency === 'Daily') {
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
    },

    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'comment',
          templateOptions: {
            label: 'Comment',
            required:  showComment ? true : false
          }
        }
      ]
    }
  ]


  myAccess($event) {
    this.accessKey = $event.key;
  }

  getStatements(reportType: string) {

    this.showNotFoundMsg = false;
    this.isInprogress = true;

// tslint:disable-next-line: max-line-length
     const url = `get_statement-rendition?type=${reportType}&start=${this.dateFrom}&end=${this.dateTo}&cif=${this.cif}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
           const result: ISRCustomerProfilingWithPagination = res.data;
          this.reportData = result.data;
          this.page = result.page;
          this.per_page = result.per_page;
          this.total_pages = result.total_pages;
          this.totalRecords = result.total;
        this.isInprogress = false;

        if (!this.reportData.length) {
          this.showNotFoundMsg = true;
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getRelatedAcount(id: string) {

    const url = `get_relatedProfiles?profileId=${id}`;

    this.dataService.Get(url).subscribe(
      res => {
        this.statementProfiles = res.data;

        this.showModalSubmit = true;
        if (this.currentAction === 'approved') {
          this.submitLabel = 'Approve';
          this.formTitle = 'Approve Record';
        } else if (this.currentAction === 'reject') {
          this.submitLabel = 'Reject/Remove';
          this.formTitle = 'Reject/Remove Record';
        } else {
          this.showModalSubmit = false;
          this.submitLabel = 'Approve';
          this.formTitle = 'Account Record';
        }

        this.setForm();
        this.showForm = true;

        this.isInprogress = false;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  onSubmit(model: object, type: string) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `approval_statement-rendition?type=${type}`;

    this.dataService.Put(model, url).subscribe(
      res => {
        this.getStatements(this.selectedType);
        this.isInprogress = false;

        const msg = this.currentAction === 'approved' ? 'Approval Successful!' : 'Record succesfully removed';
        this.utilityService.showSuccessToast(msg, 'Success!');
        this.showForm = false;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showForm = false;
      }
    );
  }

  setForm() {
     this.fields = this.formFields(this.currentAction === 'reject');
  }

  submit($event) {
      this.onSubmit($event, this.currentAction);
  }


  onMenuEdit($event) {
      this.currentAction = 'approved';
    this.model = $event;
    this.getRelatedAcount($event.id);
  }

  onSubMenuDelete($event) {
    this.currentAction = 'reject';

    this.model = $event;
    this.getRelatedAcount($event.id);
  }

  onRowSelected($event) {
    this.currentAction = '';
    this.model = $event;
    this.getRelatedAcount($event.id);
  }

  onSearch($event) {
    this.dateFrom = $event.dateFrom;
    this.dateTo = $event.dateTo;
    this.cif = $event.sText1;
    this.getStatements(this.selectedType);
  }

  onReportNameChanged($event) {
    if ($event === 'pending') {
      this.reportTitle = 'Pending Statement Report';
    } else if ($event === 'approved') {
      this.reportTitle = 'Approved Statement Report';
    }

    this.reportData = [];
    this.selectedType = $event;
  }

  onPageChange(offset) {
    this.page = (offset / this.per_page) + 1;
    this.getStatements(this.selectedType);

  }


}
