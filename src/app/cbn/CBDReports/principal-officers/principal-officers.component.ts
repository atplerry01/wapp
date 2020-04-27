import { Component, OnInit } from '@angular/core';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-principal-officers',
  templateUrl: './principal-officers.component.html',
  styleUrls: ['./principal-officers.component.scss']
})

export class PrincipalOfficersComponent implements OnInit {
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
      name: 'BVN No',
      title: 'BVN No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CITY',
      title: 'CITY',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Country',
      title: 'Country',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Customer Id',
      title: 'Customer Id',
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
      name: 'Drivers License No',
      title: 'Drivers License No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'EMAIL Address',
      title: 'EMAIL Address',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Gender',
      title: 'Gender',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'National ID',
      title: 'National ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'PICTURE FILE PATH',
      title: 'PICTURE FILE PATH',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Passport No',
      title: 'Passport No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Phone No',
      title: 'Phone No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Phone No1',
      title: 'Phone No1',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Phone No 2',
      title: 'Phone No 2',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Position In Business',
      title: 'Position In Business',
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
      name: 'Principal Off1 Firstname',
      title: 'Principal Off1 Firstname',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Principal Off Midnme',
      title: 'Principal Off Midnme',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Principal Officer 1 Surname',
      title: 'Principal Officer 1 Surname',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Principal Officer 2 Firstname',
      title: 'Principal Officer 2 Firstname',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Principal Officer 2 Middlename',
      title: 'Principal Officer 2 Middlename',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Principal Officer 2 Surname',
      title: 'Principal Officer 2 Surname',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'STATE',
      title: 'STATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Secondary Address',
      title: 'Secondary Address',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TAX ID',
      title: 'TAX ID',
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
    this.reportTitle = 'Principal Officers Report';
    // this.getPrincipalOfficers();
  }

  onSearch(entity) {
    this.startDate = entity.dateFrom;

    this.getPrincipalOfficers();
  }

  getPrincipalOfficers = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const endPointUrl = 'cbd-reports/corporate-principal/reports?';

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

    const endPointUrl = 'cbd-reports/corporate-principal/reports?';

    // tslint:disable-next-line: max-line-length
    const url = `${endPointUrl}&startDate=${this.startDate}&_export=1`;

    this.dataService.Get(url).subscribe(
      res => {
        const data = res.data;

        if (data && data.length > 0) {
          this.excelExporterService.exportAsExcelFile(
            data,
            `corporate-principal`
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
    this.getPrincipalOfficers();
  }
}
