import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from 'src/app/shared/service/data.service';
import { UtilityService } from 'src/app/shared/service/utility.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})

export class FileManagerComponent implements OnInit {
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
  searchText = '';

  model: any = {};
  fields: any[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  boxUpdatefields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'BoxNumber',
          templateOptions: {
            label: 'Box Number',
            required: true
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'RackRef',
          templateOptions: {
            label: 'Rack Reference',
            required: true
          }
        },
        {
          className: 'col-12',
          type: 'input',
          key: 'Comment',
          templateOptions: {
            label: 'Comment',
            required: true
          }
        }
      ]
    }
  ];

  actionfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'CollectionAgent',
          templateOptions: {
            label: 'Collection Agent',
            required: true
          }
        },
        {
          className: 'col-12',
          type: 'input',
          key: 'Comment',
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
      name: 'fullname',
      title: 'EmployeeName',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'employee_number',
      title: 'EmployeeNumber',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'employment_date',
      title: 'employment_date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'IsInShelf',
      title: 'Available',
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
      name: 'BoxNumber',
      title: 'BoxNumber',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'mobile_phone',
      title: 'mobile_phone',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'email',
      title: 'Email',
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
    // const myAccess = this.utilityService.getAccessInfo('HCM-FileArchive ArchivistStaffList');
    this.getFileArchives();

    // if (myAccess.name !== 'No Access') {
    //   this.getFileArchives();
    //  } else {
    //    this.utilityService.goBack();
    //  }
  }

  get reportHeaders() {
    return this.reportFileHeaders;
  }

  setForm() {
    switch (this.currentAction) {
      case 'archiveDetail':
        this.fields = []; // this.actionfields;
        break;
      case 'archiveEditBox':
        this.fields = this.boxUpdatefields;
        break;
      case 'archiveEdit':
        this.fields = this.actionfields;
        break;
      // archiveEditBox
    }
  }

  onReportTypeChanged($event) {
    // this.reportType = $event;
  }

  onDateTypeChanged($event) {
    // this.dateType = $event;
  }

  onSearch($event) {
    this.per_page = $event.per_page;
    this.searchText = $event.sText1;

    this.getFileArchives();
  }

  onPageChange(offset) {
    this.page = (offset / this.per_page) + 1;
    this.getFileArchives();
  }

  toggleBoxUpdate() {
    this.showArchiveBox = this.showArchiveBox ? false : true;
    this.showModalSubmit = true;

    if (this.showArchiveBox) {
      this.currentAction = 'archiveEditBox';
      this.action = 'UpdateBox';
    } else {
      this.action = 'updateAction';
      this.currentAction = 'archiveDetail';
    }

    this.setForm();
  }

  onExportToExcel() {
    this.getFileArchives();
  }

  onMenuEdit(entity) {
    this.showForm = true;
    this.currentAction = 'archiveEdit';
    this.setForm();
    this.model = entity;
    this.action = 'UpdateAction';

    this.formTitle = 'File Archives Details';
    this.currentModalTab = 'archiveEdit';
    this.showModalSubmit = true;

    if (entity.IsInShelf === true) {
      this.updateTitle = this.actionType = 'Collection';
      this.actionType = 'Collection';
    } else {
      this.updateTitle = this.actionType = 'Return';
      this.actionType = 'Return';
    }

    this.getArchviveLog();
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

    this.getArchviveLog();
  }

  submit($event) {
    this.onSubmit($event, this.action);
  }

  onSubmit(model: any, action: string) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    this.maintainModal = true;

    let url;

    if (action === 'UpdateBox') {
      model = { ...model, ActionType: 'UpdateBox' };
      url = `hcm/update-box`;
    } else if (action === 'UpdateAction') {
      model = { ...model, ActionType: this.updateTitle };
      url = `hcm/update-archive`;
    }

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        const msg = 'Update Successful';

        // // TODO:
        // if (action === 'UpdateBox') {
        //   this.getArchviveLog();
        // }

        this.getArchviveLog();
        this.getFileArchives(); // TODO:
        this.utilityService.showSuccessToast(msg, 'Success!');

        if (!this.maintainModal) {
          this.showForm = false;
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showForm = false;
      }
    );


  }

  getFileArchives() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'hcm/file-archives?';

    const url = `${endPointUrl}&searchText=${this.searchText}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity = res.data;
        console.log(entity);
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

  getArchviveLog() {
    this.archiveLogs = [];
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'hcm/file-archivelogs?';
    const url = `${endPointUrl}&ActionType=${this.actionType}&selectedFile=${this.model.Id}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity = res.data;

        if (entity && entity.data.length) {
          this.archiveLogs = entity.data;
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
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }


}
