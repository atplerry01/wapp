import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { UtilityService } from 'src/app/shared/service/utility.service';
import { reportType } from '../shared/constants';
import { ICaseCollectionWithPagination } from '../shared/ILoanCollection';
import { collectionHeader } from '../shared/tableHeader';

@Component({
  selector: 'app-loan-reports',
  templateUrl: './loan-reports.component.html',
  styleUrls: ['./loan-reports.component.scss']
})

export class LoanReportsComponent implements OnInit {

  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  selectedReport = '';
  reportTitle = 'Account TurnOver';
  reportHeaders = collectionHeader;
  reportData: any[] = [];

  collectorHeader = [
    {
      name: 'Stage.Stage',
      title: 'Stage',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Action.Action',
      title: 'Action',
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
      name: 'Agent.Name',
      title: 'Agent',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  selectedReportOption = 'AccountTurnOver';

  reportTypes = [
    { code: 'AccountTurnOver', name: 'Account Turn Over' },
    { code: 'ExpiredFacility', name: 'Expired Facility Report' },
    { code: 'FacilityUltil', name: 'Facility Ultilization Report' },
    { code: 'NewlyDisbursed', name: 'Newly Disbursed Report' },
    { code: 'PDO', name: 'PDO Report' }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.reportTitle = 'Account TurnOver';
    this.selectedReport = reportType.accountTurnOver;
    this.getCaseCollections(reportType.accountTurnOver);
  }

  onReportTypeChange = (entity) => {
    if (entity === reportType.accountTurnOver) {
      this.reportTitle = 'Account TurnOver Report';
      this.selectedReport = reportType.accountTurnOver;
      this.getCaseCollections(reportType.accountTurnOver);

    } else if (entity === reportType.expiredFacility) {
      this.reportTitle = 'Expired Facility Report';
      this.selectedReport = reportType.expiredFacility;
      this.getCaseCollections(reportType.expiredFacility);

    } else if (entity === reportType.facilityUltil) {
      this.reportTitle = 'Facility Ultilization Report';
      this.selectedReport = reportType.facilityUltil;
      this.getCaseCollections(reportType.facilityUltil);

    } else if (entity === reportType.newlyDisbursed) {
      this.reportTitle = 'Newly Disbusted Report';
      this.selectedReport = reportType.newlyDisbursed;
      this.getCaseCollections(reportType.newlyDisbursed);

    } else if (entity === reportType.PDO) {
      this.reportTitle = 'PDO Report';
      this.selectedReport = reportType.PDO;
      this.getCaseCollections(reportType.PDO);
    }
  }

  getCaseCollections = (entity) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let endPointUrl;

    if (entity === reportType.accountTurnOver) {
      endPointUrl = `account-turnover?`;

    } else if (entity === reportType.expiredFacility) {
      // 
      endPointUrl = `account-turnover?`;

    } else if (entity === reportType.facilityUltil) {
      //
      endPointUrl = `account-turnover?`;

    } else if (entity === reportType.newlyDisbursed) {
      //
      endPointUrl = `account-turnover?`;

    } else if (entity === reportType.PDO) {
      //
    }

    const url = `${endPointUrl}page=${this.page}&per_page=${this.per_page}`;
    console.log(url);
    // const url = `account-turnover?&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity: ICaseCollectionWithPagination = res.data;

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

  onPageChange(offset) {
    this.page = offset / this.per_page + 1;

    if (this.selectedReport === reportType.accountTurnOver) {
      this.reportTitle = 'Account TurnOver Report';
      this.selectedReport = reportType.accountTurnOver;
      this.getCaseCollections(reportType.accountTurnOver);

    } else if (this.selectedReport === reportType.expiredFacility) {
      this.reportTitle = 'Expired Facility Report';
      this.selectedReport = reportType.expiredFacility;
      this.getCaseCollections(reportType.expiredFacility);

    } else if (this.selectedReport === reportType.facilityUltil) {
      this.reportTitle = 'Facility Ultilization Report';
      this.selectedReport = reportType.facilityUltil;
      this.getCaseCollections(reportType.facilityUltil);

    } else if (this.selectedReport === reportType.newlyDisbursed) {
      this.reportTitle = 'Newly Disbusted Report';
      this.selectedReport = reportType.newlyDisbursed;
      this.getCaseCollections(reportType.newlyDisbursed);

    } else if (this.selectedReport === reportType.PDO) {
      this.reportTitle = 'PDO Report';
      this.selectedReport = reportType.PDO;
      this.getCaseCollections(reportType.PDO);
    }
  }

}
