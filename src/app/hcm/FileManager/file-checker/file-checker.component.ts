import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from 'src/app/shared/service/data.service';
import { UtilityService } from 'src/app/shared/service/utility.service';

@Component({
  selector: 'app-file-checker',
  templateUrl: './file-checker.component.html',
  styleUrls: ['./file-checker.component.scss']
})

export class FileCheckerComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 100;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  maintainModal = false;
  showModalSubmit = false;
  showForm = false;
  showEscalationButton = false;
  showCloseButton = false;
  showToggleButton = false;
  hasFollowUpStatus = false;
  showArchiveBox = false;

  currentModalTab = '';
  currentAction = '';
  action = '';
  selectedCaseId = '';
  selectedModel = '';
  updateTitle = '';
  actionType = '';

  model: any = {};
  fields: any[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  actionfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'CheckerComment',
          templateOptions: {
            label: 'Comment',
            required: true
          }
        }
      ]
    }
  ];

  submitLabel = 'Submit';
  formTitle = '';

  reportData: any[] = [];
  archiveLogs: any[] = [];

  
  archiveLogHeader = [
    {
      name: 'ActionType',
      title: 'ActionType',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BoxNumber',
      title: 'BoxNumber',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'RackRef',
      title: 'RackRef',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ActionAgent',
      title: 'ActionAgent',
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
      isDate: true,
      isNumber: false
    },
    {
      name: 'updatedAt',
      title: 'updatedAt',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  reportFileHeaders = [
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
      isDate: true,
      isNumber: false
    },
    {
      name: 'updatedAt',
      title: 'updatedAt',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  selectedReportOption = 'all';

  reportTypeList = [
    { code: 'all', name: 'All Staffs' },
    { code: 'active', name: 'Active Staffs' },
    { code: 'ex', name: 'Ex Staffs' }
  ];


  constructor(
    private dataService: DataService,
    public utilityService: UtilityService) { }

  ngOnInit() {
    const myAccess = this.utilityService.getAccessInfo('HCM-FileArchive Supervisor');

    // if (myAccess.name !== 'No Access') {
    //    this.getPendingRequests();
    //  } else {
    //    this.utilityService.goBack(); //.goBack();
    //  }

    this.getPendingRequests();
    
  }

  get reportHeaders() {
    return this.reportFileHeaders;
  }

  setForm() {
    switch (this.currentAction) {
      case 'archiveDetail':
        this.fields = this.actionfields; // this.actionfields;
        break;
      case 'archiveEdit':
        this.fields = this.actionfields;
        break;
      // archiveEditBox
    }
  }

  onSearch($event) {
    this.per_page = $event.per_page;
  }

  onRowSelected(entity) {
    this.showForm = true;
    this.currentAction = 'archiveDetail';
    this.setForm();
    this.model = entity;

    this.formTitle = 'File Archives Manager';
    this.currentModalTab = 'archiveDetail';
    this.showModalSubmit = false;
    this.actionType = 'UpdateBox';

    // this.getArchviveLog();
  }

  onMenuEdit(entity) {
    this.showForm = true;
    this.currentAction = 'archiveEdit';
    this.setForm();
    this.model = entity;
    this.action = 'UpdateAction';

    this.formTitle = 'Request Approval';
    this.currentModalTab = 'archiveEdit';
    this.showModalSubmit = true;
    this.updateTitle =  'Request Approval';
    this.actionType = 'Approval';

    // this.getArchviveLog();
  }

  onMenuDelete(entity) {
    this.showForm = true;
    this.currentAction = 'archiveEdit';
    this.setForm();
    this.model = entity;
    this.action = 'UpdateAction';

    this.currentModalTab = 'archiveEdit';
    this.showModalSubmit = true;
    this.updateTitle =  'Decline Request';
    this.actionType = 'Decline';
  }

  submit($event) {
    this.onSubmit($event);
  }

  onSubmit(model: any) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    this.maintainModal = true;

    let url = `hcm/checker/request-approval`;

    const newModel = {
      ...model,
      Action: this.actionType
    };

    this.dataService.Post(newModel, url).subscribe(
      res => {
        this.isInprogress = false;
        const msg = 'Update Successful';
        this.getPendingRequests();
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

  getPendingRequests() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'hcm/checker/request-log?';
    const url = `${endPointUrl}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity = res.data;

        if (entity && entity.data.length) {
          this.reportData = entity.data;
          this.pre_page = entity.pre_page;
          this.next_page = entity.next_page;
          this.totalRecords = entity.total;
          this.total_pages = entity.total_pages;
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


}
