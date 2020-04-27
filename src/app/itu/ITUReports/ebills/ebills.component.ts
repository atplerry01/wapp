import { Component, OnInit } from "@angular/core";

import * as moment from "moment";
import { DataService } from "src/app/shared/service/data.service";
import { IBranch } from "./../../../shared/my-interfaces";
import { ExcelExporterService } from "./../../../shared/service/excel-exporter.service";
import { UtilityService } from "./../../../shared/service/utility.service";

@Component({
  selector: "app-ebills",
  templateUrl: "./ebills.component.html",
  styleUrls: ["./ebills.component.scss"]
})
export class EbillsComponent implements OnInit {
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
      name: "TransactionID",
      title: "TransactionID",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "CustAccountNumber",
      title: "CustAccountNumber",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "CustAccountName",
      title: "CustAccountName",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "ResponseMsg",
      title: "ResponseMsg",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "BillerAccountNumber",
      title: "BillerAccountNumber",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "BillerName",
      title: "BillerName",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "PaymentReference",
      title: "PaymentReference",
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
      name: "ResponseCode",
      title: "ResponseCode",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "DestinationBankCode",
      title: "DestinationBankCode",
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
      name: "TransactionFee",
      title: "TransactionFee",
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: "Narration",
      title: "Narration",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "PostedBy",
      title: "PostedBy",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "DateCreated",
      title: "DateCreated",
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    this.reportTitle = "E-Bills Transaction Status Report";
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;
    this.ebillsReports();
  }

  ebillsReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    ////api/v1/itu/reports/revpay
    const endPointUrl = "itu/reports/ebills?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&endDate=${this.endDate}&page=${this.page}&per_page=${this.per_page}`;
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

  onPageChange(offset) {
    this.page = offset / this.per_page + 1;
    this.ebillsReports();
  }

  ExportDataToExcel() {
    this.isInprogress = true;

    const endPointUrl = "itu/reports/ebills?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&endDate=${this.endDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `E-bills-report`);
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
