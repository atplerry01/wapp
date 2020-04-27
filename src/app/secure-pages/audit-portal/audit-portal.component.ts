import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { DataService } from 'src/app/shared/service/data.service';
import { UtilityService } from 'src/app/shared/service/utility.service';

@Component({
  selector: 'app-audit-portal',
  templateUrl: './audit-portal.component.html',
  styleUrls: ['./audit-portal.component.scss']
})
export class AuditPortalComponent implements OnInit {
  showNotFoundMsg = false;
  isInprogress = false;
  submitLabel = 'Submit Audit';

  form = new FormGroup({});

  model2 = {
    TransactionDate: '11-Dec-2018',
    AccountNumber: '0234839234',
    TransactionId: '997923792739',
    AccountType: 'Alat Account',
    CustomerType: 'Staff',
    TransactionAmount: '10000',
    AccountName: 'Olukunle Abolade',
    DepositMode: 'Cash',
    TransactionPlatform: 'Branch',
    BranchCode: '201',
    TransactionBranchName: 'Alat Branch',
    InitiatorId: 'olukunle.abolade',
    InitiatorName: 'Olukunle Abolade',
    DateRequestWasInitiated: '11-Dec-2018',
    TimeRequestWasInitiated: '8:00',
    AuthorizerId: 'olanrewaju.akinsanya',
    AuthorizerName: 'Olanrewaju Akinsanya',
    DateRequestWasAuthorized: '11-Dec-2018',
    TimeRequestWasAuthorized: '9:00',
    AccountDomicileCode: '301',
    AccountDomicileBranchName: 'Marina Branch',
    DepositSplitInstrumentUsed: false,
    DepositSplitInstrumentCompletedAccurately: false,
    DepositSplitEndorsedWithReleaseStamp: false,
    AutomatedReceiptSignedByCustomer: false,
    DepositSplitTimeStamped: false,
    TimeStampedTime: '',
    TimeStampedDate: '',
    ProcessTypeId: '1',
    AuditCommented: ''
  };

  model = {};

  url = '';
  processTypes = [];
  selectedProcess: any = '';
  selectedProcessType = '';
  selectedProcessTypeCode = 5;
  accountNumber = '';
  transactionDate = '';
  transactionId = '';
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [];

