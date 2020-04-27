export interface IBirthday {
  employee_number: string;
  name: string;
  department: string;
  email: string;
  mobile_phone: string;
}

export interface IEmployee {
  EmployeeNumber: string;
  EmployeeName: string;
  Email: string;
  JobTitle: string;
  Department: string;
  GSM: string;
  Grade: string;
  BranchCode: string;
  BranchName: string;
  ZoneCode: Number;
  ZoneName: string;
  RegionCode: Number;
  RegionName: string;
  TotalGrade: Number;
}

export interface IAccount {
  customerid: string;
  acid: string;
  accountnumber: string;
  accountname: string;
}

export interface IAccountDetail {
  ACCOUNTNUMBER: string;
  ACCOUNTNAME: string;
  BRANCHCODE: string;
  BRANCH: string;
  CUSTOMERID: string;
  BVN: string;
  ACCOUNTTYPE: string;
  CURRENCY: string;
  ACCOUNTTYPEDESC: string;
  STATUS: string;
  BALNCE: number;
  ODLIMIT: number;
  ADDRESS1: string;
  ADDRESS2: string;
  CITY: string;
  STATE: string;
  MOBILE: string;
  EMAIL: string;
  ACCOUNTMANAGER: string;
  TRANALERTS: string;
}

export interface IPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
}


export interface IAccountStats {
  FORACID: string;
  TOTALDEBITTODAY: number;
  TOTALCREDITTTODAY: number;
  TOTALDEBITMTD: number;
  TOTALCREDITMTD: number;
  TOTALDEBITYTD: number;
  TOTALCREDITYTD: number;
}

export interface IAccountStatement {
  RCRE_TIME: Date;
  LCHG_TIME: Date;
  VFD_DATE: Date;
  PSTD_DATE: Date;
  ENTRY_DATE: Date;
  TRAN_DATE: Date;
  VALUE_DATE: Date;
  TRANID: string;
  PARTICULARS: string;
  DR?: number;
  CR?: number;
  BALANCE: number;
  PART_TRAN_SRL_NUM: string;
  INSTRMNT_NUM: string;
  GL_DATE: Date;
}

export interface IAccountStatitics {
  ProductCode: string;
  ProductName: string;
  BranchCode: string;
  RegionName: string;
  Total: number;
  DTotal: number;
  DVolume: number;
  Dormancy: number;
  DormancyRatio: number;
  TotalDormant: number;
  BranchName: string;
  ZoneCode: number;
  ZoneName: string;
  RegionCode: number;
  ProductType: string;
}

export interface AccountProfitabilityNo {
    AccountNo: string;
      AccountName: string;
      CustomerId: string;
      BranchNo: string;
      Branch: string;
      ProductCode: string;
      Product: string;
      Type: string;
      Balance: number;
      TurnoverDebit: number;
      TurnoverCredit: number;
      AvgBalanceDr: number;
      AvgBalanceCr: number;
      IntRate: number;
      LiquidityRatio: number;
      CashReserve: number;
      PoolSource: number;
      IncomeOnLiquidity: number;
      PoolCredit: number;
      IntIncome: number;
      IntExpense: number;
      NRFF: number;
      AccMaintFee: number;
      FeeIncome: number;
      TotalIncome: number;
      EffectiveYield: number;
      TransferPrice: number;
      ROA: number;
      AccountMgrId: string;
      AccountMgr: string;
      Period: string;
}

export interface AccountProfitabilityAssets {
  AccountNo: string;
  AccountName: string;
  CustomerId: string;
  BranchNo: string;
  Branch: string;
  ProductCode: string;
  Product: string;
  Type: string;
  Balance:  number;
  TurnoverDebit:  number;
  TurnoverCredit:  number;
  AvgBalanceDr:  number;
  AvgBalanceCr: number;
  IntRate:  number;
  IntIncome:  number;
  AccMaintFee:  number;
  FeeIncome:  number;
  TotalIncome:  number;
  EffectiveYield:  number;
  TransferPrice:  number;
  PoolCharge: number;
  NRFF: number;
  AccountMgrId: string;
  AccountMgr: string;
  Period: string;
}

