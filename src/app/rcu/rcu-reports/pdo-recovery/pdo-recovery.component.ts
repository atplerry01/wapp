import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { IBranch } from './../../../shared/my-interfaces';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-pdo-recovery',
  templateUrl: './pdo-recovery.component.html',
  styleUrls: ['./pdo-recovery.component.scss']
})

export class PdoRecoveryComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  isInprogress = false;
  showNotFoundMsg = false;
  showReportTemplate = false;
  showUploadButton = false;

  page = 1;
  per_page = 50;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  branches: IBranch[] = [];
  branchLists: any[] = [];
  selectedBranchOption = 0;

  serviceType = 'all';
  startDate = '';
  endDate = '';

  reportTitle = '';
  reportData: any[] = [];

  selectedFile: File = null;
  processedData: any[] = [];

  reportHeader = [
    {
      name: 'FORACID',
      title: 'ACCOUNT',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'ACCT_NAME',
      title: 'ACC NAME',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'CIF_ID',
      title: 'CIF ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'SOL_ID',
      title: 'BRANCH',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TRAN_AMT',
      title: 'TRANS AMT',
      right: false,
      isDate: false,
      isNumber: true
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'PDO Recovery Report';
  }

  onBranchTypeChange = (entity) => {
    this.selectedBranchOption = entity;
  }

  onSearch(entity) {
    this.per_page = entity.per_page;
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;

    if (entity.dateFrom === '' || entity.dateTo === '') {
      this.utilityService.showErrorToast('Please select valid date range', 'Something went wrong!');
      return;
    }

    if (this.processedData && this.processedData.length) {
      this.showNotFoundMsg = false;
      this.isInprogress = true;

      const endPointUrl = 'pdo-recovery/reports?';

      const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
      const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

      // tslint:disable-next-line: max-line-length
      const url = `${endPointUrl}startDate=${newStartDate}&endDate=${newEndDate}`;

      this.subscription = this.dataService.Post({ data: this.processedData }, url).subscribe(
        res => {
          if (res.data) {
            this.reportData = res.data;
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
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );

    }

  }



  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const fileToRead = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(fileToRead, 'UTF-8');

    console.log(this.showReportTemplate);
    // this.showUploadButton = true;
    this.showReportTemplate = true;

    fileReader.onload = (e) => {
      const csvSeparator = ',';
      const textFromFileLoaded = fileReader.result.toString();

      const txt = textFromFileLoaded;
      let skip = true;

      const lines = txt.split('\n');

      console.log(lines);

      if (lines[0]) {
        const c = lines[0].replace(/\"/g, '');
        const cols: string[] = c.split(csvSeparator);
        console.log(cols);
        console.log(cols[0]);
        // if (cols[0] !== 'Account_Number') {
        //   this.utilityService.showErrorToast('Uploaded File does not match expected format - Expected Format should be (ACCOUNT NUMBER)', 'File Format Error');
        //   return;
        // }
      }

      lines.forEach(element => {
        if (skip) {
          skip = false;
          return;
        }

        if (element) {
          element = element.replace(/\"/g, '');
          const cols: string[] = element.split(csvSeparator);
          const data = { accno: cols[0].replace('\r', '') };
          this.processedData.push(data);
        }
      });

      // if (this.processedData && this.processedData.length > 0) {
      //     this.utilityService.showErrorToast('Uploaded File does not match expected format - Expected Format should be (ACCOUNT NUMBER)', 'File Format Error');
      //     return;
      // }
      
      console.log(this.processedData);
    };
  }


  ExportDataToExcel() {

    // this.reportData
    this.excelExporterService.exportAsExcelFile(this.reportData, `pdo-recovery-report`);

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

