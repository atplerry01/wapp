import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-individual-borrower',
  templateUrl: './individual-borrower.component.html',
  styleUrls: ['./individual-borrower.component.scss']
})

export class IndividualBorrowerComponent implements OnInit {
  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';

  reportTitle = '';
  reportData: any[] = [];

  reportHeader = [
    {
      name: 'BORROWER TYPE',
      title: 'BORROWER TYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BVN No',
      title: 'BVN No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Branch Code',
      title: 'Branch Code',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CUSTOMERID',
      title: 'CUSTOMERID',
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: 'Date Of Birth',
      title: 'Date Of Birth',
      right: false,
      isDate: false,
      isNumber: false
    },

    {
      name: 'Employment Status',
      title: 'Employment Status',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'First Name',
      title: 'First Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'GENDER',
      title: 'GENDER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Marital Status',
      title: 'Marital Status',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Middle Name',
      title: 'Middle Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Mobile No',
      title: 'Mobile No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NATIONALITY',
      title: 'NATIONALITY',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Primary Address Line 1',
      title: 'Primary Address Line 1',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Primary Address Line 2',
      title: 'Primary Address Line 2',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Primary Country',
      title: 'Primary Country',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Primary State',
      title: 'Primary State',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Primary city / LGA',
      title: 'Primary city / LGA',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Secondary Address City / LGA',
      title: 'Secondary Address City / LGA',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Secondary Address Country',
      title: 'Secondary Address Country',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Secondary Address Line 1',
      title: 'Secondary Address Line 1',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Secondary Address Line 2',
      title: 'Secondary Address Line 2',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Secondary Address State',
      title: 'Secondary Address State',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Spouse\'s First Name',
      title: 'Spouse\'s First Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Spouse\'s Middle Name',
      title: 'Spouse\'s Middle Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Spouse\'s Surname',
      title: 'Spouse\'s Surname',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Surname',
      title: 'Surname',
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
    this.reportTitle = 'Individual Borrower Report';
    // this.getIndividualBorrower();
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;

    this.getIndividualBorrower();
  }

  getIndividualBorrower = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'cbd-reports/individual-borrower/reports?';

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

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  ExportDataToExcel() {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'cbd-reports/individual-borrower/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `individual-borrower`
          );
        }

        this.isInprogress = false;
      },
      error => {
        // console.log(error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  onPageChange = offset => {
    this.page = offset / this.per_page + 1;
    this.getIndividualBorrower();
  }
}
