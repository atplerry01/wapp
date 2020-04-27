export interface ISRCustomerProfiling {
  id: number;
  cifAccount: string;
  accountNumber: string;
  accountName: string;
  primaryEmail: string;
  docFormat: string;
  scheduleTime: string;
  frequency: string;
  status: string;
  ccEmail: string;
  bccEmail: string;
  setupBy: string;
  branch: string;
  month: string;
  day: string;
  weekday: string;
  comment: string;
  setupDate: Date;
  }

  export interface ISRCustomerProfilingWithPagination {
    page: number; // current page
    per_page: number;
    pre_page: number;
    next_page?: number;
    total: number; // total record
    total_pages: number;
    data: ISRCustomerProfiling[];
  }

  export interface IStatementAccountRendition {
    ACCOUNTNUMBER: string;
    ACCOUNTNAME: string;
    ACCOUNTTYPEDESC: string;
  }