export interface AccountProfitabilityLiabilities {
  AccountNo: string;
  AccountName: string;
  CustomerId: string;
  BranchNo: string;
  Branch: string;
  ProductCode: string;
  Product: string;
  Type: string;
  Balance: number;
  TurnoverDebit: number;
  TurnoverCredit: number;
  AvgBalanceDr: number;
  AvgBalanceCr: number;
  IntRate: number;
  LiquidityRatio: number;
  CashReserve: number;
  PoolContribution: number;
  IncomeOnLiquidity: number;
  PoolCredit: number;
  FloatIncome: number;
  IntExpense: number;
  NRFF: number;
  AccMaintFee: number;
  FeeIncome: number;
  TotalIncome: number;
  AccountMgrId: string;
  AccountMgr: string;
  Period: string;
}

export interface AccountTD {
  AcctOpnDate: Date;
  ACCT_CLS_DATE: Date;
  FORACID: string;
  INTEREST_RATE: number;
  AccountDesc: string;
  PRINCIPALAMOUNT: number;
  TENOR: number;
  CUSTOMERACCOUNTNO: string;
  CIF_ID: string;
  ACCT_CRNCY_CODE: string;
}

export interface IAccountLoan {
  CustomerId: string;
  AccountNumber: string;
  AccountStatus: string;
  AccountStatusDate: Date;
  DateOfLoan: Date;
  CreditLimit: number;
  LoanAmount: number;
  LoanRate?: number;
  OutstandingBalance: number;
  InstalmentAmount: string;
  Currency: string;
  DaysInArrears: string;
  OverdueAmount?: string;
  LoanType: string;
  LoanDesc: string;
  LoanTenor: string;
  RepaymentFrequency: string;
  LastPaymentDate: Date;
  LastPaymentAmount: number;
  MaturityDate: Date;
  LoanClassification: string;
  LegalChallengeStatus: string;
  LitigationDate: string;
  ConsentStatus: string;
  LoanSecurityStatus: string;
  CollateralType: string;
  CollateralDetails: string;
}

export interface IRegion {
  regioncode: number;
  region: string;
}

export interface IZone {
  zonecode: number;
  name: string;
  regioncode: number;
}

export interface IBranch {
  branchcode: number;
  branch: string;
  zonecode: number;
}

export interface IRiskAsset {
  account_number: string;
  account_name: string;
  loan_date: string;
  loan_amount: string;
  outstanding_balance: string;
  overdue_amount: string;
  loan_type: string;
  loan_classification: string;
  BranchCode: string;
  BranchName: string;
  ZoneCode: string;
}

export interface IAccessLevels {
  access_level: string;
  module: string;
}

export interface IMaturityProfile {
  productname: string;
  branchname: string;
  branchcode: string;
  accountno: string;
  customername: string;
  dateopened: Date;
  tenor: string;
  maturitydate: Date;
  depositamount: string;
  interestrate: string;
  clearedbalance: string;
  interestpayable: string;
}

export interface ITopCustomerTDCASA {
  ACCOUNTNUMBER: string;
  CUSTOMERNAME: string;
  BRANCH: string;
  CLEAREDBALANCE: number;
  TRAN_DATE_BAL: number;
  CURRENCY: string;
  EOD_DATE: Date;
  END_EOD_DATE: Date;
}

export interface IRegionSummary {
  RegionName: string;
  RegionCode: number;
  TotalZones: number;
  TotalBranches: number;
}

export interface IZoneSummary {
  ZoneName: string;
  ZoneCode: number;
  TotalBranches: number;
}

export interface IBranchDetail {
  BranchCode: string;
  BranchName: string;
  Address: string;
  State: string;
  LineNumber: string;
}

export interface IVideo {
  filename: string;
  title: string;
  posterImg: string;
}

export interface IFavouriteLinks {
  FavouriteName: string;
  Favourite_Link: string;
  submenu_display_inside: string;
  submenu_id: string;
}

export interface IFistTimeDebit {
  BranchCode: string;
  Branch: string;
  AccountNumber: string;
  AccountName: string;
  Balance: number;
}

export interface IChannelMovement {
  IChannel: string;
  ITotalCount: string;
  ITotalAmount: string;
  ITranDate: Date;
  IRemarks: string;
  OChannel: string;
  OTotalCount: string;
  OTotalAmount: string;
  OTranDate: Date;
  ORemarks: string;
  P_IChannel: string;
  P_ITotalCount: string;
  P_ITotalAmount: string;
  P_ITranDate: Date;
  P_IRemarks: string;
  P_OChannel: string;
  P_OTotalCount: string;
  P_OTotalAmount: string;
  P_OTranDate: Date;
  P_ORemarks: string;

}

