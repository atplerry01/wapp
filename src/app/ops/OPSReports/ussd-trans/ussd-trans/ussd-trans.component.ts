import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ExcelExporterService } from './../../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../../shared/service/utility.service';

@Component({
  selector: 'app-ussd-trans',
  templateUrl: './ussd-trans.component.html',
  styleUrls: ['./ussd-trans.component.scss']
})
export class UssdTransComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';
  searchText = '';
  selectedSearchQuery = '';

  reportTitle = '';
  reportData: any[] = [];

  searchType = {
    noSearch: 'noSearch',
    searchAll: 'searchAll',
    dateRangeOnly: 'dateRangeOnly',
    searchTextOnly: 'searchTextOnly',
  };
  // selectedBranchOption = 0;
  // branches: IBranch[] = [];
  // objectLists: any[] = [];
  // branchLists: any[] = [];

  reportHeader = [
    {
      name: 'SourceAccountNumber',
      title: 'SourceAccountNumber',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DestinationAccountNumber',
      title: 'DestinationAccountNumber',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DestinationBank',
      title: 'DestinationBank',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TransactionStatus',
      title: 'TransactionStatus',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Amount',
      title: 'Amount',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TransactionDate',
      title: 'TransactionDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'TransactionDescription',
      title: 'TransactionDescription',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Narration',
      title: 'Narration',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PhoneNumber',
      title: 'PhoneNumber',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TransactionType',
      title: 'TransactionType',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ResponseCode',
      title: 'ResponseCode',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ResponseDescription',
      title: 'ResponseDescription',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'UniqueIdentifier',
      title: 'UniqueIdentifier',
      right: false,
      isDate: false,
      isNumber: false
    },
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'USSD Transaction Report';
    this.getUssdTransReports();
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateFrom;
    this.searchText = entity.sText1;

    console.log(entity);

    if (entity.dateFrom && entity.sText1) {
      // tslint:disable-next-line: max-line-length
      this.selectedSearchQuery = `searchType=${this.searchType.searchAll}&dateFrom=${entity.dateFrom}&dateTo=${entity.dateFrom}&searchText=${entity.sText1}`;
    } else if (entity.dateFrom && !entity.sText1) {
      this.selectedSearchQuery = `searchType=${this.searchType.dateRangeOnly}&dateFrom=${entity.dateFrom}&dateTo=${entity.dateFrom}`;
    } else if (!entity.dateFrom && entity.sText1) {
      this.selectedSearchQuery = `searchType=${this.searchType.searchTextOnly}&searchText=${entity.sText1}`;
    }

    console.log(this.selectedSearchQuery);
    
    this.getUssdTransReports();
  }

  getUssdTransReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    /// api/v1/itu/reports/ussd-trans
    const endPointUrl = 'ops/ussd-trans/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}${this.selectedSearchQuery}&page=${this.page}&per_page=${this.per_page}`;
    console.log(url);

    this.dataService.Get(url).subscribe(
      res => {
        console.log(res.data);

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
    this.getUssdTransReports();
  }

  ExportDataToExcel() {
    this.isInprogress = true;

    const endPointUrl = 'ops/ussd-trans/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}${this.selectedSearchQuery}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;
        console.log(res.data);

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `ussd-trans-report`
          );
        }

        this.isInprogress = false;
      },
      error => {
        // console.log(error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }
}
