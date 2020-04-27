import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-part-liquidation',
  templateUrl: './part-liquidation.component.html',
  styleUrls: ['./part-liquidation.component.scss']
})

export class PartLiquidationComponent implements OnInit {

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
  reportDataLog: any[] = [];

  reportHeader = [
    {
      name: 'ACCOUNTNO',
      title: 'ACCOUNTNO',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'ACCT_NAME',
      title: 'ACCT NAME',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'BRANCHCODE',
      title: 'BRANCHCODE',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'DEAL_DATE',
      title: 'DEAL_DATE',
      right: false,
      isDate: true,
      isNumber: false
    }, {
      name: 'INIT_PRINCIPAL_AMT',
      title: 'INIT_PRINCIPAL_AMT',
      right: false,
      isDate: false,
      isNumber: true
    }, {
      name: 'MATURITY_DATE',
      title: 'MATURITY_DATE',
      right: false,
      isDate: true,
      isNumber: false
    }, {
      name: 'VERIFIER',
      title: 'VERIFIER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'INTERESTRATE',
      title: 'INTERESTRATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'SOL_DESC',
      title: 'SOL_DESC',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_OFFICER',
      title: 'ACCT_OFFICER',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'No_Times_PartLiquidated',
      title:'No_Times_PartLiquidated',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  reportHeaderLog = [
    {
      name: 'ACCOUNTNO',
      title: 'ACCOUNTNO',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'DEAL_DATE',
      title: 'DEAL_DATE',
      right: false,
      isDate: true,
      isNumber: false
    }, {
      name: 'INIT_PRINCIPAL_AMT',
      title: 'INIT_PRINCIPAL_AMT',
      right: false,
      isDate: false,
      isNumber: true
    }, {
      name: 'MATURITY_DATE',
      title: 'MATURITY_DATE',
      right: false,
      isDate: true,
      isNumber: false
    }, {
      name: 'PART_CLOSE',
      title: 'PART_CLOSE',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'PART_CLOSE_AMT',
      title: 'PART_CLOSE_AMT',
      right: false,
      isDate: false,
      isNumber: true
    }, {
      name: 'PART_CLOSE_DATE',
      title: 'PART_CLOSE_DATE',
      right: false,
      isDate: true,
      isNumber: false
    }, {
      name: 'REMAINING_TENOR',
      title: 'REMAINING_TENOR',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'TENOR',
      title: 'TENOR',
      right: false,
      isDate: false,
      isNumber: false
    }, {
      name: 'VERIFIER',
      title: 'VERIFIER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'INTERESTRATE',
      title: 'INTERESTRATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_OFFICER',
      title: 'ACCT_OFFICER',
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
    console.log('...');
    this.reportTitle = 'Part Liquidation Report';
    this.getPartLiquidations();
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;

    this.getPartLiquidations();
  }

  getPartLiquidations = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'control/part-liquidation/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;

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

  getPartLiquidationLogs = (entity) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'control/part-liquidation-logs/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}entityId=${entity.ENTITYID}&accountNo=${entity.ACCOUNTNO}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
        console.log(res.data);

        if (res.data) {
          this.reportDataLog = res.data.data;
          console.log(this.reportDataLog);
          // this.pre_page = res.data.pre_page;
          // this.next_page = res.data.next_page;
          // this.totalRecords = res.data.total;
          // this.total_pages = res.data.total_pages;
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

  onRowSelected(entity) {
    this.showForm = true;
    this.getPartLiquidationLogs(entity);
  }

  onPageChange = (offset) => {
    this.page = offset / this.per_page + 1;
    this.getPartLiquidations();
  }

  ExportDataToExcel() {

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'control/part-liquidation/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}startDate=${this.startDate}&endDate=${this.endDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (res.data) {
          this.excelExporterService.exportAsExcelFile(data, `partliquidated-report`);
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
