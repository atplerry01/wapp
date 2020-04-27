// tslint:disable-next-line: max-line-length

import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/service/data.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-downtime',
  templateUrl: './downtime.component.html',
  styleUrls: ['./downtime.component.scss']
})

export class DowntimeComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  accountNumber = '';

  reportTitle = '';
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
      title: 'StartTime',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'EndDate',
      title: 'EndTime',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TimeDiff',
      title: 'TimeDiff',
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
    }
  ];

  startDate = '';
  endDate = '';
  selectedSearchQuery = '';

  searchType = {
    noSearch: 'noSearch',
    searchAll: 'searchAll',
    dateRangeOnly: 'dateRangeOnly',
    searchTextOnly: 'searchTextOnly',
  };

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getUserRequestLogs();
  }

  onSearch(events) {
    console.log(events);

    if (events.dateFrom && events.dateTo && events.sText1) {
      // tslint:disable-next-line: max-line-length
      this.selectedSearchQuery = `searchType=${this.searchType.searchAll}&dateFrom=${events.dateFrom}&dateTo=${events.dateTo}&searchText=${events.sText1}`;
    } else if (events.dateFrom && events.dateTo && !events.sText1) {
      this.selectedSearchQuery = `searchType=${this.searchType.dateRangeOnly}&dateFrom=${events.dateFrom}&dateTo=${events.dateTo}`;
    } else if (!events.dateFrom && !events.dateTo && events.sText1) {
      this.selectedSearchQuery = `searchType=${this.searchType.searchTextOnly}&searchText=${events.sText1}`;
    }

    this.getUserRequestLogs()
  }

  getUserRequestLogs = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'itu/downtime?';

    console.log(this.selectedSearchQuery);

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}${this.selectedSearchQuery}&page=${this.page}&per_page=${this.per_page}`;
    console.log(url);

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

  onRowSelected = (entity) => {
    console.log(entity);
    // window.location.href = 'https://google.com';
    window.open(`http://172.27.4.135/FileUpload/uploads/${entity.FilePath}`, "_blank");

  }
}
