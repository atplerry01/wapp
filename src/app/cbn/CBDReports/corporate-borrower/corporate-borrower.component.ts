import { Component, OnInit } from "@angular/core";
import { DataService } from "./../../../shared/service/data.service";
import { ExcelExporterService } from "./../../../shared/service/excel-exporter.service";
import { UtilityService } from "./../../../shared/service/utility.service";

@Component({
  selector: "app-corporate-borrower",
  templateUrl: "./corporate-borrower.component.html",
  styleUrls: ["./corporate-borrower.component.scss"]
})
export class CorporateBorrowerComponent implements OnInit {
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
      name: "Business Category",
      title: "Business Category",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Business Corporate Type",
      title: "Business Corporate Type",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Business Identification Number",
      title: "Business Identification Number",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Business Name",
      title: "Business Name",
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: "Business Office Address Line 1",
      title: "Business Office Address Line 1",
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: "City/LGA",
      title: "City/LGA",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Country",
      title: "Country",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Customer ID",
      title: "Customer ID",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Customers Branch Code",
      title: "Customers Branch Code",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Email-Address",
      title: "Email-Address",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Tax ID",
      title: "Tax ID",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Date Of Incorporation",
      title: "Date Of Incorporation",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Secondary Address Line 1",
      title: "Secondary Address Line 1",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Secondary Address Line 2",
      title: "Secondary Address Line 2",
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: "Secondary Phone Number",
      title: "Secondary Phone Number",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "State",
      title: "State",
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
    this.reportTitle = "Corporate Borrower Report";
    // this.getCorporateBorrower();
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;
    console.log(this.startDate);

    this.getCorporateBorrower();
  }

  getCorporateBorrower = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = "cbd-reports/corporate-borrower/reports?";

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

    const endPointUrl = "cbd-reports/corporate-borrower/reports?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `corporate-borrower`
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
    this.getCorporateBorrower();
  };
}
