import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from './../../../../shared/service/data.service';
import { UtilityService } from './../../../../shared/service/utility.service';

@Component({
  selector: 'app-fimi-fileupload',
  templateUrl: './fimi-fileupload.component.html',
  styleUrls: ['./fimi-fileupload.component.scss']
})

export class FimiFileuploadComponent implements OnInit {

  showNotFoundMsg = false;
  isInprogress = false;
  reportData = [] = [];
  projectKey = '';
  reportdetails: any = {};
  selectedFile: File = null;
  appTitle = '';
  allowedExt: any = [];
  isLoading = true;
  
  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getFileUploadInstance();
  }

  getFileUploadInstance() {
    this.route.queryParams.subscribe(map => {
      // projectKey
      if (map.key === '') {
        this.utilityService.showErrorToast('', 'Invalid File Locator');
        this.utilityService.goBack();
      }

      this.projectKey = map.key;
      this.getProjectDetail();
    });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const ext = this.selectedFile.name.split('.').pop();
    const isAllowed = this.allowedExt.includes('.' + ext);

    if (!isAllowed) {
      this.utilityService.showInfoToast(
        'Selected file is not allowed!',
        'Valid File Format Required'
      );
      return;
    }

    if (!this.selectedFile) {
      this.utilityService.showInfoToast(
        'Please select a valid file!',
        'Valid File Format Required'
      );
      return;
    }

    // this.reportdetails
    // check the allowedExt
    console.log('###########', this.reportdetails.AllowedExt);

    const url = `http://localhost:5006/api/FimiUpload/${this.projectKey}`;

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);

    // const fd = new FormData();
    // fd.append('file', this.selectedFile, this.selectedFile.name);

    console.log(formData);
    this.dataService.PostExtFiles(this.selectedFile, url).subscribe(
      res => {
        console.log(res);
        this.isInprogress = false;
        this.utilityService.showSuccessToast(res.message, 'File Upload Success');
      },
      error => {
        console.log(error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
      }
    );
  }

  getProjectDetail = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;
    const endPointUrl = 'generic/getProjectDetails?';

    const url = `${endPointUrl}code=${this.projectKey}`;

    this.dataService.Get(url).subscribe(
      res => {
        if (res.data.data && res.data.data[0]) {
          this.reportdetails = res.data.data[0];
          this.appTitle = this.reportdetails.ProjectTitle;
          this.allowedExt = this.reportdetails.AllowedExt.split(';');
        } else {
          this.showNotFoundMsg = true;
          this.utilityService.showErrorToast('', 'Invalid File Locator');
          this.utilityService.goBack();
        }

        this.isInprogress = false;
        this.isLoading = false;
      },
      error => {
        this.reportdetails = {};

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
        this.isLoading = false;
      }
    );
  }


}
