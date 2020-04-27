import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DataService } from '../../../../shared/service/data.service';
import { UtilityService } from '../../../../shared/service/utility.service';
import { caseEndpoint, entityTypes, modelTabs, searchType } from '../../shared/constant';
import { IAgentWithPagination, ICaseCollection, ICaseCollectionWithPagination, IClosedCaseWithPagination } from '../../shared/ILoanCollection';
import { agentHeader, collectionHeader, newCaseHeader } from '../../shared/tableHeader';

@Component({
  selector: 'app-followup-manager',
  templateUrl: './followup-manager.component.html',
  styleUrls: ['./followup-manager.component.scss']
})

export class FollowupManagerComponent implements OnInit {
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
  reportData: any = [];
  allZones: any = [];
  loanDetails = {};

  selectedCaseCode = 'Finacle';

  caseTypes = [
    { code: 'NewFinacleCase', name: 'New Loan Cases' },
    { code: 'Finacle', name: 'Finacle Loan Cases' },
    { code: 'TeleCollector', name: 'TeleCollector' },
    { code: 'FieldCollector', name: 'FieldCollector' },
    { code: 'MarkedClosedCases', name: 'MarkedClosedCases' },
    { code: 'FlagedCases', name: 'FlagedCases' },
    { code: 'ClosedCases', name: 'ClosedCases' },
    { code: 'agents', name: 'All Agents' }
  ];

  selectedEndpoint = '';
  selectedSearchQuery = '';

  maintainModal = false;
  showModalSubmit = false;
  showForm = false;
  showEscalationButton = false;
  showCloseButton = false;
  showToggleButton = false;
  showAgentReassignment = false;
  showFlagAssignButton = false;
  onAgentPage = false;
  showAgentModal = false;
  currentModalTab = '';
  currentAction = '';
  selectedCase = {};
  selectedCaseId = '';
  selectedModel = '';

  submitLabel = 'Submit';
  formTitle = '';

  model: any = {};
  fields: any[] = [];
  form = new FormGroup({});
  options: FormlyFormOptions = {};

  contactOptions: any[] = [];
  caseCallHistory: any[] = [];
  caseFollowUpDetails: any[] = [];
  actionLogs: any[] = [];
  casesFiltered: ICaseCollection[] = [];
  customerCaseDetail: any = [];
  caseCustomerDetail: any = [];
  caseCollectionHistory: any = [];
  reAssignAgents: any = [];

  outcomeLists: any = [];
  contactTypeLists: any = [];
  nextActionLists: any = [];
  followUpStatusLists: any = [];
  reminderTypeLists: any = [];
  lookupCollections: any = [];

  showFollowUpLists = true;
  showCustomerDetailLists = true;

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

  actionFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'Comment',
          templateOptions: {
            label: 'Reason for Action',
            required: true
          }
        }
      ]
    }
  ];

  flagCaseReAssignmentFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'ReAssignStage',
          templateOptions: {
            required: true, label: 'ReAssign Agent',
            options: this.reAssignAgents
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
          key: 'ReAssignAgentId',
          templateOptions: {
            required: true, label: 'ReAssign Agent',
            options: this.reAssignAgents
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
          key: 'Comment',
          templateOptions: {
            label: 'Reason for Re-Assignment',
            required: true
          }
        }
      ]
    }
  ];

  caseReAssignmentFields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'select',
          key: 'ReAssignAgentId',
          templateOptions: {
            required: true, label: 'ReAssign Agent',
            options: this.reAssignAgents
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
          key: 'Comment',
          templateOptions: {
            label: 'Reason for Re-Assignment',
            required: true
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
    },
    {
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
            required: true,
            label: 'AgentCategory',
            options: [
              { label: 'Tele Collector', value: 'Tele Collector' },
              { label: 'Field Collector', value: 'Field Collector' },
              { label: 'Reposession', value: 'Reposession' },
              { label: 'Litigation', value: 'Litigation' }
            ]
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
            required: true,
            label: 'Agent Zone',
            options: this.allZones // this.branchZones
          }
        }
      ]
    }
  ];

  commentfields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          type: 'input',
          key: 'NewLoanComment',
          templateOptions: {
            label: 'Comment',
            required: true
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
    this.currentUser = '';
    this.reportTitle = 'All Finacle Cases';
    this.reportHeaders = collectionHeader;
    this.reportData = [];
    
    this.getAgents();
    // this.getFieldCollectorAgent();
    // this.getLookups();
    this.getZones();

    this.selectedEndpoint = caseEndpoint.openCases;
    this.getCaseCollections(this.selectedEndpoint);

  }

  onCaseTypeChange(entity) {
    this.showEscalationButton = false;
    this.showCloseButton = false;
    this.showAgentReassignment = false;
    this.showFlagAssignButton = false;
    this.selectedSearchQuery = '';
    this.reportHeaders = collectionHeader;

    if (entity === entityTypes.finacleCases) {
      this.reportTitle = 'Finacle Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.openCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.teleCollectorCases) {
      this.reportTitle = 'Tele Collector Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.teleCollectorCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.fieldCollectorCases) {
      this.showCloseButton = false;
      this.showEscalationButton = false;
      this.showAgentReassignment = false;

      this.reportTitle = 'Field Collector Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.fieldCollectorCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.markedEscalationCases) {
      this.showEscalationButton = true;
      this.showCloseButton = false;
      this.showAgentReassignment = false;

      this.reportTitle = 'Mark Escalated Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.markEscalatedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.markedClosedCases) {
      this.showCloseButton = true;
      this.showEscalationButton = false;
      this.showAgentReassignment = false;

      this.reportTitle = 'Marked Closed Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.markClosedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.flagedCases) {
      this.showCloseButton = true;
      this.showEscalationButton = false;
      this.showFlagAssignButton = false;

      this.reportTitle = 'Flagged Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.flagedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === entityTypes.closedCases) {
      this.showCloseButton = false;
      this.showEscalationButton = false;
      this.showAgentReassignment = false;

      this.reportTitle = 'Closed Cases';
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.closedCases;
      this.getCaseCollections(this.selectedEndpoint);

    } else if (entity === 'agents') {
      this.reportTitle = 'Agents';
      this.reportHeaders = agentHeader;
      this.reportData = [];
      this.selectedEndpoint = 'Agents';
      this.onAgentPage = true;
      this.getAgents();
    } else if (entity === entityTypes.newFinacleCases) {
      this.reportTitle = 'New Finacle Cases';
      this.reportHeaders = newCaseHeader;
      this.reportData = [];
      this.selectedEndpoint = caseEndpoint.newCases;
      this.getNewCaseCollections();

    }
  }

  getCaseCollections = (caseEndPoint, forceRefresh: boolean = false) => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let endPointUrl;
    endPointUrl = `manager/loanCollections?selectedCase=${caseEndPoint}`;
    const url = `${endPointUrl}&forceRemote=${forceRefresh}&page=${this.page}&per_page=${this.per_page}&${this.selectedSearchQuery}`;
    
    console.log(url);

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

    if (this.selectedEndpoint === caseEndpoint.openCases) {
      this.getCaseCollections(caseEndpoint.openCases);
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

  /// Additional Genric Task
  onMenuEdit(event) {
    if (this.showAgentReassignment) {
      this.formTitle = 'Agent ReAssignment';
      this.submitLabel = 'ReAssignment Case';
      this.currentAction = modelTabs.caseReAssignment;
      this.currentModalTab = modelTabs.caseReAssignment;

    } else if (this.showFlagAssignButton) {
      this.formTitle = 'Flag ReAssignment';
      this.submitLabel = 'ReAssignment Case';
      this.currentAction = modelTabs.caseReAssignment;
      this.currentModalTab = modelTabs.caseReAssignment;

    } else {
      this.formTitle = 'Escalate Loan Case';
      this.submitLabel = 'Escalate Case';
      this.currentAction = modelTabs.escalate;
      this.currentModalTab = modelTabs.escalate;

    }

    this.showModalSubmit = true;
    this.showForm = true;

    this.setForm();
    this.model = event;
  }

  onSubMenuDelete(event) {
    this.currentAction = modelTabs.closeCase;
    this.currentModalTab = modelTabs.closeCase;
    this.showModalSubmit = true;
    this.showForm = true;

    this.formTitle = 'Close Loan Record';
    this.submitLabel = 'Close Case';
    this.setForm();
    this.model = event;
  }

  submit($event) {
    this.onSubmit($event, this.currentAction);
  }

  onSubmit(model: object, type: string) {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    let url;

    if (type === 'escalate') {
      model = { ...model, ActionType: 'ApproveEscalateCase' };
      url = `manager/escalate-case`;
    } else if (type === 'closeCase' || type === 'flagedCases') {
      model = { ...model, ActionType: 'ApproveCloseCase' };
      url = `manager/close-case`;
    } else if (type === 'caseReAssignment') {
      model = { ...model, ActionType: 'CaseReAssignment' };
      url = `manager/reassign-case`;
    } else if (type === 'NewCase') {
      model = { ...model, ActionType: 'NewCase' };
      url = `manager/assign-new-loans`;  // new-case
    } else if (type === 'AddAgent') {
      url = 'manager/create-agent';
    }

    this.dataService.Post(model, url).subscribe(
      res => {
        this.isInprogress = false;
        this.utilityService.showSuccessToast('Ok', 'Success!');
        this.showForm = false;

        if (type === 'AddAgent') {
          this.getAgents();
        } else {
          this.getCaseCollections(this.selectedEndpoint);
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

  setForm() {

    switch (this.currentAction) {
      case modelTabs.loanDetail:
        this.fields = this.casefields;
        break;
      case modelTabs.callHistory:
        this.fields = [];
        break;
      case modelTabs.collectorHistory:
        this.fields = [];
        break;
      case modelTabs.customerDetail:
        this.fields = []; // this.customerfields;
        break;
      case modelTabs.followUpDetail:
        this.fields = []; // this.followUpfields;
        break;
      case modelTabs.caseReAssignment:
        this.fields = this.caseReAssignmentFields;
        break;
      case modelTabs.flagedReAssignment:
        this.fields = this.flagCaseReAssignmentFields;
        break;
      case modelTabs.revertAction:
        this.fields = this.actionFields;
        break;
      case modelTabs.closeCase:
        this.fields = this.actionFields;
        break;
      case 'followUpTableRecord':
        this.fields = [];
        break;
      case 'customerDetailTableRecord':
        this.fields = [];
        break;
      case 'AddAgent':
        this.fields = this.agentfields;
        break;
      case 'NewCase':
        this.fields = this.commentfields;
        break;
    }
  }

  onAddNewAgent() {
    this.showForm = true;
    this.currentAction = 'AddAgent';
    this.submitLabel = 'Create Agent';
    this.setForm();
    // this.model = $event;

    // get the init form
    this.formTitle = 'Add New Agent';
    this.currentModalTab = modelTabs.loanDetail;
    this.showModalSubmit = true;
  }

  onRowSelected($event) {
    this.selectedCase = $event;
    this.selectedCaseId = $event.CaseId;

    this.formTitle = 'Loan Details';
    this.currentModalTab = modelTabs.loanDetail;
    this.currentAction = modelTabs.loanDetail;
    this.showModalSubmit = false;
    this.showForm = true;
    this.setForm();

    this.getLoanDetails($event.LoanAccountNumber);

  }

  loanDetail() {
    this.formTitle = 'Loan Details';
    this.showModalSubmit = false;
    this.currentModalTab = modelTabs.loanDetail;
    this.currentAction = modelTabs.loanDetail;
    this.setForm();
  }

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

  followUpDetailLists() {
    this.formTitle = 'Followup History';

    this.showModalSubmit = false;
    this.currentModalTab = modelTabs.followUpDetail;
    this.currentAction = modelTabs.followUpDetail;
    this.showModalSubmit = true;
    this.submitLabel = 'Submit Detail';
    const caseId = this.selectedCaseId = this.model.CaseId;

    this.setForm();
    this.getFollowUpDetail(caseId);
  }


  collectorHistory() {
    this.formTitle = 'Collection History';
    this.showModalSubmit = false;
    this.currentModalTab = modelTabs.collectorHistory;
    this.currentAction = modelTabs.collectorHistory;
    const caseId = this.model.CaseId;

    this.setForm();
    this.getActionLogs(caseId);
  }

  contactHistory() {
    this.formTitle = 'Contact History';
    this.showModalSubmit = false;
    this.showCloseButton = true;
    this.currentModalTab = modelTabs.callHistory;
    this.currentAction = modelTabs.callHistory;

    this.setForm();
  }

  customerDetail() {
    this.formTitle = 'Customer Details';
    this.showModalSubmit = true;
    this.currentModalTab = modelTabs.customerDetail;
    this.currentAction = modelTabs.customerDetail;
    this.selectedCaseId = this.model.CaseId;
    this.selectedModel = this.model;

    if (this.showCustomerDetailLists) {
      this.showModalSubmit = false;
      this.currentAction = 'customerDetailTableRecord';
      this.getOtherCustomerDetails(this.selectedCaseId);
    }

    this.setForm();
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

  getAgents = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `getAgentCollector?AgentCategory=all`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity: IAgentWithPagination = res.data;
        
        if (entity) {
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

  getFieldCollectorAgent = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const url = `getAvailableAgentCollector?AgentCategory=Field Collector`;

    this.dataService.Get(url).subscribe(
      res => {
        res.data.map(x => {
          this.reAssignAgents.push({ label: `${x.Name}, ${x.Email}`, value: x.Id });
        });

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

  getClosedCases = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `manager/closed-cases`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity: IClosedCaseWithPagination = res.data;

        if (entity) {
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

  getNewCaseCollections = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `manager/new-loans`;

    this.dataService.Get(url).subscribe(
      res => {
        const entity: any = res.data;

        if (entity) {
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



          // const currentUser = this.dataService.getCurrentUser();
          // this.agentEmail = currentUser.mail;
          // this.agentId = res.data.Id;
          // localStorage.setItem(`TeleAgent_${this.agentEmail}`, this.agentId.toString());
          // this.agentId = localStorage.getItem(`TeleAgent_${this.agentEmail}`);
        }
        return res.data.Id;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  callCenterHeader() {

  }

  processNewLoans() {
    
    this.showForm = true;
    this.currentAction = 'NewCase';
    this.submitLabel = 'Process Loan Tracker';
    this.setForm();

    // get the init form
    this.formTitle = 'Process New Loan Assignment';
    this.currentModalTab = modelTabs.loanDetail;
    this.showModalSubmit = true;

  }

  getZones = async () => {
    const url = `lookup/getZones`;

    this.dataService.Get(url).subscribe(
      res => {
        if (res && res.data) {
          res.data.map(x => {
            this.allZones.push({ label: `${x.zone}`, value: `${x.zone}` });
          });
        }

        return null;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
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

}
