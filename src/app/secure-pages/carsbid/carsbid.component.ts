import { Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { UtilityService, DataService, DialogService } from '../../shared/service/index';
import { IAssetBid } from '../../shared/my-interfaces';



@Component({
  selector: 'app-carsbid',
  templateUrl: './carsbid.component.html',
  styleUrls: ['./carsbid.component.scss']
})

export class CarsbidComponent implements OnInit {

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
      name: 'PHOTO',
      title: 'Photo',
      right: false,
      isDate: false,
      isNumber: false,
      isPicture: true,
      pictureSize: {
        width: 200,
        height: 200
      }
    }
  ];

  carbids: IAssetBid[] = [];
  carbidsFiltered: IAssetBid[] = [];
  carbidsFinal: IAssetBid[] = [];
  selectedAsset: IAssetBid;

  filteredItemSelected = '';
  bidopened = false;
  bidAmount = 0.00;
  isAcknowledge = false;
  currentUser: any;
  AllBrands = [{code: '', name: 'ALL' }];
  AllTypes = [{code: '', name: 'ALL' }];

  showNotFoundMsg = false;
  isInprogress = false;

  isCollapseOnSelect = false;
  showForm = false;
  allowedgrades = environment.allowedgrades;

  constructor(
    private dataService: DataService,
    private utilityService: UtilityService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {

    this.currentUser = this.dataService.getCurrentUser();
    if (this.allowedgrades.findIndex(x => x === this.currentUser.grade) !== -1) {
      this.getCarBids();
     } else {
       this.utilityService.goBack();
     }
  }

  getCarBids() {

     this.showNotFoundMsg = false;
     this.isInprogress = true;

    this.dataService.Get(`get_obsolete_car`)
      .subscribe((res) => {

        if (res && res.cars) {

          this.bidopened = res.bidopened;

          this.carbids = res.cars.map(x => {
              x.PHOTO = `assets/images/cars/${x.PHOTO}`;

              if (this.AllBrands.findIndex(y => y.code === x.BRAND) === -1) {
                this.AllBrands.push({code: x.BRAND, name: x.BRAND });
              }

              return x;
          });

          this.carbidsFiltered = this.carbids;
          this.carbidsFinal = this.carbids;
        } else {
          this.showNotFoundMsg = true;
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
    this.showForm = false;
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
    this.showForm = !this.showForm; // display form
  }

  closeDetail() {
    this.isCollapseOnSelect = false;
    this.showForm = false;
  }

  submitBid() {
    if (!this.isAcknowledge) {
      this.utilityService.showErrorToast('Please, go and inspect this vehicle first before placing a bid', 'Not Allowed');
      return;
    }

    if (isNaN(this.bidAmount)) {
      this.utilityService.showErrorToast('Please, only valid amount is allowed', 'Enter Valid Amount');
      return;
    }

    if (this.bidAmount < Number(this.selectedAsset.BASEPRICE)) {
      this.utilityService.showErrorToast('Bid price cannot be less than the base price', 'Enter Valid Amount');
      return;
    }

    const msg = `You are allowed to bid for one (1) vehicle only. Any case of multiple bidding shall be disqualified.
    Withdrawal of bids after submission will not be allowed.`;

    this.dialogService.confirm(msg).subscribe(res => {
      if (res) {
      this.placeBid(this.bidAmount);
      } else {
        this.resetForm();
      }
    });


  }

  resetForm() {
    this.bidAmount = 0.00;
    this.isAcknowledge = false;
    this.closeDetail();
  }
  placeBid(amount: number) {

    // this.showNotFoundMsg = false;
     this.isInprogress = true;
     const param = {obsoleteCarId: this.selectedAsset.id, amount};

    this.dataService.Post(param , `add_bid`)
      .subscribe((res) => {

      if (res.success) {  this.utilityService.showSuccessToast(res.message, 'Success'); }

        this.isInprogress = false;
        this.resetForm();

      },
        error => {
          console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.resetForm();
        });
  }





}
