import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from './../../../shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-pan-processor',
  templateUrl: './pan-processor.component.html',
  styleUrls: ['./pan-processor.component.scss']
})
export class PanProcessorComponent implements OnInit, OnDestroy {

  showNotFoundMsg = false;
  isInprogress = false;

  processedData: any[] = [];

  showUploadButton = false;
  subscription: Subscription;

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) {}

  ngOnInit() {
    const access = this.utilityService.getAccessInfo('PAN-Processor');
    if (access.key !== 'G') {
      this.utilityService.navigate('/sc/home');
    }
  }

  onFileSelected(event: any) {
    const fileToRead = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(fileToRead, 'UTF-8');

    this.showUploadButton = true;

    fileReader.onload = (e) => {
      this.processedData = [];
      const csvSeparator = ',';
      const textFromFileLoaded = fileReader.result.toString();

      const txt = textFromFileLoaded;
      let skip = true;

      const lines = txt.split('\n');

      if (lines[0]) {
        const c = lines[0].replace(/\"/g, '');
        const cols: string[] = c.split(csvSeparator);
        if (cols[0] !== 'PAN' && cols[3] !== 'Account') {
          this.utilityService.showErrorToast('Uploaded File does not match expected format - Expected Format should be (PAN, PHONE, EMAIL ACCOUNT NUMBER)', 'File Format Error');
          return;
        }
      }

      lines.forEach(element => {
        if (skip) {
          skip = false;
          return;
        }
        if (element) {
          element = element.replace(/\"/g, '');
          const cols: string[] = element.split(csvSeparator);
          const data = {pan: cols[0], accno: cols[3].replace('\r', '')};
          this.processedData.push(data);
        }
      });
    };
  }

  onUpload = () => {
    this.creatPANTable();
  }

  creatPANTable() {

    if (this.isInprogress) {
      this.utilityService.showErrorToast('Please, wait for the previous request to finish', 'Last Request Is Still Inprogress!');
      return;
    }

    if (!this.processedData.length) {
      this.utilityService.showErrorToast('File does not contain valid data', 'Invalid Data!');
      return;
    }

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `createPANProcessor`;

    this.subscription = this.dataService.Post({data: this.processedData} , url).subscribe(
      res => {
        console.log('res: ', res);
        if(res.data && res.data.length){
        this.excelExporterService.exportAsExcelFile(res.data, `FormattedPAN_REPORT`);
        this.utilityService.showSuccessToast('File downloaded successfully', 'Success!');
        } else{
          this.utilityService.showErrorToast('Something went wrong', 'Something went wrong!');
        }
        this.isInprogress = false;
        // this.showUploadButton = false;
      },
      error => {
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  ngOnDestroy(): void {
    if(this.subscription){
    this.subscription.unsubscribe();
    }
  }

}
