import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { productTypes } from './../../../shared/constants/producttypes';
import { IBranch } from './../../../shared/my-interfaces';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-account-mandate',
  templateUrl: './account-mandate.component.html',
  styleUrls: ['./account-mandate.component.scss']
})

export class AccountMandateComponent implements OnInit {

  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  reportTitle = '';
  reportData: any[] = [];

  branches: IBranch[] = [];
  objectLists: any[] = [];
  branchLists: any[] = [];
  showBranchList = false;

  reportHeader = [
    {
      name: 'ACCT_NAME',
      title: 'ACCOUNT NAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FORACID',
      title: 'ACCOUNT NUMBER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCOUNT_TYPE',
      title: 'ACCOUNT TYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'SCHM_DESC',
      title: 'SCHM DESC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'SOL_DESC',
      title: 'SOL DESC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_OPN_DATE',
      title: 'ACCT OPEN DATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'CLR_BAL_AMT',
      title: 'BAL AMOUNT',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_MGR_USER_ID',
      title: 'ACCT MGR',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  serviceType = 'all';
  startDate = '';
  endDate = '';
  selectedBranchOption = 0;
  selectedProductOption = 0;

  selectedReportOption = 'ByBranch';

  reportTypes = [
    { code: 'ByBranch', name: 'By Branch' },
    // { code: 'ByProduct', name: 'By Product' }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'Account Without Mandate';
    this.serviceType = 'ByBranch';
    this.loadBranchList();
    this.showBranchList = true;
  }

  loadBranchList() {
    this.dataService.Get('getBranchList').subscribe(
      res => {
        this.branches = res;
        this.branches.unshift({ branchcode: 0, branch: 'All Branches', zonecode: 0 });

        if (this.branches && this.branches.length > 0) {
          this.branches.forEach(p => {
            this.branchLists.push({ code: p.branchcode, name: p.branch });
          });

          this.objectLists = this.branchLists;
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  onReportTypeChange = (entity) => {
    this.selectedReportOption = entity;

    if (this.selectedReportOption === 'ByBranch') {
      this.showBranchList = true;
      this.selectedBranchOption = 0;
      this.serviceType = 'ByBranch';
      this.objectLists = this.branchLists;
    } else {
      this.serviceType = 'ByProduct';
      this.selectedProductOption = 0;
      this.objectLists = productTypes;
    }
  }

  onBranchTypeChange = (entity) => {
    this.selectedBranchOption = entity;
  }

  onProductTypeChange = (entity) => {
    this.selectedProductOption = entity;
  }

  onSearch(entity) {
    if (this.selectedBranchOption === 0) {
      this.utilityService.showErrorToast('Please select a branch', 'Something went wrong!');
        return null;
    }

    if (this.serviceType === 'ByBranch' && this.selectedBranchOption !== 0) {
      if (entity.dateFrom === '' || entity.dateTo === '') {
        this.utilityService.showErrorToast('Please select date range', 'Something went wrong!');
        return;
      }

      this.startDate = entity.dateFrom;
      this.endDate = entity.dateTo;
      this.serviceType = 'ByBranch';
    } else if (this.serviceType === 'ByProduct' && this.selectedProductOption !== 0) {
      if (entity.dateFrom === '' || entity.dateTo === '') {
        this.utilityService.showErrorToast('Please select date range', 'Something went wrong!');
        return;
      }

      this.startDate = entity.dateFrom;
      this.endDate = entity.dateTo;
      this.serviceType = 'ByProduct';
    }

    this.per_page = entity.per_page;
    this.getAccountWithOutMandate();
  }

  getAccountWithOutMandate = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'control/mandate/reports?';

    const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}serviceType=${this.serviceType}&selectedBranch=${this.selectedBranchOption}&selectedProduct=${this.selectedProductOption}&startDate=${newStartDate}&endDate=${newEndDate}&page=${this.page}&per_page=${this.per_page}`;

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

  onPageChange(offset) {
    this.page = offset / this.per_page + 1;
    this.getAccountWithOutMandate();
  }

  ExportDataToExcel() {

    this.isInprogress = true;

    const endPointUrl = 'control/mandate/reports?';

    const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}serviceType=${this.serviceType}&selectedBranch=${this.selectedBranchOption}&selectedProduct=${this.selectedProductOption}&startDate=${newStartDate}&endDate=${newEndDate}&forceRefresh=true&_export=1`;

    this.dataService.Get(url)
      .subscribe((res) => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `accountmandate-report`);
        }

        this.isInprogress = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }
}
