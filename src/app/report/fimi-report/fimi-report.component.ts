import { ExcelExporterService } from './../../shared/service/excel-exporter.service';
import { UtilityService } from 'src/app/shared/service/utility.service';
import { DataService } from 'src/app/shared/service/data.service';
import { IFimiTransaction, IFimiLog } from './../../shared/my-interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fimi-report',
  templateUrl: './fimi-report.component.html',
  styleUrls: ['./fimi-report.component.scss']
})

export class FimiReportComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;
  fimiTransactions: IFimiTransaction[] = [];
  searchAccount = '';

  type = 't';
  page = 1; // current page
  per_page = 50;
  pre_page?: number; // previous
  next_page?: number;
  totalRecords = 0; // total record
  total_pages = 0;

  selectedDateFrom = '';
  selectedDateTo = '';

  fimilogs: IFimiLog[] = [];

  reportData = [] = [];
  reportName = 't'; // c=CASA t=TD
  reportNameList = [{ code: 't', name: 'FIMI Transactions' }, { code: 'l', name: 'FIMI Logs' }];
  reportTitle = 'FIMI Transaction Report';

  reportHeaders = [];

  fimiTransactionHeader = [
    {
      name: 'tranid',
      title: 'TransactionId',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'trandate',
      title: 'Transaction Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'accountno',
      title: 'Account Number',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'accountno_emp',
      title: 'Acc Number Emp',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'accountname',
      title: 'Account Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'amount',
      title: 'Amount',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'status',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  fimiLogHeaders = [
    {
      name: 'idno',
      title: 'idno',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'tranid',
      title: 'TransactionId',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'logdate',
      title: 'Log Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'accountno',
      title: 'Account Number',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'accountno_emp',
      title: 'Acc Number Emp',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'accountname',
      title: 'Account Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'amount',
      title: 'Amount',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'error_desc',
      title: 'Description',
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
    this.getFimiTransactions();
  }

  onSearch($event) {
     this.selectedDateFrom = $event.dateFrom;
     this.selectedDateTo = $event.dateTo;
     this.searchAccount = $event.sText1;
     this.per_page = $event.per_page;

     if (this.reportName === 'l') {
      this.reportTitle = 'FIMI Logs';
      this.reportHeaders = this.fimiLogHeaders;
    } else {
      this.reportTitle = 'FIMI Transactions';
      this.reportHeaders = this.fimiTransactionHeader;
    }
     this.getFimiTransactions();
   }

   getFimiTransactions(_export = 0) {

    this.showNotFoundMsg = false;
    this.isInprogress = true;
    console.log(this.reportName);
    // tslint:disable-next-line:max-line-length
    if (this.reportName === 'l') {
      this.type = 'l';
    } else {
      this.type = 't';
    }


    // tslint:disable-next-line:max-line-length
    const url = `get_fimi?type=${this.type}&datefrom=${ this.selectedDateFrom }&dateto=${this.selectedDateTo}&accno=${this.searchAccount}&export=${_export}`;
    this.dataService.Get(url).subscribe(
      res => {
        if (_export === 1) {
          const reportname = this.type === 'l' ? 'FIMI_LOG' : 'FIMI_TRANSACTIONS';
          this.excelExporterService.exportAsExcelFile(res, `${reportname}${this.selectedDateFrom}_${this.selectedDateTo}`);
        } else {
          if (this.reportName === 'l') {
            const result: IFimiLog[] = res;
            if (result) {
              this.reportHeaders = this.fimiLogHeaders;
              this.reportData = result;
            }
          } else {
            const result: IFimiTransaction[] = res;
            this.reportHeaders = this.fimiTransactionHeader;
            this.reportData = result;
          }
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

  getFimiLogs(_export = 0) {

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    // tslint:disable-next-line:max-line-length
    const url = `get_FimiLog?datefrom=${ this.selectedDateFrom }&dateto=${this.selectedDateTo}&accno=${this.searchAccount}&export=${_export}`;
    this.dataService.Get(url).subscribe(
      res => {

        if ( _export === 1) {
          this.excelExporterService.exportAsExcelFile(res, `FimiLogs_${this.selectedDateFrom}_${this.selectedDateTo}`);
        } else {
          const result: IFimiLog[] = res;
          if (result) {
            this.reportHeaders = this.fimiLogHeaders;
            this.reportData = result;
          }
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

  onExportToExcel() {
    this.getFimiTransactions(1);
  }

  onReportNameChanged($event) {
    if ($event === 'l') {
      this.reportTitle = 'FIMI Logs';
      this.reportHeaders = this.fimiLogHeaders;
      this.reportName = 'l';
      this.getFimiTransactions();
    } else {
      this.reportTitle = 'FIMI Transactions';
      this.reportHeaders = this.fimiTransactionHeader;
      this.reportName = 't';
      this.getFimiTransactions();
    }
  }

  onSort($event) {
    console.log('sort selected:', JSON.stringify($event));
  }

}
