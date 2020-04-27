
export interface ICaseCollection {
  Id: number;
  LoanAccountNumber: string;
  CifId: string;
  AccountNumber: string;
  AccountName: string;
  BranchCode: string;
  BranchName: string;
  SchemeCode: string;
  SchemeDescription: string;
  OperativeAccount: string;
  OperativeAccountBalance: string;
  LienAmount: string;
  TotalPastDue: string;
  StartDate: string;
  LoanAmount: string;
  LoanBalance: string;
  PrincipalDue: string;
  InterestDue: string;
  PrincipalPay: string;
  InsureDue: string;
  MonthlyRent: string;
  Dpd: string;
  LastCreditAmount: string;
  ReportDate: string;
  Remark: string;
  AgentName: string;
}

export interface ICaseCollectionWithPagination {
  page: number; // current page
  per_page: number;
  pre_page: number;
  next_page?: number;
  total: number; // total record
  total_pages: number;
  data: ICaseCollection[];
}
