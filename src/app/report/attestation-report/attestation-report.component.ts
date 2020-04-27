import { Component, OnInit } from '@angular/core';

import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { ExcelExporterService } from '../../shared/service/excel-exporter.service';
import { IAttestation, IAttestationWithPagination } from '../../shared/my-interfaces';
// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-attestation-report',
  templateUrl: './attestation-report.component.html',
  styleUrls: ['./attestation-report.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class AttestationReportComponent implements OnInit {


  isInprogress = false;
  showNotFoundMsg = false;
  accounts: IAttestation[] = [];

  page = 1; // current page
  per_page = 50;
  totalRecords = 0; // total record
  total_pages = 0;


  reportHeaders = [
    { name: 'staffId', title: 'Staff ID', right: false, isDate: false, isNumber: false },
    { name: 'name', title: 'Name', right: false, isDate: false, isNumber: false },
    { name: 'email', title: 'Email', right: false, isDate: false, isNumber: false },
    { name: 'date_accepted', title: 'Date', right: false, isDate: true, isNumber: false },
  ];

  constructor(private dataService: DataService, private utilityService: UtilityService, private excelExporterService: ExcelExporterService) {
  }


  ngOnInit() {
    this.getAttestionReport();
  }

  getAttestionReport() {


    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const param = `page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(`attestatereport?${param}`)
      .subscribe((res) => {

        const result: IAttestationWithPagination = res.resp;
        if (result && result.data) {

          this.accounts = result.data;

          this.totalRecords = result.total;
          this.total_pages = result.total_pages;

        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;

      },
        error => {
          // console.log(error);
          this.accounts = [];
          this.totalRecords = 0;
          this.total_pages = 0;

          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
        });
  }



  ExportDataToExcel() {

    this.isInprogress = true;

    this.dataService.Get(`attestatereport?_export=1`)
      .subscribe((res) => {

        const data: IAttestation[] = res.resp;
        this.excelExporterService.exportAsExcelFile(data, `AttestationReport`);
        this.isInprogress = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }

  onPageChange(offset) {
    console.log('offset: ', offset);
    this.page = (offset / this.per_page) + 1;
    this.getAttestionReport();

  }


}


