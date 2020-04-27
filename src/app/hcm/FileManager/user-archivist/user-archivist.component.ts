import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { Subject } from 'rxjs';
import { UtilityService } from 'src/app/shared/service/utility.service';
import { DataService } from './../../../shared/service/data.service';

@Component({
  selector: 'app-user-archivist',
  templateUrl: './user-archivist.component.html',
  styleUrls: ['./user-archivist.component.scss']
})

export class UserArchivistComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  showNotFoundMsg = false;
  isInprogress = false;
  submitLabel = 'Submit Record';

  currentUser = {};

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';

  searchText1 = '';
  searchAccount = '';
  accno = '';
  selectedAccounts: string[] = [];
  requestType = '';

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = { Frequency: 'Daily' };
  accountModel: any = {};

  reportData: any[] = [];

  reportHeader = [
    {
      name: 'RequestUser',
      title: 'RequestUser',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FileName',
      title: 'FileName',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Comment',
      title: 'Comment',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'createdAt',
      title: 'createdAt',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'updatedAt',
      title: 'UpdatedAt',
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
          className: 'col-3',
          type: 'input',
          key: 'FileName',
          templateOptions: {
            label: 'Employee Number'
          }
        },
        {
          className: 'col-9',
          type: 'input',
          key: 'Comment',
          templateOptions: {
            label: 'Reason for request'
          }
        }
      ]
    }
  ];


  selectedReportOption = 'ByHQ';

  reportTypes = [
    { code: 'ByBranch', name: 'By Branch' },
    { code: 'ByHQ', name: 'By Head Office' }
  ];

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.currentUser = this.dataService.getCurrentUser();
    this.getUserRequestLogs();
  }

  // get users request logs
  getUserRequestLogs = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'hcm/user/request-log?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}requestType=${this.requestType}&startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        
        if (res.data) {
          this.reportData = res.data.data;
          this.pre_page = res.data.pre_page;
          this.next_page = res.data.next_page;
          this.totalRecords = res.data.total;
          this.total_pages = res.data.total_pages;
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }


  onSearch(entity) {

  }

  onSearch2(entity) {

  }

  submit() {

    const url = `hcm/user/create-request`;

    this.dataService.Post(this.model, url).subscribe(
      res => {
        this.isInprogress = false;
        // this.newOptions = [];
        if (res.data  === true) {
          this.resetForm();
          this.getUserRequestLogs();
          this.utilityService.showSuccessToast('Request Created', 'File Request Successfully Submitted');
        } else {
          this.utilityService.showErrorToast('Invalid StaffID', 'Something went wrong!');
        }
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

  onReportTypeChange(event) {

  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
