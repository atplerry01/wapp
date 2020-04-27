import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/service/data.service';
import { UtilityService } from '../../../shared/service/utility.service';
import { ILoan, ILoanWithPagination, ISalaryHistoryData, ISalaryPaymentDetails } from '../interfaces/ISalaryHistory';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.scss']
})

export class LoanStatusComponent implements OnInit {
  selectedRecord: ILoan = null;
  isInprogress = false;
  showNotFoundMsg = false;
  searchAccount = '';
  reportData: ILoan[] = [];

  salaryHistory: ISalaryHistoryData;
  salaryPaymentDetails: ISalaryPaymentDetails[] = [];


  basicHeader = [
    {
      name: 'customerName',
      title: 'customer Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'phoneNumber',
      title: 'Phone Number',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'accountNumber',
      title: 'Account No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'bankCode',
      title: 'Bank Code',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'loanAmount',
      title: 'Loan Amount',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'numberOfRepayments',
      title: 'No.Repayments',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'intRate',
      title: 'Int.Rate (%)',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'collectionAmount',
      title: 'Collection Amount',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'totalCollectionAmount',
      title: 'Total Col. Amount',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'dateOfCollection',
      title: 'Date.Collection',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'makerId',
      title: 'makerId',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'makerDate',
      title: 'Maker Date',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  checkerHeader = [
    {
      name: 'mandateReference',
      title: 'Mandate Ref.',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'dateOfDisbursement',
      title: 'Date.Disbursement',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'checkerId',
      title: 'checkerId',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'checkerDate',
      title: 'Checker Date',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  stopperHeader = [
    {
      name: 'stoppedby',
      title: 'Stopped by',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'stoppedDate',
      title: 'Stopped Date',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  salaryHistoryHeader = [
    {
      name: 'customerName',
      title: 'Customer Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'accountNumber',
      title: 'Account Number',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'bankCode',
      title: 'Bank Code',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'bvn',
      title: 'BVN',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'paymentDate',
      title: 'Payment Date',
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
    }
  ];

  loanHistoryHeader = [
    {
      name: 'loanProvider',
      title: 'Loan Provider',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'loanAmount',
      title: 'Loan Amount',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'outstandingAmount',
      title: 'Outstanding Amount',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'loanDisbursementDate',
      title: 'Loan Disbursement Date',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'repaymentFreq',
      title: 'Repayment Freq',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];
  
  currentAction = '';


  page = 1; // current page
  per_page = 50;
  total_pages = 0;
  totalRecords = 0; // total records

  dateFrom = '';
  dateTo = '';
  searchPhoneNo = '';

  model: any = {};
  // rejectFields
  showForm = false;
  formTitle = '';

  accessKey = '';

  reportTitle = 'Pending Remita Lending Report';

  selectedType = 'p';
  reportNameList = [
    { code: 'p', name: 'Pending' },
    { code: 'a', name: 'Active' },
    { code: 's', name: 'Stopped' }
  ];

  fields = [
      {
        key: 'comment',
        type: 'input',
        templateOptions: {
          label: 'Comment',
          placeholder: 'Enter reason for rejection'
        }
      }
    ];


  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.getLoans();
  }

  get ReportHeader() {
    let header: any[] = [];

    if (this.selectedType === 'p') {
      header = this.basicHeader;
    } else if (this.selectedType === 'a') {
      header = [...this.basicHeader, ...this.checkerHeader];
    } else if (this.selectedType === 's') {
      header = [...this.basicHeader, ...this.checkerHeader, ...this.stopperHeader];
    }

    return header;
  }

  myAccess($event) {
    this.accessKey = $event.key;
  }

  getLoans() {

    this.showNotFoundMsg = false;
    this.isInprogress = true;

// tslint:disable-next-line: max-line-length
     const url = `remitalending_getloans?type=${this.selectedType}&start=${this.dateFrom}&end=${this.dateTo}&phoneNumber=${this.searchPhoneNo}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url).subscribe(
      res => {
           const result: ILoanWithPagination = res.data;
          this.reportData = result.data;
          this.page = result.page;
          this.per_page = result.per_page;
          this.total_pages = result.total_pages;
          this.totalRecords = result.total;
        this.isInprogress = false;

        if (!this.reportData.length) {
          this.showNotFoundMsg = true;
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getsalarypaymentHistory(phoneNo: string) {
    this.isInprogress = true;

    this.dataService
      .Get(`getsalarypaymentHistory/${phoneNo}`)
      .subscribe(
        res => {
          this.salaryHistory = res.result.data;

          if (!this.salaryHistory || !this.salaryHistory.salaryPaymentDetails || !this.salaryHistory.salaryPaymentDetails.length) {
            this.isInprogress = false;
            this.showNotFoundMsg = true;
            return;
          }

          this.salaryPaymentDetails = this.salaryHistory.salaryPaymentDetails.map(d => {
            d.customerName = this.salaryHistory.customerName;
            d.accountNumber = this.salaryHistory.accountNumber;
            d.bankCode = this.salaryHistory.bankCode;
            d.bvn = this.salaryHistory.bvn;

              return d;
          });

          this.isInprogress = false;
        },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
  }


  onSubmit() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let url = '';
    if ( this.currentAction === 'a') {
      url = 'loanDisburmentNotification'; // disburse service
    } else if ( this.currentAction === 's') {
      url = 'stopLoanCollection'; // stop service
    } else if ( this.currentAction === 'r') {
      url = 'remitalending_deleteloan'; // reject service
    }

    const param = {
      id: this.selectedRecord.id,
      comment: this.model.comment
    };

    this.dataService.Post(param, url).subscribe(
      res => {

        this.isInprogress = false;

          const indx = this.reportData.findIndex(d => d.id === this.selectedRecord.id);
          this.reportData.splice(indx, 1);

          this.utilityService.showSuccessToast('Action completed successfully.', 'Success!');
        this.showForm = false;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showForm = false;
      }
    );
  }


  submit($event) {
    if (this.currentAction === 'r' && !this.model.comment) {
      this.utilityService.showErrorToast('Comment is required for rejection', 'Validation Failed!');
      return;
    }
      this.onSubmit();
  }


  onMenuEdit($event) {
    if (this.selectedType === 'p') {
      this.currentAction = 'a';
      this.formTitle = 'Approve Loan';
    } else if (this.selectedType === 'a') {
      this.currentAction = 's';
      this.formTitle = 'Stop Loan';
    }

    this.selectedRecord = $event;
    this.showForm = true;
  }

  onSubMenuDelete($event) {
    this.currentAction = 'r';
    this.formTitle = 'Reject Loan';
    this.selectedRecord = $event;
    this.showForm = true;
  }

  onRowSelected($event) {
    this.selectedRecord = $event;
   this.getsalarypaymentHistory(this.selectedRecord.phoneNumber);
  }

  closeSalaryHistory() {
    this.salaryHistory = null;
    this.salaryPaymentDetails = [];
  }

  onSearch($event) {
    this.dateFrom = $event.dateFrom;
    this.dateTo = $event.dateTo;
    this.searchPhoneNo = $event.sText1;
    this.getLoans();
  }

  onReportNameChanged($event) {
    if ($event === 'p') {
      this.reportTitle = 'Pending Remita Lending Report';
    } else if ($event === 'a') {
      this.reportTitle = 'Active Remita Lending Report';
    } else if ($event === 's') {
      this.reportTitle = 'Stopped Remita Lending Report';
    }

    this.reportData = [];
    this.selectedType = $event;
  }

  onPageChange(offset) {
    this.page = (offset / this.per_page) + 1;
    this.getLoans();

  }


}
