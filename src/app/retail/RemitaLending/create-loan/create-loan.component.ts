import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DataService } from '../../../shared/service/data.service';
import { UtilityService } from '../../../shared/service/utility.service';
import { ISalaryHistoryData, ISalaryPaymentDetails, LoanCreationForm } from '../interfaces/ISalaryHistory';

@Component({
  selector: 'app-create-loan',
  templateUrl: './create-loan.component.html',
  styleUrls: ['./create-loan.component.scss']
})

export class CreateLoanComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();

  showNotFoundMsg = false;
  isInprogress = false;
  showForm =  false;

  searchPhoneNo = '';

  reportData: ISalaryHistoryData;
  salaryPaymentDetails: ISalaryPaymentDetails[] = [];
  authCode = '';

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


  model: LoanCreationForm;

  // calculatedFieds = {
  //   'model.collectionAmount': `model.loanAmount && model.intRate && model.numberOfRepayments? 
  //   ((Number(model.loanAmount) + (Number(model.loanAmount) * (Number(model.intRate) / 100))) / Number(model.numberOfRepayments)).toFixed(2):null`,
  //   'model.totalCollectionAmount': `model.loanAmount && model.intRate ? 
  //   (Number(model.loanAmount) + (Number(model.loanAmount) * (Number(model.intRate) / 100))).toFixed(2): null`,
  // };

  fields = [
    {
      key: 'loanAmount',
      type: 'input',
      templateOptions: {
        label: 'Loan Amount',
        type: 'number',
        placeholder: 'Enter Loan Amount',
        required: true,
      },      
      // expressionProperties: this.calculatedFieds,
    },
    {
      key: 'numberOfRepayments',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Number Of Repayments',
        placeholder: 'Enter Number Of Repayments',
        required: true
      },
      // expressionProperties: this.calculatedFieds,
    },
    {
      key: 'intRate',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Interest Rate (%)',
        placeholder: 'Enter Interest Rate',
        required: true
      },
      // expressionProperties: this.calculatedFieds,
    },
    {
      key: 'collectionAmount',
      type: 'input',
      templateOptions: {
        label: 'Collection Amount',
        type: 'number',
        placeholder: 'Enter Collection Amount',
        required: true,
        // disabled: true
      },
    },
    {
      key: 'totalCollectionAmount',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Total Collection Amount',
        placeholder: 'Enter Total Collection Amount',
        required: true,
        // disabled: true
      },
    },
    {
      key: 'dateOfCollection',
      type: 'datepicker',
      templateOptions: {
        label: 'Date Of Collection',
        placeholder: 'Pick Date Of Collection',
        required: true
      },
    }

  ];

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) { }

  ngOnInit() {
    this.model = new LoanCreationForm(null, null, null, null, null, null);
  }



  getsalarypaymentHistory(phoneNo: string) {
    this.isInprogress = true;

    this.dataService
      .Get(`getsalarypaymentHistory/${phoneNo}`)
      .subscribe(
        res => {
          this.reportData = res.result.data;

          if (!this.reportData || !this.reportData.salaryPaymentDetails || !this.reportData.salaryPaymentDetails.length) {
            this.isInprogress = false;
            this.showNotFoundMsg = true;
            return;
          }

          this.salaryPaymentDetails = this.reportData.salaryPaymentDetails.map(d => {
            d.customerName = this.reportData.customerName;
            d.accountNumber = this.reportData.accountNumber;
            d.bankCode = this.reportData.bankCode;
            d.bvn = this.reportData.bvn;

              return d;
          });

          this.authCode =  res.authorisationCode;
          this.isInprogress = false;
        },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
  }


  onSearch($event) {
    if (!this.utilityService.isValidPhoneNo($event.sText1)) {
      return;
    }

    this.searchPhoneNo = $event.sText1;
    this.getsalarypaymentHistory($event.sText1);
  }


  submit($event: object) {

    if(moment(this.model.dateOfCollection).isBefore(new Date())){
      this.utilityService.showErrorToast('Date cannot be in the past or today', 'Date Validation Failed!');
      return;
    }
    if(Number(this.model.collectionAmount) >= Number(this.model.totalCollectionAmount)){
      this.utilityService.showErrorToast('Collection Amount cannot be equal or greater than Total Collection Amount', 'Validation Failed!');
      return;
    }

    this.isInprogress = true;

    const param = {
      loanAmount: this.model.loanAmount,
      collectionAmount: this.model.collectionAmount,
      numberOfRepayments: this.model.numberOfRepayments,
      intRate: this.model.intRate,
      totalCollectionAmount: this.model.totalCollectionAmount,
      dateOfCollection: moment(this.model.dateOfCollection).format('DD-MM-YYYY') + ' 00:00:00',
      customerId: this.reportData.customerId,
      customerName: this.reportData.customerName,
      phoneNumber: this.searchPhoneNo,
      accountNumber: this.reportData.accountNumber,
      bankCode: this.reportData.bankCode,
      authCode: this.authCode,
      bvn: this.reportData.bvn
      };

      this.dataService.Post(param, 'remitalending_createloan').subscribe(
        res => {
          this.isInprogress = false;
          // this.newOptions = [];
        this.resetForm();

          this.utilityService.showSuccessToast('Loan successfully created', 'Success');
        },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );

  }

  resetForm() {
    this.closeForm();
    this.reportData = null;
    this.salaryPaymentDetails = [];
    this.searchPhoneNo = '';
    this.authCode = '';
  }

  closeForm() {
    this.showForm = false;
    this.model = new LoanCreationForm(null, null, null, null, null, null);
  }


  ngOnDestroy(): void {

  }

}
