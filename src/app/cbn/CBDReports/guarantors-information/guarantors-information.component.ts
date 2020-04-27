import { Component, OnInit, ɵrestoreView } from "@angular/core";
import { DataService } from "./../../../shared/service/data.service";
import { ExcelExporterService } from "./../../../shared/service/excel-exporter.service";
import { UtilityService } from "./../../../shared/service/utility.service";

@Component({
  selector: "app-guarantors-information",
  templateUrl: "./guarantors-information.component.html",
  styleUrls: ["./guarantors-information.component.scss"]
})
export class GuarantorsInformationComponent implements OnInit {
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
      name: "Customer's Account No",
      title: "Customer's Account No",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantee Status of Loan",
      title: "Guarantee Status of Loan",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor DOB Incorporation",
      title: "Guarantor DOB Incorporation",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor Drivers Licence #",
      title: "Guarantor Drivers Licence #",
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: "Guarantor Prm Addr City/LGA",
      title: "Guarantor Prm Addr City/LGA",
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: "Guarantor Prmy Addr Line 1",
      title: "Guarantor Prmy Addr Line 1",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor Prmy Addr Line 2",
      title: "Guarantor Prmy Addr Line 2",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: '"Guarantor\'s BVN"',
      title: "Guarantor's BVN",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor's E-mail",
      title: "Guarantor's E-mail",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor's Gender",
      title: "Guarantor's Gender",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor's National ID",
      title: "Guarantor's National ID",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Instalment amount",
      title: "Installment amount",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor's Gender",
      title: "Guarantor's Gender",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor's Other ID",
      title: "Guarantor's Other ID",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor's Primary Country",
      title: "Guarantor's Primary Country",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor's Primary State",
      title: "Guarantor's Primary State",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Guarantor's PrmY Phone number",
      title: "Guarantor's PrmY Phone number",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Individual Guarantor FirstName",
      title: "Individual Guarantor FirstName",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Individual Guarantor Surname",
      title: "Individual Guarantor Surname",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Individual Guarntor MiddleName",
      title: "Individual Guarntor MiddleName",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Name of Corporate Guarantor",
      title: "Name of Corporate Guarantor",
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: "Type of Guarantee",
      title: "Type of Guarantee",
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
    this.reportTitle = "Guarantor's Information Report";
    // this.getGuarantorsInformation();
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;

    this.getGuarantorsInformation();
  }

  getGuarantorsInformation = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = "cbd-reports/guarantor-information/reports?";

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

    const endPointUrl = "cbd-reports/guarantor-information/reports?";

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `guarantor-information`
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
    this.getGuarantorsInformation();
  };
}