  accountOpened: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountNumber',
          templateOptions: {
            label: 'Account Number'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountName'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountName',
          templateOptions: {
            label: 'Account Name'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountNumber'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountOpenDate',
          templateOptions: {
            label: 'AcctOpnDate'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountSol',
          templateOptions: {
            label: 'AcctSol'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountName'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountSolDescription',
          templateOptions: {
            label: 'AcctSolDec'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountNumber'
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<hr /><div><h3>Additional Information</h3></div>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentUsed',
          templateOptions: {
            label: 'Deposit Split Instrument Used'
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'AcctSol',
          templateOptions: {
            label: 'AcctSol'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuditCommented',
          templateOptions: {
            label: 'Comment',
            max: 99999,
            min: 0
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentCompletedAccurately',
          templateOptions: {
            label: 'Deposit Split Instrument Completed Accurately'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedTime',
          templateOptions: {
            label: 'TimeStampedTime'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitEndorsedWithReleaseStamp',
          templateOptions: {
            label: 'DepositSplitEndorsedWithReleaseStamp'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedDate',
          templateOptions: {
            label: 'TimeStampedDate'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'AutomatedReceiptSignedByCustomer',
          templateOptions: {
            label: 'AutomatedReceiptSignedByCustomer'
          }
        }
      ]
    }
  ];

  reactivatedAccount: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountName',
          templateOptions: {
            label: 'Account Number'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountName'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountNumber',
          templateOptions: {
            label: 'Account Name'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountNumber'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TransferType',
          templateOptions: {
            label: 'Funds Transfer Type'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransferType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountType',
          templateOptions: {
            label: 'Account Type'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TransactionAmount',
          templateOptions: {
            label: 'Transaction Amount'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionAmount'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TransactionPlatform',
          templateOptions: {
            label: 'Transaction Platform'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionPlatform'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'BranchCode',
          templateOptions: {
            label: 'BranchCode'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TransactionBranchName',
          templateOptions: {
            label: 'TransactionBranchName'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionAmount'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TransactionId',
          templateOptions: {
            label: 'TransactionId'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionPlatform'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatorId',
          templateOptions: {
            label: 'InitiatorId'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'DateRequestWasInitiated',
          templateOptions: {
            label: 'DateRequestWasInitiated'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionAmount'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TimeRequestWasInitiated',
          templateOptions: {
            label: 'TimeRequestWasInitiated'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionPlatform'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatorName',
          templateOptions: {
            label: 'InitiatorName'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'DateRequestWasAuthorized',
          templateOptions: {
            label: 'DateRequestWasAuthorized'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionAmount'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TimeRequestWasAuthorized',
          templateOptions: {
            label: 'TimeRequestWasAuthorized'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionPlatform'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AuthorizerName',
          templateOptions: {
            label: 'AuthorizerName'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountDomicileCode',
          templateOptions: {
            label: 'AccountDomicileCode'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionAmount'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountDomicileBranchName',
          templateOptions: {
            label: 'AccountDomicileBranchName'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransactionPlatform'
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<hr /><div><h3>Additional Information</h3></div>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentUsed',
          templateOptions: {
            label: 'Deposit Split Instrument Used'
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitTimeStamped',
          templateOptions: {
            label: 'Deposit Split Time Stamped'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuditCommented',
          templateOptions: {
            label: 'Comment',
            max: 99999,
            min: 0
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentCompletedAccurately',
          templateOptions: {
            label: 'Deposit Split Instrument Completed Accurately'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedTime',
          templateOptions: {
            label: 'TimeStampedTime'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitEndorsedWithReleaseStamp',
          templateOptions: {
            label: 'DepositSplitEndorsedWithReleaseStamp'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedDate',
          templateOptions: {
            label: 'TimeStampedDate'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'AutomatedReceiptSignedByCustomer',
          templateOptions: {
            label: 'AutomatedReceiptSignedByCustomer'
          }
        }
      ]
    }
  ];

  closedAccount: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountNo',
          templateOptions: {
            label: 'Account Number'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountName',
          templateOptions: {
            label: 'Account Name'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'RequestDate',
          templateOptions: {
            label: 'RequestDate'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AcctSol',
          templateOptions: {
            label: 'AcctSol'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AcctSolDesc',
          templateOptions: {
            label: 'AcctSolDesc'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AcctClsDate',
          templateOptions: {
            label: 'AcctClsDate'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'EntererID',
          templateOptions: {
            label: 'EntererID'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuthorizerID',
          templateOptions: {
            label: 'AuthorizerID'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuthorizeDate',
          templateOptions: {
            label: 'AuthorizeDate'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatingSol',
          templateOptions: {
            label: 'InitiatingSol'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatingSolDesc',
          templateOptions: {
            label: 'InitiatingSolDesc'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuditDate',
          templateOptions: {
            label: 'AuditDate'
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<hr /><div><h3>Additional Information</h3></div>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentUsed',
          templateOptions: {
            label: 'Deposit Split Instrument Used'
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitTimeStamped',
          templateOptions: {
            label: 'Deposit Split Time Stamped'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuditCommented',
          templateOptions: {
            label: 'Comment',
            max: 99999,
            min: 0
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentCompletedAccurately',
          templateOptions: {
            label: 'Deposit Split Instrument Completed Accurately'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedTime',
          templateOptions: {
            label: 'TimeStampedTime'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitEndorsedWithReleaseStamp',
          templateOptions: {
            label: 'DepositSplitEndorsedWithReleaseStamp'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedDate',
          templateOptions: {
            label: 'TimeStampedDate'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'AutomatedReceiptSignedByCustomer',
          templateOptions: {
            label: 'AutomatedReceiptSignedByCustomer'
          }
        }
      ]
    }
  ];

  cashWithdrawal: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'AccountNo',
          templateOptions: {
            label: 'AccountNo'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'AccountName',
          templateOptions: {
            label: 'AccountName'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'TransactionDate',
          templateOptions: {
            label: 'TransactionDate'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'TransactionID',
          templateOptions: {
            label: 'TransactionID'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AcctSol',
          templateOptions: {
            label: 'AcctSol'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AcctSolDesc',
          templateOptions: {
            label: 'AcctSolDesc'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'Tran_Sub_Type',
          templateOptions: {
            label: 'Tran_Sub_Type'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatorID',
          templateOptions: {
            label: 'InitiatorID'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatingSol',
          templateOptions: {
            label: 'InitiatingSol'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatingSolDesc',
          templateOptions: {
            label: 'InitiatingSolDesc'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'RequestDate',
          templateOptions: {
            label: 'RequestDate'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuthorizerID',
          templateOptions: {
            label: 'AuthorizerID'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuthorizerDate',
          templateOptions: {
            label: 'AuthorizerDate'
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<hr /><div><h3>Additional Information</h3></div>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentUsed',
          templateOptions: {
            label: 'Deposit Split Instrument Used'
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitTimeStamped',
          templateOptions: {
            label: 'Deposit Split Time Stamped'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuditCommented',
          templateOptions: {
            label: 'Comment',
            max: 99999,
            min: 0
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentCompletedAccurately',
          templateOptions: {
            label: 'Deposit Split Instrument Completed Accurately'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedTime',
          templateOptions: {
            label: 'TimeStampedTime'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitEndorsedWithReleaseStamp',
          templateOptions: {
            label: 'DepositSplitEndorsedWithReleaseStamp'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedDate',
          templateOptions: {
            label: 'TimeStampedDate'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'AutomatedReceiptSignedByCustomer',
          templateOptions: {
            label: 'AutomatedReceiptSignedByCustomer'
          }
        }
      ]
    }
  ];

  cashDeposit: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountNo',
          templateOptions: {
            label: 'AccountNo'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountName'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountName',
          templateOptions: {
            label: 'AccountName'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountNumber'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AcctSolDesc',
          templateOptions: {
            label: 'AcctSolDesc'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransferType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'Tran_Sub_Type',
          templateOptions: {
            label: 'Tran_Sub_Type'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'AcctSol',
          templateOptions: {
            label: 'AcctSol'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'AuthorizerID',
          templateOptions: {
            label: 'AuthorizerID'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'AuthorizerDate',
          templateOptions: {
            label: 'AuthorizerDate'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatorID',
          templateOptions: {
            label: 'InitiatorID'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatingSol',
          templateOptions: {
            label: 'InitiatingSol'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatingSolDesc',
          templateOptions: {
            label: 'InitiatingSolDesc'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'RequestDate',
          templateOptions: {
            label: 'RequestDate'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TransactionDate',
          templateOptions: {
            label: 'TransactionDate'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TransactionID',
          templateOptions: {
            label: 'TransactionID'
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<hr /><div><h3>Additional Information</h3></div>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentUsed',
          templateOptions: {
            label: 'Deposit Split Instrument Used'
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitTimeStamped',
          templateOptions: {
            label: 'Deposit Split Time Stamped'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuditCommented',
          templateOptions: {
            label: 'Comment',
            max: 99999,
            min: 0
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentCompletedAccurately',
          templateOptions: {
            label: 'Deposit Split Instrument Completed Accurately'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedTime',
          templateOptions: {
            label: 'TimeStampedTime'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitEndorsedWithReleaseStamp',
          templateOptions: {
            label: 'DepositSplitEndorsedWithReleaseStamp'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedDate',
          templateOptions: {
            label: 'TimeStampedDate'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'AutomatedReceiptSignedByCustomer',
          templateOptions: {
            label: 'AutomatedReceiptSignedByCustomer'
          }
        }
      ]
    }
  ];

  transferTransaction: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountNo',
          templateOptions: {
            label: 'AccountNo'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountName'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AccountName',
          templateOptions: {
            label: 'AccountName'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountNumber'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AcctSolDesc',
          templateOptions: {
            label: 'AcctSolDesc'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.TransferType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'Tran_Sub_Type',
          templateOptions: {
            label: 'Tran_Sub_Type'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'AcctSol',
          templateOptions: {
            label: 'AcctSol'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'AuthorizerID',
          templateOptions: {
            label: 'AuthorizerID'
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'AuthorizerDate',
          templateOptions: {
            label: 'AuthorizerDate'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatorID',
          templateOptions: {
            label: 'InitiatorID'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatingSol',
          templateOptions: {
            label: 'InitiatingSol'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'InitiatingSolDesc',
          templateOptions: {
            label: 'InitiatingSolDesc'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'RequestDate',
          templateOptions: {
            label: 'RequestDate'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TransactionDate',
          templateOptions: {
            label: 'TransactionDate'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'TransactionID',
          templateOptions: {
            label: 'TransactionID'
          }
        }
      ]
    },
    {
      className: 'section-label',
      template: '<hr /><div><h3>Additional Information</h3></div>'
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentUsed',
          templateOptions: {
            label: 'Deposit Split Instrument Used'
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitTimeStamped',
          templateOptions: {
            label: 'Deposit Split Time Stamped'
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AuditCommented',
          templateOptions: {
            label: 'Comment',
            max: 99999,
            min: 0
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitInstrumentCompletedAccurately',
          templateOptions: {
            label: 'Deposit Split Instrument Completed Accurately'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedTime',
          templateOptions: {
            label: 'TimeStampedTime'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'DepositSplitEndorsedWithReleaseStamp',
          templateOptions: {
            label: 'DepositSplitEndorsedWithReleaseStamp'
          }
        },
        {
          className: 'col-8',
          type: 'input',
          key: 'TimeStampedDate',
          templateOptions: {
            label: 'TimeStampedDate'
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.AccountType'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'AutomatedReceiptSignedByCustomer',
          templateOptions: {
            label: 'AutomatedReceiptSignedByCustomer'
          }
        }
      ]
    }
  ];

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService
  ) {}

  ngOnInit() {
    this.getProcessType();
    this.fields = this.cashDeposit;
  }

  submit() {
   //  console.log(this.model);
    this.submitAuditRecord();
  }

  submitAuditRecord() {

    const newModel = {
      processTypeId: this.selectedProcessTypeCode,
      transactionDate: this.transactionDate,
      accountNumber: this.accountNumber,
      transactionId: this.transactionId,
      accountInfo: this.model,
    };

    this.dataService
      .Post(newModel, `auditreports`)
      .subscribe(
        res => {
          console.log(res);
          this.resetForm();
          if (res.success) {
            this.utilityService.showSuccessToast(res.message, 'Success');
          }
          this.isInprogress = false;
          // this.resetForm();
        },
        error => {
          console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          // // this.resetForm();
        }
      );
  }

  onProcessTypeChange($event) {
    console.log($event);
    this.selectedProcessTypeCode = $event;
    this.selectedProcess = this.processTypes.filter(x => x.code === $event);

    if (this.selectedProcess[0].name === 'Reactivated Accounts') {
      this.fields = this.reactivatedAccount;
    } else if (this.selectedProcess[0].name === 'Closed Accounts') {
      this.fields = this.closedAccount;
    } else if (this.selectedProcess[0].name === 'Cash Withdrawals') {
      this.fields = this.cashWithdrawal;
    } else if (this.selectedProcess[0].name === 'Cash Deposits') {
      this.fields = this.cashDeposit;
    } else if (this.selectedProcess[0].name === 'Transfer Transactions') {
      this.fields = this.transferTransaction;
    } else if (this.selectedProcess[0].name === 'Accounts Opened') {
      this.fields = this.accountOpened;
    }
  }

  onSearch($event) {
    this.transactionDate = $event.dateFrom;
    this.accountNumber = $event.sText1;
    this.transactionId = $event.sText2;

    if (this.selectedProcess[0].name === 'Accounts Opened') {
      this.selectedProcessType = 'newaccount';
      this.getAuditTransaction(
        this.selectedProcessType,
        this.accountNumber,
        this.transactionDate
      );
    } else if (this.selectedProcess[0].name === 'Closed Accounts') {
      this.selectedProcessType = 'closedaccounts';
      this.getAuditTransaction(
        this.selectedProcessType,
        this.accountNumber,
        this.transactionDate
      );
    } else if (this.selectedProcess[0].name === 'Cash Deposits') {
      this.selectedProcessType = 'cashdeposits';
      this.getAuditTransaction(
        this.selectedProcessType,
        this.accountNumber,
        this.transactionDate
      );
    } else if (this.selectedProcess[0].name === 'Cash Withdrawals') {
      this.selectedProcessType = 'cashwithdrawals';
      this.getAuditTransaction(
        this.selectedProcessType,
        this.accountNumber,
        this.transactionDate
      );
    } else if (this.selectedProcess[0].name === 'Reactivated Accounts') {
      this.selectedProcessType = 'reactivatedaccounts';
      this.getAuditTransaction(
        this.selectedProcessType,
        this.accountNumber,
        this.transactionDate
      );
    } else if (this.selectedProcess[0].name === 'Transfer Transactions') {
      this.selectedProcessType = 'transfertransactions';
      this.getAuditTransaction(
        this.selectedProcessType,
        this.accountNumber,
        this.transactionDate
      );
    }
  }

  getAuditTransaction(
    processType: string,
    accountNumber: string,
    transactionDate: string
  ) {
    // tslint:disable-next-line:max-line-length
    this.url = `get_auditedTransactionsSearch?transactionType=${processType}&AccountNo=${accountNumber}&startdate=${transactionDate}&enddate=2019-10-31`;
    this.dataService.Get(this.url).subscribe(res => {
      console.log(res);
      this.transformReturnAudit(res);
    });
  }

  transformReturnAudit(data) {
    if (data.length !== 0) {
      if (this.selectedProcessType === 'newaccount') {
        this.newAccountModel(data[0]);
      } else if (this.selectedProcessType === 'closedaccounts') {
        this.closedAccountModel(data[0]);
      } else if (this.selectedProcessType === 'cashdeposits') {
        this.cashDepositsModel(data[0]);
      } else if (this.selectedProcessType === 'cashwithdrawals') {
        this.cashWithdrawalsModel(data[0]);
      } else if (this.selectedProcessType === 'reactivatedaccounts') {
        this.reactivatedAccountsModel(data[0]);
      } else if (this.selectedProcessType === 'transfertransactions') {
        this.transferTransactionModel(data[0]);
      }
    }
  }

  getProcessType() {
    this.dataService.Get(`get_auditProcessType`).subscribe(res => {
      if (res && res.auditProcessType) {
        res.auditProcessType.forEach(p => {
          this.processTypes.push({ code: p.Id, name: p.Name });
        });

        // process the default process type
        this.selectedProcess = this.processTypes.filter(
          x => x.code === this.selectedProcessTypeCode
        );
      }
    });
  }

  resetForm() {
    this.model = {
      TransactionDate: '',
      AccountNumber: '',
      TransactionId: '',
      AccountType: '',
      CustomerType: '',
      TransactionAmount: '',
      AccountName: '',
      DepositMode: '',
      TransactionPlatform: '',
      BranchCode: '',
      TransactionBranchName: '',
      InitiatorId: '',
      InitiatorName: '',
      DateRequestWasInitiated: '',
      TimeRequestWasInitiated: '',
      AuthorizerId: '',
      AuthorizerName: '',
      DateRequestWasAuthorized: '',
      TimeRequestWasAuthorized: '',
      AccountDomicileCode: '',
      AccountDomicileBranchName: '',
      DepositSplitInstrumentUsed: false,
      DepositSplitInstrumentCompletedAccurately: false,
      DepositSplitEndorsedWithReleaseStamp: false,
      AutomatedReceiptSignedByCustomer: false,
      DepositSplitTimeStamped: false,
      TimeStampedTime: '',
      TimeStampedDate: '',
      ProcessTypeId: '',
      AuditCommented: ''
    };
  }

  newAccountModel(data: any) {
    this.model = {
      AccountNumber: data.AccountNo,
      AccountName: data.AccountName,
      AccountOpenDate: data.AcctOpnDate,
      AccountSol: data.AcctSol,
      AccountSolDescription: data.AcctSolDec
    };
  }

  closedAccountModel(data: any) {
    this.model = {
      AccountNo: data.AccountNo,
      AccountName: data.AccountName,
      RequestDate: data.RequestDate,
      AcctSol: data.AcctSol,
      AcctSolDesc: data.AcctSolDesc,
      AcctClsDate: data.AcctClsDate,
      EntererID: data.EntererID,
      AuthorizerID: data.AuthorizerID,
      AuthorizeDate: data.AuthorizeDate,
      InitiatingSol: data.InitiatingSol,
      InitiatingSolDesc: data.InitiatingSolDesc,
      AuditDate: data.AuditDate
    };
  }

  cashDepositsModel(data: any) {
    this.model = {
      AccountNo: data.AccountNo,
      AccountName: data.AccountName,
      AcctSolDesc: data.AcctSolDesc,
      Tran_Sub_Type: data.Tran_Sub_Type,
      AcctSol: data.AcctSol,
      AuthorizerID: data.AuthorizerID,
      AuthorizerDate: data.AuthorizerDate,
      InitiatorID: data.InitiatorID,
      InitiatingSol: data.InitiatingSol,
      InitiatingSolDesc: data.InitiatingSolDesc,
      RequestDate: data.RequestDate,
      TransactionDate: data.TransactionDate,
      TransactionID: data.TransactionID,

      DepositSplitInstrumentUsed: data.DepositSplitInstrumentUsed,
      DepositSplitTimeStamped: data.DepositSplitTimeStamped,
      AuditCommented: data.AuditCommented,
      DepositSplitInstrumentCompletedAccurately:
        data.DepositSplitInstrumentCompletedAccurately,
      DepositSplitEndorsedWithReleaseStamp:
        data.DepositSplitEndorsedWithReleaseStamp,
      TimeStampedDate: data.TimeStampedDate,
      AutomatedReceiptSignedByCustomer: data.AutomatedReceiptSignedByCustomer
    };
  }

  cashWithdrawalsModel(data: any) {
    this.model = {
      AccountNo: data.AccountNo,
      AccountName: data.AccountName,
      TransactionDate: data.TransactionDate,
      TransactionID: data.TransactionID,
      AcctSol: data.AcctSol,
      AcctSolDesc: data.AcctSolDesc,
      Tran_Sub_Type: data.Tran_Sub_Type,
      InitiatorID: data.InitiatorID,
      InitiatingSol: data.InitiatingSol,
      InitiatingSolDesc: data.InitiatingSolDesc,
      RequestDate: data.RequestDate,
      AuthorizerID: data.AuthorizerID,
      AuthorizerDate: data.AuthorizerDate,

      DepositSplitInstrumentUsed: data.DepositSplitInstrumentUsed,
      DepositSplitTimeStamped: data.DepositSplitTimeStamped,
      AuditCommented: data.AuditCommented,
      DepositSplitInstrumentCompletedAccurately:
        data.DepositSplitInstrumentCompletedAccurately,
      DepositSplitEndorsedWithReleaseStamp:
        data.DepositSplitEndorsedWithReleaseStamp,
      TimeStampedDate: data.TimeStampedDate,
      AutomatedReceiptSignedByCustomer: data.AutomatedReceiptSignedByCustomer
    };
  }

  reactivatedAccountsModel(data: any) {
    this.model = {
      TransactionDate: '',
      AccountNumber: '',
      TransactionId: '997923792739',
      AccountType: 'Alat Account',
      CustomerType: 'Staff',
      TransactionAmount: '10000',
      AccountName: 'Akinsanya',
      DepositMode: 'Cash',
      TransactionPlatform: 'Branch',
      BranchCode: '201',
      TransactionBranchName: 'Alat Branch',
      InitiatorId: 'olukunle.abolade',
      InitiatorName: 'Olukunle Abolade',
      DateRequestWasInitiated: '11-Dec-2018',
      TimeRequestWasInitiated: '8:00',
      AuthorizerId: 'olanrewaju.akinsanya',
      AuthorizerName: 'Olanrewaju Akinsanya',
      DateRequestWasAuthorized: '11-Dec-2018',
      TimeRequestWasAuthorized: '9:00',
      AccountDomicileCode: '301',
      AccountDomicileBranchName: 'Marina Branch',
      DepositSplitInstrumentUsed: false,
      DepositSplitInstrumentCompletedAccurately: false,
      DepositSplitEndorsedWithReleaseStamp: false,
      AutomatedReceiptSignedByCustomer: false,
      DepositSplitTimeStamped: false,
      TimeStampedTime: '',
      TimeStampedDate: '',
      ProcessTypeId: '1',
      AuditCommented: ''
    };
  }

  transferTransactionModel(data: any) {
    this.model = {
      AccountNo: data.AccountNo,
      AccountName: data.AccountName,
      AcctSolDesc: data.AcctSolDesc,
      Tran_Sub_Type: data.Tran_Sub_Type,
      AcctSol: data.AcctSol,
      AuthorizerID: data.AuthorizerID,
      AuthorizerDate: data.AuthorizerDate,
      InitiatorID: data.InitiatorID,
      InitiatingSol: data.InitiatingSol,
      InitiatingSolDesc: data.InitiatingSolDesc,
      RequestDate: data.RequestDate,
      TransactionDate: data.TransactionDate,
      TransactionID: data.TransactionID,

      DepositSplitInstrumentUsed: data.DepositSplitInstrumentUsed,
      DepositSplitTimeStamped: data.DepositSplitTimeStamped,
      AuditCommented: data.AuditCommented,
      DepositSplitInstrumentCompletedAccurately:
        data.DepositSplitInstrumentCompletedAccurately,
      DepositSplitEndorsedWithReleaseStamp:
        data.DepositSplitEndorsedWithReleaseStamp,
      TimeStampedDate: data.TimeStampedDate,
      AutomatedReceiptSignedByCustomer: data.AutomatedReceiptSignedByCustomer
    };
  }
}
