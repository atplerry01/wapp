export interface ISalaryHistoryData {
    customerId: string;
    accountNumber: string;
    bankCode: string;
    bvn: string;
    companyName: string;
    customerName: string;
    category: string;
    firstPaymentDate: string;
    salaryCount: string;
    salaryPaymentDetails: ISalaryPaymentDetails[];
    loanHistoryDetails: IloanHistoryDetails[];
}

export interface ISalaryPaymentDetails {
    customerName?: string;
    accountNumber?: string;
    bankCode?: string;
    bvn?: string;
    paymentDate: string;
     amount: string;
}


export interface IloanHistoryDetails {
     loanProvider: string;
     loanAmount: string;
     outstandingAmount: string;
     loanDisbursementDate: string;
     repaymentFreq: string;
}

export interface ILoan {
        id: number;
        customerId: string;
        customerName: string;
        phoneNumber: string;
        accountNumber: string;
        bankCode: string;
        authCode: string;
        bvn: string | null;
        loanAmount: number;
        collectionAmount: number;
        numberOfRepayments: number;
        intRate: number;
        dateOfCollection: string;
        totalCollectionAmount: number;
        status: string;
        makerId: string;
        makerDate: Date;
        mandateReference: string | null;
        dateOfDisbursement: string | null;
        checkerId: string | null;
        checkerDate: Date | null;
        stoppedDate: Date | null;
        stoppedby: string | null;
}

export interface ILoanWithPagination {
    page: number; // current page
    per_page: number;
    pre_page: number;
    next_page?: number;
    total: number; // total record
    total_pages: number;
    data: ILoan[];
  }


export class LoanCreationForm {
    loanAmount: number;
    collectionAmount: number;
    intRate: number;
    numberOfRepayments: number;
    totalCollectionAmount: number;
    dateOfCollection: string;
    constructor(loanAmount?: number, collectionAmount?: number, numberOfRepayments?: number,
        totalCollectionAmount?: number, dateOfCollection?: string, intRate?: number) {
        this.loanAmount = loanAmount;
        this.intRate = intRate;
        this.collectionAmount = collectionAmount;
        this.numberOfRepayments = numberOfRepayments;
        this.totalCollectionAmount = totalCollectionAmount;
        this.dateOfCollection = dateOfCollection;
    }
}
