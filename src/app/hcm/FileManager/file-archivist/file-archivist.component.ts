import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from './../../../shared/service/data.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-file-archivist',
  templateUrl: './file-archivist.component.html',
  styleUrls: ['./file-archivist.component.scss']
})

export class FileArchivistComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  reportData: any[] = [];
  archiveLogs: any[] = [];

  actionType = '';

  model: any = {};
  fields: any[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  reportTitle = '';

  submitLabel = 'Submit';
  maintainModal = false;
  showModalSubmit = false;
  showForm = false;
  currentAction = '';

  isFileOut = false;
  isFileIn = false;

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

  selectedCaseCode = 'PendingFileRequest';

  caseTypes = [
    { code: 'PendingFileRequest', name: 'Pending File Request' },
    { code: 'PendingFileReturned', name: 'Pending File Returned ' },
  ];

  constructor(private dataService: DataService,
    public utilityService: UtilityService) { }

  ngOnInit() {
    this.actionType = 'FileOut';
    this.isFileOut = true;

    this.reportTitle = 'Pending File Request';
    this.getPendingRequest();
  }

  getPendingRequest() {
    this.archiveLogs = [];
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'hcm/archivist/request-log?';
    const url = `${endPointUrl}&ActionType=${this.actionType}&selectedFile=${this.model.Id}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        console.log(res.data);
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
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  onCaseTypeChange(entity) {
    if (entity === 'PendingFileRequest') {
      this.reportTitle = 'Pending File Request';
      this.isFileOut = true;
      this.isFileIn = false;
    } else {
      this.reportTitle = 'Pending File Returned';
      this.isFileOut = false;
      this.isFileIn = true;
    }
  }

  onRowSelected(entity) {

    this.showForm = true;
    this.currentAction = 'fileOut';
    this.model = entity;
    this.setForm();

    this.showModalSubmit = false;

    this.getArchviveLog();
  }

  onMenuEdit(entity) {
    this.showForm = true;
    this.currentAction = 'fileOut';
    this.model = entity;
    this.setForm();

    this.showModalSubmit = true;

    if (this.selectedCaseCode === 'PendingFileRequest') {
      this.actionType = 'FileOut';
    } else {
      this.actionType = 'ReturnFile';
    }

    this.getArchviveLog();
  }

  onSubMenuDelete(entity) {
    console.log(entity);
  }

  submit(entity) {

    if (entity.BoxNumber === null || entity.RackRef === null) {
      this.utilityService.showErrorToast('File does not have Ref Box Number ', 'Something went wrong!');
      return;
    }

    if (!entity.IsInShelf) {
      this.utilityService.showErrorToast('File not available in shelf', 'Something went wrong!');
      return;
    }

    if (this.selectedCaseCode === 'PendingFileRequest') {
      this.actionType = 'FileOut';
    } else {
      this.actionType = 'ReturnFile';
    }

    this.onSubmit(entity, this.actionType);
  }

  onSubmit(model: any, action: string) {

    console.log(model);

    this.showNotFoundMsg = false;
    this.isInprogress = true;
    this.maintainModal = true;

    let url = '';

    if (this.selectedCaseCode === 'PendingFileRequest' && action === 'FileOut') {
      url = `hcm/archivist/giveout-file`;
    } else if (this.selectedCaseCode === 'PendingFileReturned' && action === 'ReturnFile') {
      url = `hcm/archivist/return-file?requestId=${''}`;
    }

    // this.dataService.Post(model, url).subscribe(
    //   res => {
    //     this.isInprogress = false;
    //     const msg = 'Update Successful';
    //     this.getPendingRequest();
    //     this.utilityService.showSuccessToast(msg, 'Success!');
    //     this.showForm = false;
    //   },
    //   error => {
    //     this.utilityService.showErrorToast(error, 'Something went wrong!');
    //     this.isInprogress = false;
    //     this.showForm = false;
    //   }
    // );

  }

  setForm() {
    switch (this.currentAction) {
      case 'fileOut':
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
