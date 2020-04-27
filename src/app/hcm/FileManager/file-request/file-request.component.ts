import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from 'src/app/shared/service/data.service';
import { UtilityService } from 'src/app/shared/service/utility.service';

@Component({
  selector: 'app-file-request',
  templateUrl: './file-request.component.html',
  styleUrls: ['./file-request.component.scss']
})

export class FileRequestComponent implements OnInit {
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
          key: 'ArchivistComment',
          templateOptions: {
            label: 'Comment',
            required: true
          }
        }
      ]
    }
  ];

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

  submitLabel = 'Submit';
  formTitle = '';
  requestType = '';
  startDate = '';
  endDate = '';

  reportData: any[] = [];
  archiveLogs: any[] = [];

  reportHeader = [
    {
      name: 'RequestUser',
      title: 'RequestUser',
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
    }, {
      name: 'IsInShelf',
      title: 'Availability',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'CheckerComment',
      title: 'CheckerComment',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'EmployeeName',
      title: 'EmployeeName',
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
      name: 'Status',
      title: 'Status',
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
      title: 'UpdatedAt',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  selectedCaseCode = 'PendingFileToBeReturned';

  caseTypes = [
    { code: 'AllFiles', name: 'All Files' },
    { code: 'PendingFileCollections', name: 'Pending File Collections' },
    { code: 'PendingFileToBeReturned', name: 'Pending File ToBe Returned' },
    { code: 'History', name: 'History' }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService) { }

  ngOnInit() {
    const myAccess = this.utilityService.getAccessInfo('HCM-FileArchive ArchivistStaffList');

    this.getPendingRequest();
    // if (myAccess.name !== 'No Access') {
    //   this.getPendingRequest();
    //  } else {
    //    this.utilityService.goBack();
    //  }
  }

  onCaseTypeChange(entity) {
    console.log(entity);
    this.selectedCaseCode = entity;
    this.getPendingRequest();
  }

  showRequestBox() {
    this.showForm = true;
    this.currentAction = 'addRequestBox';
    this.setForm();
    this.model = {};
    this.action = 'addRequest';

    this.formTitle = 'File Archives Details';
    this.showModalSubmit = true;
  }

  setForm() {
    switch (this.currentAction) {
      case 'addRequestBox':
        this.fields = this.actionfields;
        break;
      case 'archiveDetail':
        this.fields = this.actionfields;
        break;
      case 'archiveEdit':
        this.fields = this.actionfields;
        break;
      // archiveEditBox
    }
  }

  onReportTypeChanged($event) {
  }

  onDateTypeChanged($event) {
  }

  onSearch($event) {
    this.per_page = $event.per_page;
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

  onRowSelected(entity) {

    this.showForm = true;
    this.currentAction = 'archiveDetail';
    this.model = entity;
    this.setForm();

    this.formTitle = 'File Archives Manager';
    this.currentModalTab = 'archiveDetail';

    if (entity.IsInShelf === false) {
      this.showModalSubmit = false;
      this.actionType = 'ReturnFile';
    } else {
      this.showModalSubmit = true;
      this.actionType = 'FileOut';
    }

    this.getArchviveLog();
  }

  onMenuEdit(entity) {
    this.showForm = true;
    this.currentAction = 'archiveDetail';
    this.model = entity;
    this.setForm();

    this.formTitle = 'File Archives Manager';
    this.currentModalTab = 'archiveDetail';

    if (entity.IsInShelf === false) {
      this.showModalSubmit = true;
      this.actionType = 'ReturnFile';
    } else {
      this.showModalSubmit = true;
      this.actionType = 'FileOut';
    }
    this.getArchviveLog();
  }

  submit($event) {
    if ($event.IsInShelf) {
      this.action = 'GiveOutFile';
    } else {
      this.action = 'ReturnFile';
    }

    this.onSubmit($event, this.action);
  }

  onSubmit(model: any, action: string) {

    console.log(model);

    if (model.BoxNumber === null || model.RackRef === null) {
      this.utilityService.showErrorToast('File Not in Shelf', 'Something went wrong!');
      return;
    }

    if (model.FileDeliveryDate === null && model.IsInShelf === false) {
      this.utilityService.showErrorToast('File Not in Shelf', 'Something went wrong!');
      return;
    }

    let url = '';
    if (model.FileDeliveryDate !== null && model.IsInShelf === false) {
      url = `hcm/archivist/return-file?requestId=${model.requestId}`;
    } else {
      url = `hcm/archivist/giveout-file?requestId=${model.requestId}`;
    }

    console.log(url);
    
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    this.maintainModal = true;

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        const msg = 'Update Successful';
        this.getPendingRequest();
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

  getPendingRequest() {
    this.archiveLogs = [];
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'hcm/archivist/request-log?';
    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}SelectedType=${this.selectedCaseCode}&ActionType=${this.actionType}&selectedFile=${this.model.Id}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        console.log(res.data);
        const entity = res.data;

        if (entity && entity.data.length) {
          console.log('enter')
          if (entity.data.length <= 0 ) {
           
            this.reportData = [];
          }
          
          this.reportData = entity.data;
          this.pre_page = entity.pre_page;
          this.next_page = entity.next_page;
          this.totalRecords = entity.total;
          this.total_pages = entity.total_pages;
        } else {
          console.log('xxx')
          this.reportData = [];
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




  getFileArchives() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'hcm/file-manager/request?';

    const url = `${endPointUrl}requestType=${this.requestType}&startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;

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