export interface ICallOver {
  FORACID: string;
  TRAN_TYPE: string;
  ACCT_NAME: string;
  TRAN_ID: string;
  PART_TRAN_SRL_NUM: string;
  CREDIT: number;
  DEBIT: number;
  NARRATION: string;
  TRAN_DATE: string;
  VALUE_DATE: string;
  INIT_SOL_ID: string;
  ENTRY_USER_ID: string;
  PSTD_USER_ID: string;
  VFD_USER_ID: string;
  PART_TRAN_TYPE: string;
  TRAN_SUB_TYPE: string;
  TRAN_PARTICULAR_2: string;
}

export interface ICallOverWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  totalCredit: number;
  totalDebit: number;
  tellers: string[];
  data: ICallOver[];
}

export interface ILimitNotification {
  Phone: string;
  Message: string;
  SMSDate: Date;
  dlr_description: string;
  BranchCode: string;
  AccountNo: string;
  AccountName: string;
  SMSCount: number;
}

export interface ILimitNotificationWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  data: ILimitNotification[];
}

export interface IWemaCollect {
  webguid: string;
  tellerName: string;
  tillaccountName: string;
  tillaccountDebited: string;
  transactionID: Array<string>;
  agencyCode: string;
  revenueCode: string;
  state: string;
  accountNoCredited: string;
  amount: string;
  debitNarration: string;
  creditNarration: string;
  branchName: string;
  paymentRef: string;
  transactionType: string;
  status: boolean;
  transCode: string;
  transactionDate: Date;
  PayerName: string;
  finacleResponse: string;
}

export interface IWemaCollectWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  data: IWemaCollect[];
}


export interface IAccountIntroducers {
  ACCOUNTNO: string;
  ACCOUNTNAME: string;
  ACCOUNTTYPE: string;
  BALANCE: number;
  BRANCH: string;
  OPENDATE: Date;
  CURRENCY: string;
  ACCOUNTMGR: string;
  STAFFID: string;
  AVERAGE_CREDIT: number;
  AVERAGE_DEBIT: number;
}


export interface IAccountIntroducersWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  data: IAccountIntroducers[];
  totalAvgCredit: number;
  totalAvgDebit: number;
  totalBalance: number;
}

export interface ISlides {
  url: string;
  caption: string;
  order: number;
}

export interface ITop6Links {
  name: string;
  url: string;
  imgurl: string;
  order: number;
}

export interface ITopSideLinks {
  name: string;
  url: string;
  imgurl: string;
  classname: string;
  order: number;
}

export interface ITopDepositor {
  ACCT_NUMBER: string;
  ACCT_NAME: string;
  BALANCE: number;
  CURRENCY_TYPE: string;
  ACCT_TYPE: string;
  ACC_MGR: string;
}

export interface ITopDepositorWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  data: ITopDepositor[];
}


export interface IMenu {
  idno: number;
  menu_id: string;
  menu_name: string;
  menu_order: string;
  menu_image: string;
  menu_link: string;
  standalone: string;
  status: string;
  menu_display_inside: string;
}

export interface IMenuWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  data: IMenu[];
}

export interface ISubMenu {
  idno: number;
  submenu_id: string;
  menu_id: string;
  submenu_name: string;
  submenu_link: string;
  submenu_display_inside: string;
  submenu_order: number;
  favourite_status: string;
  favourite_order?: number;
  status: string;
}

export interface ISubMenuWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  data: ISubMenu[];
}

export interface IRole {
  idno: number;
  roleid: string;
  role_name: string;
  status: string;
}

export interface IRoleAccess {
idno: number;
roleid: string;
role_name: string;
submenu_id: string;
access_level_id: string;
status: string;
}

export interface ISpecialRoleAccess {
  idno: number;
  userid: string;
  submenu_id: string;
  access_level_id: string;
  status: string;
  }

  export interface IAllAccess {
    roles: IRoleAccess[];
    specialRoles: ISpecialRoleAccess[];
  }

export interface IRMDashboardDetails {
  ACCT_NUMBER: string;
  ACCT_NAME: string;
  ACCT_OPN_DATE: Date;
  PRODUCT_NAME: string;
  BRANCH: string;
  TOTAL: number;
}

