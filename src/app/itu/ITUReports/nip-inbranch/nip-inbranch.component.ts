import { Component, OnInit } from "@angular/core";

import * as moment from "moment";
import { DataService } from "src/app/shared/service/data.service";
import { IBranch } from "./../../../shared/my-interfaces";
import { ExcelExporterService } from "./../../../shared/service/excel-exporter.service";
import { UtilityService } from "./../../../shared/service/utility.service";

@Component({
  selector: "app-nip-inbranch",
  templateUrl: "./nip-inbranch.component.html",
  styleUrls: ["./nip-inbranch.component.scss"]
})
export class NipInbranchComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = "";
  endDate = "";
  terminalId = "";

  reportTitle = "";
  reportData: any[] = [];

  // selectedBranchOption = 0;
  // branches: IBranch[] = [];
  // objectLists: any[] = [];
  // branchLists: any[] = [];

  reportHeader = [
    {
      name: "ID",
      title: "ID",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "SessionID",
      title: "SessionID",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "AccountNo",
      title: "AccountNo",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "SourceBank",
      title: "SourceBank",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "DestinationBank",
      title: "DestinationBank",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Amount",
      title: "Amount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Narration",
      title: "Narration",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "TransactionStatus",
      title: "TransactionStatus",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "RawDetails",
      title: "RawDetails",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Charges",
      title: "Charges",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "VatAmount",
      title: "VatAmount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "ResponseCode",
      title: "ResponseCode",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "DatePosted",
      title: "DatePosted",
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: "BeneficaryAccountName",
      title: "BeneficaryAccountName",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "BeneficaryAccountNumber",
      title: "BeneficaryAccountNumber",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "BeneficiaryBankVerificationNumber",
      title: "BeneficiaryBankVerificationNumber",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "C24Response",
      title: "C24Response",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "TranID",
      title: "TranID",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "TranDate",
      title: "TranDate",
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
    this.reportTitle = "NIP/INBRANCH Transaction Status Report";
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;
    this.getNipReports();
  }

  getNipReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    ////api/v1/itu/reports/revpay
    const endPointUrl = "itu/reports/nip?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;
    console.log(url);

    this.dataService.Get(url).subscribe(
      res => {
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

  onPageChange(offset) {
    this.page = offset / this.per_page + 1;
    this.getNipReports();
  }

  ExportDataToExcel() {
    this.isInprogress = true;

    const endPointUrl = "itu/reports/nip?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&endDate=${this.endDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `NIP/INBRANCH-report`
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
}
