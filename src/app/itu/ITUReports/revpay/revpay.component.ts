import { Component, OnInit } from "@angular/core";

import * as moment from "moment";
import { DataService } from "src/app/shared/service/data.service";
import { IBranch } from "./../../../shared/my-interfaces";
import { ExcelExporterService } from "./../../../shared/service/excel-exporter.service";
import { UtilityService } from "./../../../shared/service/utility.service";

@Component({
  selector: "app-revpay",
  templateUrl: "./revpay.component.html",
  styleUrls: ["./revpay.component.scss"]
})
export class RevpayComponent implements OnInit {
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
      name: "Webguid",
      title: "Webguid",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "PayerName",
      title: "PayerName",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "AgencyCode",
      title: "AgencyCode",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "RevenueCode",
      title: "RevenueCode",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "tillaccountDebited",
      title: "tillaccountDebited",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "tillaccountName",
      title: "tillaccountName",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "accountNoCredited",
      title: "accountNoCredited",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "accountNameCredited",
      title: "accountNameCredited",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "amount",
      title: "amount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "debitNarration",
      title: "debitNarration",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "creditNarration",
      title: "creditNarration",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "finacleResponse",
      title: "finacleResponse",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "finacleResponseDescrip",
      title: "finacleResponseDescrip",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "depositSlipNo",
      title: "depositSlipNo",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "branchcode",
      title: "branchcode",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "branchcode",
      title: "branchcode",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "branchName",
      title: "branchName",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "tellerid",
      title: "tellerid",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "tellerName",
      title: "tellerName",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "paymentRef",
      title: "paymentRef",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "transactionType",
      title: "transactionType",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "TransactionReceipt",
      title: "TransactionReceipt",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Status",
      title: "Status",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "ApprovalStatus",
      title: "ApprovalStatus",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "TransactionID",
      title: "TransactionID",
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
      name: "ResponseDescriptions",
      title: "ResponseDescriptions",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "TransCode",
      title: "TransCode",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "transactionDate",
      title: "transactionDate",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "tellerpayerID",
      title: "tellerpayerID",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "SuspenseAccount",
      title: "SuspenseAccount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "IsSentToMerchant",
      title: "IsSentToMerchant",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "IsMerchantPaid",
      title: "IsMerchantPaid",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "SuspenseNaration",
      title: "SuspenseNaration",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "SuspenseFinacleResponse",
      title: "SuspenseFinacleResponse",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "RevPayResponse",
      title: "RevPayResponse",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "RevPayFailed",
      title: "RevPayFailed",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "IsReversed",
      title: "IsReversed",
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
    this.reportTitle = "Revpay Transaction Report";
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;
    this.getRevpayReports();
  }

  getRevpayReports = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    ////api/v1/itu/reports/revpay
    const endPointUrl = "itu/reports/revpay?";

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
    this.getRevpayReports();
  }

  ExportDataToExcel() {
    this.isInprogress = true;

    const endPointUrl = "itu/reports/revpay?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&endDate=${this.endDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(data, `revpay-report`);
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