export interface IRMUnfundedAccountDetails {
  ACCT_NAME: string;
  ACCT_NUMBER: string;
  ACCT_OPN_DATE: Date;
  BALANCE: number;
  CURRENCY_TYPE: string;
  PHONE: string;
  PREFERREDPHONE: string;
  EMAIL: string;
  ADDRESS_LINE1: string;
  ADDRESS_LINE2: string;
  ADDRESS_LINE3: string;
  STATE: string;
  COUNTRY: string;
}

export interface IRMAccountStatusDetails {
  ACCT_NUMBER: string;
  ACCT_NAME: string;
  BALANCE: number;
  PRODUCT_NAME: string;
  BRANCH: string;
  ACCT_STATUS: string;
  ACCT_STATUS_DATE: string;
}

export interface IRMAccountReactivationDetail {
  ACCT_NO: string;
  ACCT_NAME: string;
  BALANCE: number;
  ACCT_OPN_DATE: Date;
  ACCT_STATUS: string;
  PRODUCT_NAME: string;
  BRANCH: string;
  ACCT_MGR_USER_ID: string;
  ACCT_CRNCY_CODE: string;
  ACCT_STATUS_DATE: Date;
  DATE_OF_BIRTH: Date;
  SALUTATION: string;
  GENDER: string;
  PHONE: string;
  PREFERREDPHONE: string;
  EMAIL: string;
  ADDRESS_LINE1: string;
  ADDRESS_LINE2: string;
  ADDRESS_LINE3: string;
  STATE: string;
  COUNTRY: string;
}


export interface IFixedDeposit {
 SCHM_CODE: string;
 PRODUCTNAME: string;
 BRANCHNAME: number;
 BRANCHCODE: string;
 ACCOUNTNO: string;
 CUSTOMERID: string;
 CUSTOMERNAME: string;
 DATEOPENED: string;
 TENOR: number;
 DEPOSIT_PERIOD_MTHS: number;
 TRUE_TENOR: number;
 MATURITYDATE: string;
 ACCT_CRNCY_CODE: string;
 DEPOSITAMOUNT: number;
 INTERESTRATE?: number;
 CLEAREDBALANCE: number;
 INTERESTPAYABLE: number;
 LAST_TRAN_DATE: string;
 ACCT_CLS_DATE?: Date;
 DepositStatus: string;
}

export interface IPartLiquidatedFixedDeposit {
    BRANCHCODE: string;
    BRANCHNAME: string;
    ACCOUNTNO: string;
    ACCT_NAME: string;
    ACCT_OFFICER: string;
    PRINCIPAL_AMT: number;
    DEAL_DATE: string;
    MATURITY_DATE: string;
    TENOR: number;
    INTERESTRATE: number;
    PART_LIQUIDATED_DATE: string;
    PART_LIQUIDATED_AMT: number;
    BAL_AFTER_PART_LIQUIDATION: number;
    NEW_RATE: number;
    VERIFIER: string;
    REMAINING_TENOR: number;
}

export interface IAssetBid {
  id: Number;
  BRAND: string;
  REGNO: string;
  LOTNO: Number;
  TYPE: string;
  PHOTO: string;
  LOCATION: string;
  BASEPRICE: number;
  TOTALBIDS?: number;
  HIGHESTBID?: number;
}

export interface IAssetBidDetails {
  created: Date;
  email:  string;
  staffId:  string;
  obsoleteCarId: number;
  amount:  number;
  totalbid:  number;
  staffname:  string;
  grade:  string;
  branchDept:  string;
  brand:  string;
  type:  string;
  regno:  string;
  lotno:  string;
  location:  string;
  baseprice:  number;
}

export interface IAssetBidDetailsWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  data: IAssetBidDetails[];
}

export interface IConfidentiality {
  Id: string;
  empNo: string;
  email: string;
  empName: string;
  grade: string;
  dateCreated: Date;
}

export interface IConfidentialityWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
 total_pages: number;
  data: IConfidentiality[];
}

export interface IFimiLog {
  tranid: string;
  logdate: string;
  accountno: string;
  accountno_emp: string;
  accountname: string;
  amount: string;
  error_desc: string;
}

export interface IFimiTransaction {
  tranid: string;
  trandate: string;
  accountno: string;
  accountno_emp: string;
  accountname: string;
  amount: string;
  status: string;
}


 interface IAttestate {
  email: string;
  staffId: string;
  name: string;
  date_accepted: Date;
}

export interface IAttestation {
  EmployeeAttestation: IAttestate;
}

export interface IAttestationWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  data: IAttestation[];
}
