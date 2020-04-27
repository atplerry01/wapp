import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DataService } from 'src/app/shared/service/data.service';
import { IBranch } from './../../../shared/my-interfaces';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-term-deposit',
  templateUrl: './term-deposit.component.html',
  styleUrls: ['./term-deposit.component.scss']
})

export class TermDepositComponent implements OnInit {

  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  branches: IBranch[] = [];
  branchLists: any[] = [];
  selectedBranchOption = 0;

  serviceType = 'all';
  startDate = '';
  endDate = '';

  reportTitle = '';
  reportData: any[] = [];

  reportHeader = [
    {
      name: 'ACCOUNT',
      title: 'ACCOUNT',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NAME',
      title: 'NAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PRODUCT',
      title: 'PRODUCT',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BRANCH',
      title: 'BRANCH',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCOUNTOPENED',
      title: 'ACCOUNTOPENED',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'MATURITY_DATE',
      title: 'MATURITY_DATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'INTEREST_RATE',
      title: 'INTEREST_RATE',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'BALANCE',
      title: 'BALANCE',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'CURRENCY',
      title: 'CURRENCY',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'RM',
      title: 'RM',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FREE_CODE_4',
      title: 'FREE CODE',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'MIS Term Deposit Report';
    this.loadBranchList();
    this.getTermDeposit();
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
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  getTermDeposit = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const endPointUrl = 'term-deposit/reports?';

    const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    console.log(newStartDate);
    console.log(newEndDate);
    console.log(this.serviceType);
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

  onBranchTypeChange = (entity) => {
    this.selectedBranchOption = entity;
  }

  onSearch(entity) {
    this.per_page = entity.per_page;

    if (this.selectedBranchOption === 0 && entity.dateFrom !== '' && entity.dateTo !== '') {
      this.startDate = entity.dateFrom;
      this.endDate = entity.dateTo;
      this.serviceType = 'dateOnly';
    } else if (this.selectedBranchOption !== 0 && entity.dateFrom !== '' && entity.dateTo !== '') {
      this.startDate = entity.dateFrom;
      this.endDate = entity.dateTo;
      this.serviceType = 'dateAndBranchOnly';
    } else if (this.selectedBranchOption !== 0 && entity.dateFrom === '' && entity.dateTo === '') {
      this.serviceType = 'branchOnly';
    } else {
      this.serviceType = 'all';
    }

    this.getTermDeposit();
  }

}
