import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { UtilityService } from 'src/app/shared/service/utility.service';

@Component({
  selector: 'app-audit-report',
  templateUrl: './audit-report.component.html',
  styleUrls: ['./audit-report.component.scss']
})

export class AuditReportComponent implements OnInit {

  tableHeaders = [
    { name: 'AccountNumber', title: 'AccountNumber', right: false, isDate: false, isNumber: false },
    { name: 'AccountName', title: 'AccountName', right: false, isDate: false, isNumber: false },
    { name: 'AccountType', title: 'AccountType', right: false, isDate: false, isNumber: false },
    { name: 'CustomerType', title: 'CustomerType', right: true, isDate: false, isNumber: false },
    { name: 'TransactionAmount', title: 'TransactionAmount', right: true, isDate: false, isNumber: false },
    { name: 'TransactionBranchName', title: 'BranchName', right: true, isDate: false, isNumber: false },
    { name: 'DepositMode', title: 'DepositMode', right: true, isDate: false, isNumber: false },
    { name: 'BranchCode', title: 'BranchCode', right: true, isDate: false, isNumber: false },
    { name: 'AccountDomicileBranchName', title: 'DomicileBranch', right: true, isDate: false, isNumber: false },
    { name: 'AuthorizerId', title: 'AuthorizerId', right: true, isDate: false, isNumber: false },
    { name: 'AutomatedReceiptSignedByCustomer', title: 'ReceiptSignedByCustomer', right: true, isDate: false, isNumber: false },
    { name: 'DepositSplitEndorsedWithReleaseStamp', title: 'DepositSplitEndorsedWithReleaseStamp', right: true, isDate: false, isNumber: false },
    { name: 'DepositSplitInstrumentUsed', title: 'DepositSplitInstrumentUsed', right: true, isDate: false, isNumber: false },
    { name: 'DepositSplitTimeStamped', title: 'DepositSplitTimeStamped', right: true, isDate: false, isNumber: false },
    { name: 'ProcessTypeId', title: 'ProcessTypeId', right: true, isDate: false, isNumber: false },
    { name: 'TimeStampedDate', title: 'TimeStampedDate', right: true, isDate: false, isNumber: false },
    { name: 'TimeStampedTime', title: 'TimeStampedTime', right: true, isDate: false, isNumber: false }
  ];

  auditReport = [];
  showNotFoundMsg = false;
  isInprogress = false;

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit() {
    this.getAuditReports();
  }

  getAuditReports() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

   this.dataService.Get(`get_auditTransactionInformationReport`)
     .subscribe((res) => {
      console.log(res);

       if (res) {
        this.auditReport = res.data;
       } else {
         this.showNotFoundMsg = true;
       }

       this.isInprogress = false;
     },
       error => {
         console.log(error);
         this.utilityService.showErrorToast(error, 'Something went wrong!');
         this.isInprogress = false;
       });
  }
}
