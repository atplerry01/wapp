
export interface IAccountStatement {
    CifAccount: string;
    AccountNumber: string;
    AccountName: string;
    PrimaryEmail: string;
    DocFormat: string;
    ScheduleTime: string;
    Frequency: string;
    Status: string;
    ccEmail: string;
    bccEmail: string;
    setupDate: string;
    setupBy: string;
    accountList: string;
  }

  export interface IAccountStatementWithPagination {
    page: number; // current page
    per_page: number;
    pre_page: number;
    next_page?: number;
    total: number; // total record
    total_pages: number;
    data: IAccountStatement[];
  }
