import { Component, OnInit } from '@angular/core';

import { UtilityService, DataService, ExcelExporterService } from '../../shared/service/index';
import { IAssetBid, IAssetBidDetails, IAssetBidDetailsWithPagination } from '../../shared/my-interfaces';



@Component({
  selector: 'app-carsbids',
  templateUrl: './carsbids.component.html',
  styleUrls: ['./carsbids.component.scss']
})

export class CarsbidsComponent implements OnInit {

  tableHeaders = [
    {
      name: 'BRAND',
      title: 'Brand',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TYPE',
      title: 'Type',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'REGNO',
      title: 'Registration Number',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'LOTNO',
      title: 'LOT Number',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BASEPRICE',
      title: 'Base Price',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'LOCATION',
      title: 'Location',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TOTALBIDS',
      title: 'Total Bids',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'HIGHESTBID',
      title: 'Highest Bid',
      right: true,
      isDate: false,
      isNumber: true
    },
  ];

  tableSubHeaders = [
    {
      name: 'created',
      title: 'Date',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'staffname',
      title: 'Staff Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'grade',
      title: 'Grade',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'branchDept',
      title: 'Branch/Dept.',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'staffId',
      title: 'StaffNo',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'amount',
      title: 'Bid Price',
      right: true,
      isDate: false,
      isNumber: true
    },
    {
      name: 'totalbid',
      title: 'Total Bid',
      right: true,
      isDate: false,
      isNumber: false
    }
  ];

  isInprogress = false;
  showNotFoundMsg = false;
  showCloseIcon = false;

  page = 1; // current page
  per_page = 200;
  pre_page?: number; // previous
  next_page?: number;
  totalRecords = 0; // total record
  total_pages = 0;

  carbids: IAssetBid[] = [];
  carbidsFiltered: IAssetBid[] = [];
  carbidsFinal: IAssetBid[] = [];
  selectedAsset: IAssetBid;

  bidders: IAssetBidDetails[] = [];

  filteredItemSelected = '';
  AllBrands = [{code: '', name: 'ALL' }];
  AllTypes = [{code: '', name: 'ALL' }];
  isCollapseOnSelect = false;


  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private excelExport: ExcelExporterService
  ) { }

  ngOnInit() {

    const myAccess = this.utilityService.getAccessInfo('Asset Disposal Bids');
    if (myAccess.name !== 'No Access') {
      this.getCarBids();
     } else {
       this.utilityService.goBack();
     }
  }

  onExportToExcel() {
    this.getCarBids(1);
  }

  getCarBids(exportToExcel = 0) {

    // this.showNotFoundMsg = false;
     this.isInprogress = true;

    this.dataService.Get(`get_obsoletecar_bidreport_totalbids`)
      .subscribe((res) => {

        if (res && res.cars) {

          if (exportToExcel === 1) {
            this.excelExport.exportAsExcelFile(res.cars, 'bids_Report');
          } else {

          this.carbids = res.cars.map(x => {
            //  x.PHOTO = `assets/images/cars/${x.PHOTO}`;

              if (this.AllBrands.findIndex(y => y.code === x.BRAND) === -1) {
                this.AllBrands.push({code: x.BRAND, name: x.BRAND });
              }

              return x;
          });

          this.carbidsFiltered = this.carbids;
          this.carbidsFinal = this.carbids;
        }

      }

        this.isInprogress = false;

      },
        error => {
          console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }

  onFilterDropdownChange($event) {
    this.filteredItemSelected = $event;
    this.AllTypes = [{code: '', name: 'ALL' }];

    if (this.filteredItemSelected === '') {
      this.carbidsFiltered = this.carbids;
      this.carbidsFinal = this.carbids;
    } else {
      this.carbidsFiltered = this.carbids.filter(x => x.BRAND.trim() === this.filteredItemSelected);
      this.carbidsFinal = this.carbidsFiltered;

      this.carbidsFiltered.forEach(x => {
        const _type = x.TYPE.trim();
        if (this.AllTypes.findIndex(y => y.code === _type) === -1) {
          this.AllTypes.push({code: _type, name: _type });
        }
      });

    }
   // this.showForm = false;
  }


  onFilterDropdownChange2($event) {

    if ($event === '') {
      this.carbidsFinal = this.carbidsFiltered;
    } else {
      this.carbidsFinal = this.carbidsFiltered.filter(x => x.TYPE.trim() === $event);
    }
  }

  onRowSelected($event) {
    this.isCollapseOnSelect = !this.isCollapseOnSelect;
    this.selectedAsset = $event;

    if (this.isCollapseOnSelect) {
      this.getBidders();
    }
  }

  closeBidders() {
    this.isCollapseOnSelect = false;
    this.bidders = [];
  }


  getBidders(exportToExcel = 0) {

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    if (exportToExcel === 0) {
    this.bidders = [];
    }

    const url = `get_obsoletecar_bid?id=${this.selectedAsset.id}&page=${this.page}&per_page=${this.per_page}`;

    this.dataService.Get(url)
      .subscribe((res) => {

        const result: IAssetBidDetailsWithPagination = res;

        if (exportToExcel === 1) {
          this.excelExport.exportAsExcelFile(result.data, 'bidders_Report');
        } else {

        if (result && result.data.length) {
          this.showCloseIcon = true;
          this.bidders = result.data;

          this.pre_page = result.pre_page;
          this.next_page = result.next_page;
          this.totalRecords = result.total;
          this.total_pages = result.total_pages;
        } else {
          this.utilityService.showInfoToast(
            'No bid at the moment',
            'No Bid!'
          );

          this.showCloseIcon = false;
          this.isCollapseOnSelect = false;
        }
      }

        this.isInprogress = false;
      },
        error => {
           // console.log(error);
           if (exportToExcel === 0) {
           this.pre_page = null;
           this.next_page = null;
           this.totalRecords = 0;
           }

          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
          this.isCollapseOnSelect = false;
        });
  }


  onPageChange(offset) {
    this.page = (offset / this.per_page) + 1;
    // console.log('page: ', this.page);
    this.getBidders();
  }

  onExportToExcelBidders() {
    this.getBidders(1);
  }



}
