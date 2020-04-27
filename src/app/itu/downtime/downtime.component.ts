import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import * as moment from 'moment';
import { DataService } from './../../shared/service/data.service';
import { UtilityService } from './../../shared/service/utility.service';

@Component({
  selector: 'app-downtime',
  templateUrl: './downtime.component.html',
  styleUrls: ['./downtime.component.scss']
})
export class DowntimeComponent implements OnInit {

  showNotFoundMsg = false;
  isInprogress = false;
  submitLabel = 'Submit Record';

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';

  form = new FormGroup({});
  options: FormlyFormOptions = {};
  model: any = { Frequency: 'Daily' };

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'datepicker',
          key: 'Date',
          templateOptions: {
            label: 'Date'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'Issues',
          templateOptions: {
            label: 'Issues'
          }
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'ServiceImpacted',
          templateOptions: {
            label: 'Service Impacted'
          }
        }
      ]
    }, {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'Responsibility',
          templateOptions: {
            label: 'Responsibility',
            required: true,
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'StartDate',
          templateOptions: {
            label: 'Start Time (13:00)',
            required: true,
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'EndDate',
          templateOptions: {
            label: 'End Time (23:59)',
            required: true,
            disabled: false
          },
        }
      ]
    }
  ];

  reportData: any[] = [];
  reportHeader = [
    {
      name: 'Date',
      title: 'Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'Issues',
      title: 'Issues',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ServiceImpacted',
      title: 'ServiceImpacted',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Responsibility',
      title: 'Responsibility',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'StartDate',
      title: 'StartDate',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'EndDate',
      title: 'EndDate',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FilePath',
      title: 'FilePath',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'createdBy',
      title: 'createdBy',
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

  selectedFile: File = null;

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getUserRequestLogs();
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  submit() {
    const url = `http://172.27.4.135/FileUpload/api/FimiUpload/downtime`;

    if (!this.selectedFile || !this.selectedFile.name) {
      this.submitRequest();
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    this.dataService.PostExtFiles(this.selectedFile, url).subscribe(
      res => {
        console.log(res);

        this.model.FilePath = res.fileName;
        this.submitRequest();

        this.isInprogress = false;
        this.utilityService.showSuccessToast(res.message, 'File Upload Success');
      },
      error => {
        console.log(error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  submitRequest() {

    this.model.Date = moment(this.model.Date).format('YYYY-MM-DD');

    const url = `itu/downtime`;

    this.dataService.Post(this.model, url).subscribe(
      res => {
        console.log('--->', res.data);
        this.isInprogress = false;
        // // this.newOptions = [];
        if (res.data === true) {
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

  getUserRequestLogs = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'itu/top-downtime?';

    this.dataService.Get(endPointUrl).subscribe(
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

  resetForm() {

    this.model = {
      Date: '',
      StartDate: '',
      EndDate: '',
      Issues: '',
      ServiceImpacted: '',
      Responsibility: '',
    };

  }

  cancel() {

  }
}
