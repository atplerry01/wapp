import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from '../../../../shared/service/data.service';
import { UtilityService } from '../../../../shared/service/utility.service';
import { caseEndpoint, entityTypes, followUpStatusLists, modelTabs, searchType } from '../../shared/constant';
import { ICaseCollection, ICaseCollectionWithPagination } from '../../shared/ILoanCollection';
import { collectionHeader } from '../../shared/tableHeader';

@Component({
  selector: 'app-tele-collector',
  templateUrl: './tele-collector.component.html',
  styleUrls: ['./tele-collector.component.scss']
})

export class TeleCollectorComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  currentUser = '';
  reportTitle = 'Case Collections';
  reportHeaders = [];
  reportData: any[] = [];
  loanDetails = {};
  selectedCase = {};

  followUpHeader = [
    {
      name: 'AmountCollected',
      title: 'AmountCollected',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ContactName',
      title: 'ContactName',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ContactPlace',
      title: 'ContactPlace',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ContactType',
      title: 'ContactType',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FollowUpDate',
      title: 'FollowUpDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'NextAction',
      title: 'NextAction',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NextContactDate',
      title: 'NextContactDate',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'Outcome',
      title: 'Outcome',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PromisedToPay',
      title: 'PromisedToPay',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Remarks',
      title: 'Remarks',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  contactDetailHeader = [
    {
      name: 'Name',
      title: 'Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Address',
      title: 'Address',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Location',
      title: 'Location',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Telephone1',
      title: 'Telephone1',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Telephone2',
      title: 'Telephone2',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  collectorHeader = [
    {
      name: 'Stage',
      title: 'Stage',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Action',
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
    },
    {
      name: 'createdAt',
      title: 'Created At',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  selectedCaseCode = 'TeleCollector';

  caseTypes = [
    { code: 'TeleCollector', name: 'Loan Cases' },
    { code: 'MarkedEscalationCases', name: 'Marked Escalation Cases' },
    { code: 'MarkedClosedCases', name: 'Marked Closed Cases' },
    { code: 'FlagedCases', name: 'Flaged Cases' },
    { code: 'ClosedCases', name: 'Closed Cases' },
    { code: 'TreatedCases', name: 'Treated Cases' }
  ];

  selectedEndpoint = '';
  selectedSearchQuery = '';

  maintainModal = false;
  showModalSubmit = false;
  showForm = false;
  showEscalationButton = false;
  showCloseButton = false;
  showToggleButton = false;
  hasFollowUpStatus = false;
  currentModalTab = '';
  currentAction = '';
  selectedCaseId = '';
  selectedModel = {};

  submitLabel = 'Submit';
  formTitle = '';

  agentId: string;
  agentEmail: string;
  agentData: any = {};

  model: any = {};
  fields: any[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  contactOptions: any[] = [];
  followUpStatus: any[] = [];
  caseCallHistory: any[] = [];
  caseFollowUpDetails: any[] = [];
  actionLogs: any[] = [];
  casesFiltered: ICaseCollection[] = [];
  customerCaseDetail: any = [];
  caseCustomerDetail: any = [];
  caseCollectionHistory: any = [];
  lookupCollections: any = [];

  outcomeLists: any = [];
  contactTypeLists: any = [];
  nextActionLists: any = [];
  followUpStatusLists: any = [];
  reminderTypeLists: any = [];

  showFollowUpLists: boolean = true;
  showCustomerDetailLists: boolean = true;

  actionfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Comment',
          templateOptions: {
            label: 'Comment',
            required: true
          }
        }
      ]
    }
  ];

  casefields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'input',
          key: 'CIF_ID',
          templateOptions: {
            label: 'CifId',
            required: true,
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'REPAYMNT_ACCT',
          templateOptions: {
            label: 'REPAYMNT_ACCT',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'ACCT_NAME',
          templateOptions: {
            label: 'ACCT_NAME',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'APPROV_DATE',
          templateOptions: {
            label: 'APPROV_DATE',
            disabled: true
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
          key: 'CLSIN_BAL',
          templateOptions: {
            type: 'number',
            label: 'CLSIN_BAL',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'CREDIT_TRAN_DATE',
          templateOptions: {
            label: 'CREDIT_TRAN_DATE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'EXPIRY_DATE',
          templateOptions: {
            label: 'EXPIRY_DATE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'INTEREST_RATE',
          templateOptions: {
            type: 'number',
            label: 'INTEREST_RATE',
            disabled: true
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
          key: 'INT_IN_SUSP',
          templateOptions: {
            label: 'INT_IN_SUSP',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'INT_PAST_DUE',
          templateOptions: {
            label: 'INT_PAST_DUE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'INTEREST_DUE',
          templateOptions: {
            label: 'InterestDue',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'LAST_CR_AMT',
          templateOptions: {
            label: 'LAST_CR_AMT',
            disabled: true
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
          key: 'LAST_INT_AMT',
          templateOptions: {
            label: 'LAST_INT_AMT',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'NEXT_DMD_DATE',
          templateOptions: {
            label: 'NEXT_DMD_DATE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'PAST_DUE_DATE',
          templateOptions: {
            type: 'number',
            label: 'PAST_DUE_DATE',
            disabled: true
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
          key: 'PENAL_PAST_DUE',
          templateOptions: {
            label: 'PENAL_PAST_DUE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'PRI_PAST_DUE',
          templateOptions: {
            label: 'PRI_PAST_DUE',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'SANCT_LEVEL_AUTH',
          templateOptions: {
            type: 'number',
            label: 'SANCT_LEVEL_AUTH',
            disabled: true
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
          key: 'TENOR_MONTHS',
          templateOptions: {
            label: 'TENOR_MONTHS',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'TOT_INT_AMT',
          templateOptions: {
            label: 'TOT_INT_AMT',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'ZONE_DESC',
          templateOptions: {
            type: 'number',
            label: 'ZONE_DESC',
            disabled: true
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
          key: 'createdAt',
          templateOptions: {
            label: 'createdAt',
            disabled: true
          }
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'updatedAt',
          templateOptions: {
            label: 'updatedAt',
            disabled: true
          }
        }
      ]
    }
  ];

  followUpfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'FollowUpDate',
          templateOptions: {
            type: 'date',
            label: 'FollowUpDate',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'select',
          key: 'Outcome',
          templateOptions: {
            label: 'OutCome',
            options: this.outcomeLists,
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'select',
          key: 'ContactType',
          templateOptions: {
            label: 'ContactType',
            required: true,
            options: this.contactTypeLists
          }
        }
      ]
    }, {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'ContactName',
          templateOptions: {
            label: 'Contact Name',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'ContactPlace',
          templateOptions: {
            label: 'Contact Place',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'select',
          key: 'NextAction',
          templateOptions: {
            label: 'Next Action',
            required: true,
            options: this.nextActionLists
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
          key: 'NextContactDate',
          templateOptions: {
            type: 'date',
            label: 'NextContactDate',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'PromisedToPay',
          templateOptions: {
            label: 'Promise To Pay',
            required: false
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'AmountCollected',
          hideExpression: (model) => {
            if (model.PromisedToPay) {
              if (this.form.get('AmountCollected')) {
                this.form.get('AmountCollected').markAsUntouched();
              }
              delete model.AmountCollected;

              return true;
            }

            return false;
          },
          templateOptions: {
            label: 'AmountCollected',
            required: true,
            type: 'number'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Remarks',
          templateOptions: {
            label: 'Remarks',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'select',
          key: 'ReminderType',
          templateOptions: {
            label: 'ReminderType',
            required: true,
            options: this.reminderTypeLists
          },
          hideExpression: (model) => {
            if (!model.PromisedToPay) {
              if (this.form.get('ReminderType')) {
                this.form.get('ReminderType').markAsUntouched();
              }
              delete model.ReminderType;

              return true;
            }

            return false;
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'PromiseToDate',
          templateOptions: {
            type: 'date',
            label: 'PromiseToDate',
            required: true
          },
          hideExpression: (model) => {
            if (!model.PromisedToPay) {
              if (this.form.get('PromiseToDate')) {
                this.form.get('PromiseToDate').markAsUntouched();
              }
              delete model.PromiseToDate;

              return true;
            }

            return false;
          }
        },
        {
          className: 'col-4',
          type: 'checkbox',
          key: 'PickUpRequired',
          templateOptions: {
            label: 'PickUpRequired',
            required: false
          },
          hideExpression: (model) => {
            if (!model.PromisedToPay) {
              if (this.form.get('PickUpRequired')) {
                this.form.get('PickUpRequired').markAsUntouched();
              }
              delete model.PickUpRequired;

              return true;
            }

            return false;
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-3',
          type: 'checkbox',
          key: 'HasFollowUpStatus',
          templateOptions: {
            label: 'Flag FollowUp Status',
            required: false
          }
        },
        {
          className: 'col-9',
          type: 'select',
          key: 'FollowUpStatus',
          templateOptions: {
            label: 'FollowUpStatus',
            required: false,
            options: followUpStatusLists
          },
          hideExpression: (model) => {
            if (!model.HasFollowUpStatus) {
              if (this.form.get('FollowUpStatus')) {
                this.form.get('FollowUpStatus').markAsUntouched();
              }
              delete model.FollowUpStatus;
              return true;
            }
            return false;
          }
        }
      ]
    }
  ];

  agentfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Name',
          templateOptions: {
            label: 'Agent Name',
            required: true
          }
        }
      ]
    }, {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Email',
          templateOptions: {
            label: 'Agent Email',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'AgentCategory',
          templateOptions: {
            required: true, label: 'AgentCategory',
            options: [
              { label: 'Tele Collector', value: 'Tele Collector' },
              { label: 'Field Collector', value: 'Field Collector' },
              { label: 'Reposession', value: 'Reposession' },
              { label: 'Litigation', value: 'Litigation' }
            ],
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'ManagerId',
          templateOptions: {
            required: true, label: 'Agent Manager',
            options: []
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'Zone',
          templateOptions: {
            required: true, label: 'Agent Zone',
            options: []
          }
        }
      ]
    }
  ];

  customerfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          type: 'input',
          key: 'Name',
          templateOptions: {
            label: 'Name',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'Telephone1',
          templateOptions: {
            label: 'Telephone1',
            required: true
          }
        },
        {
          className: 'col-4',
          type: 'input',
          key: 'Telephone2',
          templateOptions: {
            label: 'Telephone 2'
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Address',
          templateOptions: {
            label: 'Address',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'Location',
          templateOptions: {
            label: 'Location',
            required: true
          }
        }, {
          className: 'col-6',
          type: 'input',
          key: 'State',
          templateOptions: {
            label: 'State',
            required: true
          }
        }
      ]
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'lng',
          templateOptions: {
            label: 'Longitude',
            required: false
          }
        }, {
          className: 'col-6',
          type: 'input',
          key: 'lat',
          templateOptions: {
            label: 'Latitude',
            required: false
          }
        }
      ]
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {
    const currentUser = this.dataService.getCurrentUser();
    this.agentEmail = currentUser.mail;

    // // TODO
    // if (!localStorage.getItem(`TeleAgent_${this.agentEmail}`)) {
    //   this.getAgent();
    // } else {
    //   // this.agentId = localStorage.getItem(`TeleAgent_${this.agentEmail}`);
    //   this.agentId = '47594739-00c6-49e5-9799-fe4b273ccfca';

    // }

    this.agentId = '0622acda-b524-4e13-9a47-1bbf1b251753';

    this.currentUser = '';
    this.reportTitle = 'Loan Cases';
    this.reportHeaders = collectionHeader;
    this.reportData = [];

    this.showCloseButton = true;
    this.showEscalationButton = true;
    this.showToggleButton = false;

    this.selectedEndpoint = caseEndpoint.teleCollectorCases;
    this.getCaseCollections(this.selectedEndpoint);
    this.getLookups();
  }

  onCaseTypeChange(entity) {
    this.showEscalationButton = false;
    this.showCloseButton = false;
    this.showToggleButton = false;
    this.selectedSearchQuery = '';

    this.reportHeaders = collectionHeader;

    if (entity === entityTypes.teleCollectorCases) {
      this.showCloseButton = true;
      this.showEscalationButton = true;

      this.reportTitle = 'Finacle Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.teleCollectorCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.markedEscalationCases) {
      this.reportTitle = 'Mark Escalated Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.markEscalatedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.escalationCases) {
      this.reportTitle = 'Escalated Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.escalatedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.flagedCases) {
      this.reportTitle = 'Flaged Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.flagedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.markedClosedCases) {
      this.reportTitle = 'Marked Closed Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.markClosedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.closedCases) {
      this.reportTitle = 'Closed Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.closedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.treatedCases) {
      this.reportTitle = 'Treated Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.treatedCases;
      this.getCaseCollections(this.selectedEndpoint);
    }
  }

  getCaseCollections = (caseEndPoint, forceRefresh: boolean = false) => {
    if (this.isInprogress) {
      this.utilityService.showErrorToast('Please, wait for the previous request to finish', 'Last Request Is Still Inprogress!');
      return;
    }

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let endPointUrl;

    if (caseEndPoint === caseEndpoint.teleCollectorCases) {
      endPointUrl = `tele-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentOpenCollectorCases}`;
    } else if (caseEndPoint === caseEndpoint.markEscalatedCases) {
      endPointUrl = `tele-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentMarkEscalatedCollectorCases}`;
    } else if (caseEndPoint === caseEndpoint.markClosedCases) {
      endPointUrl = `tele-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentMarkClosedCollectorCases}`;
    } else if (caseEndPoint === caseEndpoint.closedCases) {
      endPointUrl = `tele-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentClosedCollectorCases}`;
    } else if (caseEndPoint === caseEndpoint.flagedCases) {
      endPointUrl = `tele-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentFlagedCollectorCases}`;
    } else if (caseEndPoint === caseEndpoint.treatedCases) {
      endPointUrl = `tele-collector/loanCollections?agentId=${this.agentId}&selectedCase=${caseEndpoint.agentTreatedCollectorCases}`;
    }

    const url = `${endPointUrl}&forceRemote=${forceRefresh}&page=${this.page}
        &per_page=${this.per_page}&${this.selectedSearchQuery}`;

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

    if (this.selectedEndpoint === caseEndpoint.teleCollectorCases) {
      this.getCaseCollections(caseEndpoint.teleCollectorCases);
    } else if (this.selectedEndpoint === caseEndpoint.escalatedCases) {
      this.getCaseCollections(caseEndpoint.escalatedCases);
    } else if (this.selectedEndpoint === caseEndpoint.markEscalatedCases) {
      this.getCaseCollections(caseEndpoint.markEscalatedCases);
    } else if (this.selectedEndpoint === caseEndpoint.markClosedCases) {
      this.getCaseCollections(caseEndpoint.markClosedCases);
    } else if (this.selectedEndpoint === caseEndpoint.closedCases) {
      this.getCaseCollections(caseEndpoint.closedCases);
    }
  }

  /// Additional Generic Task
  setForm() {
    switch (this.currentAction) {
      case modelTabs.escalate:
        this.fields = this.actionfields;
        break;
      case modelTabs.closeCase:
        this.fields = this.actionfields;
        break;
      case modelTabs.loanDetail:
        this.fields = this.casefields;
        break;
      case modelTabs.callHistory:
        this.fields = this.actionfields;
        break;
      case modelTabs.collectorHistory:
        this.fields = [];
        break;
      case modelTabs.customerDetail:
        this.fields = this.customerfields;
        break;
      case modelTabs.followUpDetail:
        this.fields = this.followUpfields;
        break;
      case 'followUpTableRecord':
        this.fields = [];
        break;
      case 'customerDetailTableRecord':
        this.fields = [];
        break;
    }
  }

  onRowSelected($event) {
    this.selectedCase = $event;
    this.selectedCaseId = $event.Id;

    this.formTitle = 'Loan Details';
    this.currentModalTab = modelTabs.loanDetail;
    this.currentAction = modelTabs.loanDetail;
    this.showModalSubmit = false;
    this.showForm = true;
    this.setForm();

    this.getLoanDetails($event.LoanAccountNumber);
  }

  onMenuEdit($event) {
    this.showForm = true;
    this.formTitle = 'Escalate Loan Case';
    this.submitLabel = 'Escalate Case';
    this.currentAction = modelTabs.escalate;
    this.currentModalTab = modelTabs.escalate;
    this.setForm();
    this.model = $event;
    this.showModalSubmit = true;
  }

  onSubMenuDelete(event) {
    this.currentAction = modelTabs.closeCase;
    this.showModalSubmit = true;
    this.showForm = true;

    this.formTitle = 'Close Loan Record';
    this.submitLabel = 'Close Case';
    this.setForm();
    this.model = event;
    this.currentModalTab = modelTabs.closeCase;
  }

  submit($event) {
    this.onSubmit($event, this.currentAction);
  }

  onSubmit(model: any, action: string) {
    if (this.isInprogress) {
      this.utilityService.showErrorToast('Please, wait for the previous request to finish', 'Last Request Is Still Inprogress!');
      return;
    }

    this.showNotFoundMsg = false;
    this.isInprogress = true;
    this.maintainModal = true;

    let url;

    if (action === 'escalate') {
      model = { ...model, ...this.selectedCase, ActionType: 'InitiateEscalationCase' };
      url = `tele-collector/escalate-case`;
    } else if (action === 'closeCase') {
      model = { ...model, ...this.selectedCase, ActionType: 'InitiateCloseCase' };
      url = `tele-collector/close-case`;
    } else if (action === modelTabs.followUpDetail) {
      url = 'createCaseFollowUpHistory';
      model = { ...model, ...this.selectedCase, AgentId: this.agentId };
    } else if (action === modelTabs.customerDetail) {
      url = 'createCaseCustomerDetail';
      model = { ...model, ...this.selectedCase, AgentId: this.agentId };
    } else if (action === modelTabs.callHistory) {
      url = 'createCallCenter';
    }

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        const msg = 'Record succesfully Treated';
        this.utilityService.showSuccessToast(msg, 'Success!');

        if (action === 'escalate' || action === 'closeCase') {
          this.maintainModal = false;
          this.getCaseCollections(caseEndpoint.teleCollectorCases, true);

        } else if (action === modelTabs.followUpDetail || model.HasFollowUpStatus) {
          this.showFollowUpLists = false; // switch the value
          this.onFollowUpToggle();
          this.maintainModal = true;

        } else if (action === modelTabs.customerDetail) {
          this.onCustomerDetailToggle();
          this.maintainModal = true;
        }

        if (!this.maintainModal) {
          this.showForm = false;
        }
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showForm = false;
      }
    );
  }

  onSearch($event) {

    if ($event.dateFrom && $event.dateTo && $event.sText1) {
      this.selectedSearchQuery = `searchType=${searchType.searchAll}&dateFrom=${$event.dateFrom}&dateTo=${$event.dateTo}&searchText=${$event.sText1}`;
    } else if ($event.dateFrom && $event.dateTo && !$event.sText1) {
      this.selectedSearchQuery = `searchType=${searchType.dateRangeOnly}&dateFrom=${$event.dateFrom}&dateTo=${$event.dateTo}`;
    } else if (!$event.dateFrom && !$event.dateTo && $event.sText1) {
      this.selectedSearchQuery = `searchType=${searchType.searchTextOnly}&searchText=${$event.sText1}`;
    }

    this.getCaseCollections(this.selectedEndpoint);
  }

  // Client View Display
  loanDetail() {
    this.formTitle = 'Loan Details';
    this.showModalSubmit = false;
    this.currentModalTab = modelTabs.loanDetail;
    this.currentAction = modelTabs.loanDetail;
    this.setForm();
  }

  // Folloup Details
  followUpDetail() {
    this.showFollowUpLists = true;
    this.showToggleButton = false;
    this.formTitle = 'Followup History';
    this.currentModalTab = modelTabs.followUpDetail;
    this.currentAction = modelTabs.followUpDetail;
    this.showModalSubmit = true;
    this.submitLabel = 'Submit Detail';
    this.selectedModel = this.model;
    const caseId = this.selectedCaseId;

    this.showModalSubmit = false;
    this.currentAction = 'followUpTableRecord';
    this.getFollowUpDetail(caseId);

    this.setForm();
  }

  onAddFollowUpDetails() {
    this.showFollowUpLists = this.showFollowUpLists ? false : true;
    this.showToggleButton = true;

    if (this.showFollowUpLists) {
      this.showModalSubmit = false;
      this.currentAction = 'followUpTableRecord';
      this.getFollowUpDetail(this.selectedCaseId);
    } else {
      this.showModalSubmit = true;
      this.currentModalTab = modelTabs.followUpDetail;
      this.currentAction = modelTabs.followUpDetail;
    }

    this.setForm();
  }

  onFollowUpToggle() {
    this.showFollowUpLists = this.showFollowUpLists ? false : true;

    if (this.showFollowUpLists) {
      this.showToggleButton = false;
      this.showModalSubmit = false;
      this.currentAction = 'followUpTableRecord';
      this.setForm();
      this.getFollowUpDetail(this.selectedCaseId);
    } else {
      this.showToggleButton = true;
      this.showModalSubmit = true;
      this.currentModalTab = modelTabs.followUpDetail;
      this.currentAction = modelTabs.followUpDetail;
      this.setForm();
    }
  }

  getFollowUpDetail = (caseId, _forceRemote: boolean = false) => {

    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getCaseFollowUpHistory?caseId=${caseId}`;

    this.dataService.Get(url).subscribe(
      res => {
        this.caseFollowUpDetails = res.data;
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


  collectorHistory() {
    this.formTitle = 'Collection History';
    this.showModalSubmit = false;
    this.currentModalTab = modelTabs.collectorHistory;
    this.currentAction = modelTabs.collectorHistory;
    const caseId = this.selectedCaseId;

    this.setForm();
    this.getActionLogs(caseId);
  }

  contactHistory() {
    this.formTitle = 'Call Center History';
    this.showModalSubmit = false;
    this.showCloseButton = true;
    this.currentModalTab = modelTabs.callHistory;
    this.currentAction = modelTabs.callHistory;
    this.showModalSubmit = true;
    this.setForm();
  }


  // Customer Detail Information
  customerDetail() {
    this.formTitle = 'Customer Details';
    this.showCustomerDetailLists = true;
    this.showModalSubmit = true;
    this.showToggleButton = false;
    this.currentModalTab = modelTabs.customerDetail;
    this.currentAction = modelTabs.customerDetail;
    this.selectedCaseId = this.selectedCaseId;

    if (this.showCustomerDetailLists) {
      this.showModalSubmit = false;
      this.currentAction = 'customerDetailTableRecord';
      this.getOtherCustomerDetails(this.selectedCaseId);
    }

    this.setForm();
  }

  onAddCustomerDetails() {
    this.showCustomerDetailLists = false;
    this.showToggleButton = true;

    this.formTitle = 'Customer Details';
    this.showModalSubmit = true;
    this.currentModalTab = modelTabs.customerDetail;
    this.currentAction = modelTabs.customerDetail;
    this.setForm();
  }

  onCustomerDetailToggle() {
    this.showCustomerDetailLists = this.showCustomerDetailLists ? false : true;
    this.showToggleButton = false;

    if (this.showCustomerDetailLists) {
      this.showModalSubmit = false;
      this.currentAction = 'customerDetailTableRecord';
      this.getOtherCustomerDetails(this.selectedCaseId);
    } else {
      this.formTitle = 'Customer Details';
      this.showModalSubmit = true;
      this.currentModalTab = modelTabs.customerDetail;
      this.currentAction = modelTabs.customerDetail;
    }

    this.setForm();
  }

  getOtherCustomerDetails = (caseId, _forceRemote: boolean = false) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getCaseCustomerDetail?caseId=${caseId}`;

    this.dataService.Get(url).subscribe(
      res => {
        this.caseCustomerDetail = res.data;
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

  // Lookups Data
  getActionLogs = (caseId, _forceRemote: boolean = false) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getCaseActionLogs?caseId=${caseId}`;

    this.dataService.Get(url).subscribe(
      res => {
        this.actionLogs = res.data;
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

  getAgent = async () => {
    const url = `getAgentByEmail?categoryId=1`;
    this.dataService.Get(url).subscribe(
      res => {
        if (res && res.data) {
          const currentUser = this.dataService.getCurrentUser();
          this.agentEmail = currentUser.mail;
          this.agentId = res.data.Id;
          localStorage.setItem(`TeleAgent_${this.agentEmail}`, this.agentId.toString());
          this.agentId = localStorage.getItem(`TeleAgent_${this.agentEmail}`);
        }
        return res.data.Id;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  getLookups = async () => {
    const url = `getLookUps`;

    this.dataService.Get(url).subscribe(
      res => {

        if (res && res.data) {
          this.lookupCollections = res.data;

          this.lookupCollections = res.data.map(x => {

            if (x.Category === 'Outcome') {
              this.outcomeLists.push({ label: x.Name, value: x.Name });
            }

            if (x.Category === 'ContactType') {
              this.contactTypeLists.push({ label: x.Name, value: x.Name });
            }

            if (x.Category === 'NextAction') {
              this.nextActionLists.push({ label: x.Name, value: x.Name });
            }

            if (x.Category === 'FollowUpStatus') {
              this.followUpStatusLists.push({ label: x.Name, value: x.Name });
            }

            if (x.Category === 'ReminderType') {
              this.reminderTypeLists.push({ label: x.Name, value: x.Name });
            }

            return x;
          });
        }
        return res.data.Id;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  resetFollowUpForm() {
    this.model = {
      FollowUpDate: '',
      Outcome: '',
      ContactType: '',
      ContactName: '',
      ContactPlace: '',
      NextAction: ''
    }
  }

  getLoanDetails(id) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getLoanDetails?LoanAcc=${id}`;

    this.dataService.Get(url).subscribe(
      res => {
        this.loanDetails = res.data[0];
        this.model = this.loanDetails;
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

  callCenterHeader() {

  }

}
