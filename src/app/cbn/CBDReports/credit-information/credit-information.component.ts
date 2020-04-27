import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../../shared/service/data.service";
import { ExcelExporterService } from "./../../../shared/service/excel-exporter.service";
import { UtilityService } from "./../../../shared/service/utility.service";

@Component({
  selector: "app-credit-information",
  templateUrl: "./credit-information.component.html",
  styleUrls: ["./credit-information.component.scss"]
})
export class CreditInformationComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = "";

  reportTitle = "";
  reportData: any[] = [];

  reportHeader = [
    {
      name: "Account Number",
      title: "Account Number",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Account Status",
      title: "Account Status",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Account Status Date",
      title: "Account Status Date",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Collateral Details",
      title: "Collateral Details",
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: "Collateral Type",
      title: "Collateral Type",
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: "Consent Status",
      title: "Consent Status",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Credit Limit",
      title: "Credit Limit",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Currency",
      title: "Currency",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Customer Id",
      title: "Customer Id",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Date Of Loan",
      title: "Date Of Loan",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Days In Arrears",
      title: "Days In Arrears",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Instalment amount",
      title: "Instalment amount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Last Payment Amount",
      title: "Last Payment Amount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Last Payment Amount",
      title: "Last Payment Amount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Last Payment Date",
      title: "Last Payment Date",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Legal Challenge Status",
      title: "Legal Challenge Status",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Litigation Date",
      title: "Litigation Date",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Loan Amount",
      title: "Loan Amount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Loan Classification",
      title: "Loan Classification",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Loan Security Status",
      title: "Loan Security Status",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Loan Tenor",
      title: "Loan Tenor",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Maturity Date",
      title: "Maturity Date",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Outstanding Balance",
      title: "Outstanding Balance",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Overdue amount",
      title: "Overdue amount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Previous Account Number",
      title: "Previous Account Number",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Previous Branch Code",
      title: "Previous Branch Code",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Previous Customer Id",
      title: "Previous Customer Id",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Previous Name",
      title: "Previous Name",
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: "Repayment Frequency",
      title: "Repayment Frequency",
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.reportTitle = "Credit Information Report";
    // this.getCreditInformation();
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;

    this.getCreditInformation();
  }

  getCreditInformation = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = "cbd-reports/credit-information/reports?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&page=${this.page}&per_page=${this.per_page}`;
    console.log(url);

    this.dataService.Get(url).subscribe(
      res => {
        console.log(res.data);
        if (res.data) {
          this.reportData = res.data.data;
          this.pre_page = res.data.pre_page;
          this.next_page = res.data.next_page;
          this.totalRecords = res.data.total;
          this.total_pages = res.data.total_pages;
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;
      },
      error => {
        this.reportData = [];
        this.totalRecords = 0;
        this.total_pages = 0;

        this.utilityService.showErrorToast(error, "Something went wrong!");
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  };

  ExportDataToExcel() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = "cbd-reports/credit-information/reports?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `credit-information`
          );
        }

        this.isInprogress = false;
      },
      error => {
        // console.log(error);
        this.utilityService.showErrorToast(error, "Something went wrong!");
        this.isInprogress = false;
      }
    );
  }

  onPageChange = offset => {
    this.page = offset / this.per_page + 1;
    this.getCreditInformation();
  };
}
