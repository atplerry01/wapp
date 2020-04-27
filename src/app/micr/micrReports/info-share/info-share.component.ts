import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IBranch } from './../../../shared/my-interfaces';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';


@Component({
  selector: 'app-info-share',
  templateUrl: './info-share.component.html',
  styleUrls: ['./info-share.component.scss']
})
export class InfoShareComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';

  showForm = false;
  showModalSubmit = false;

  reportTitle = '';
  reportData: any[] = [];
  branches: IBranch[] = [];
  objectLists: any[] = [];
  branchLists: any[] = [];
  showBranchList = false;

  reportHeader = [
    {
      name: 'ACCOUNT_NUMBER',
      title: 'ACCOUNT NUMBER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_NAME',
      title: 'ACCOUNT NAME',
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: 'INITIATING_BRANCH_NAME',
      title: 'INITIATING BRANCH NAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'INIT_BRNCH',
      title: 'INITIATING BRANCH',
      right: false,
      isDate: false,
      isNumber: false
    },
    // {
    //   name: "MICR_DISPATCHED",
    //   title: "MICR DISPATCHED",
    //   right: false,
    //   isDate: false,
    //   isNumber: false
    // },
    // {
    //   name: "MICR_GENERATED",
    //   title: "MICR GENERATED",
    //   right: false,
    //   isDate: false,
    //   isNumber: false
    // },
    {
      name: 'GeneratedDate',
      title: 'GENERATED DATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AssignedDate',
      title: 'ASSIGNED DATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PrintDate',
      title: 'PRINT DATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DispatchDate',
      title: 'DISPATCH DATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NO_OF_BOOKLET',
      title: 'NO OF BOOKLET',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NO_OF_LEAVES',
      title: 'NO OF LEAVES',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'REQUEST_INITIATED',
      title: 'REQUEST INITIATED',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'BRANCH_ACKNOWLEDGE',
      title: 'BRANCH ACKNOWLEDGE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'COLLECTIN_BRANCH_NAME',
      title: 'COLLECTING BRANCH NAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'COLLECTN_BRNCH',
      title: 'COLLECTING BRANCH',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CUSTOMERPICKUPTIME',
      title: 'CUSTOMER PICKUP TIME',
      right: false,
      isDate: true,
      isNumber: false
    },
  ];

  serviceType = 'All';
  selectedBranchOption = 0;

  selectedReportOption = 'All';

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.reportTitle = 'MICR Report';
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;

    this.getInfoshareReports();
  }

  getInfoshareReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'micr/reports/infoshare?';

    const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}serviceType=${this.serviceType}&selectedBranch=${this.selectedBranchOption}&startDate=${newStartDate}&endDate=${newEndDate}&page=${this.page}&per_page=${this.per_page}`;

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

  onPageChange = offset => {
    this.page = offset / this.per_page + 1;
    this.getInfoshareReports();
  }

  ExportDataToExcel() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'micr/reports/infoshare?';
    const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}serviceType=${this.serviceType}&selectedBranch=${this.selectedBranchOption}&startDate=${newStartDate}&endDate=${newEndDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        data.forEach(element => {
          if (
            element.CUSTOMERPICKUPTIME === null ||
            element.CUSTOMERPICKUPTIME === 'null'
          ) {
            element.CUSTOMERPICKUPTIME = null;
          } else {
            element.CUSTOMERPICKUPTIME = moment(
              element.CUSTOMERPICKUPTIME
            ).format('lll');
          }

          if (
            element.BRANCH_ACKNOWLEDGE === null ||
            element.BRANCH_ACKNOWLEDGE === 'null'
          ) {
            element.BRANCH_ACKNOWLEDGE = null;
          } else {
            element.BRANCH_ACKNOWLEDGE = moment(
              element.BRANCH_ACKNOWLEDGE
            ).format('lll');
          }

          if (
            element.MICR_GENERATED === null ||
            element.MICR_GENERATED === 'null'
          ) {
            element.MICR_GENERATED = null;
          } else {
            element.MICR_GENERATED = moment(element.MICR_GENERATED).format(
              'lll'
            );
          }

          if (
            element.MICR_DISPATCHED === null ||
            element.MICR_DISPATCHED === 'null'
          ) {
            element.MICR_DISPATCHED = null;
          } else {
            element.MICR_DISPATCHED = moment(element.MICR_DISPATCHED).format(
              'lll'
            );
          }

          if (
            element.REQUEST_INITIATED === null ||
            element.REQUEST_INITIATED === 'null'
          ) {
            element.REQUEST_INITIATED = null;
          } else {
            element.REQUEST_INITIATED = moment(
              element.REQUEST_INITIATED
            ).format('lll');
          }
        });


        if (res.data) {
          this.excelExporterService.exportAsExcelFile(data, `micr-report`);
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
