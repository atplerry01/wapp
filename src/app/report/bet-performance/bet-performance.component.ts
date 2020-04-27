import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
// import { UtilityService } from 'src/app/shared/service/utility.service';
// import { DialogService } from 'src/app/shared/service/dialog.service';
// import { IBetPerformance } from 'src/app/shared/my-interfaces';

@Component({
  selector: 'app-bet-performance',
  templateUrl: './bet-performance.component.html',
  styleUrls: ['./bet-performance.component.scss']
})
export class BetPerformanceComponent implements OnInit {

  selectedAccountNumber;
  isInprogress = false;
  // tableHeaders = [
  //   // {
  //   //   name: 'REGNO',
  //   //   title: 'Company Name',
  //   //   right: false,
  //   //   isDate: false,
  //   //   isNumber: false
  //   // },
  //   // {
  //   //   name: 'ACOUNTNUMBER',
  //   //   title: 'Account Number',
  //   //   right: true,
  //   //   isDate: false,
  //   //   isNumber: false
  //   // },
  //   {
  //     name: 'NO_OF_TRANSACTIONS',
  //     title: 'No Of Transactions',
  //     right: false,
  //     isDate: false,
  //     isNumber: false
  //   },
  //   {
  //     name: 'CR_VOLUME',
  //     title: 'Credit Volume',
  //     right: false,
  //     isDate: false,
  //     isNumber: false
  //   }
  // ];


  tableHeaders = [
    {
      name: 'accountnumber',
      title: 'Account Number',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'accountname',
      title: 'No Of Transactions',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'total',
      title: 'Total',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'volume',
      title: 'Volume',
      right: true,
      isDate: false,
      isNumber: true
    }
    // {
    //   name: 'status',
    //   title: 'Status',
    //   right: false,
    //   isDate: false,
    //   isNumber: false
    // }
  ];


  companyLists = [];
  // betPerformance: IBetPerformance[] = [];
  betdata: any[] = [];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    // this.getAccountList();
    this.getCollectionPerformance();
  }

  onMainAccountChange($event) {
    console.log($event);
    this.selectedAccountNumber = $event;
  }

  // get the account
  getAccountList() {
    this.dataService.Get(`get_betCompaniesList`)
      .subscribe((res) => {
        res.betCompaniesList.forEach(p => {
          this.companyLists.push({code: p.AccountNumber, name: p.AccountTitle});
        });
      });
  }

  getCollectionPerformance() {
  //  const { accountNumber, dateFrom, dateTo } = entity;
   // const url = `get_BetCollectionPerformance?accountNo=${accountNumber}&startDate=${dateFrom}&endDate=${dateTo}`;
   this.isInprogress = true;
   const url = '/assets/mock/betperformance.json';
   this.dataService.Get_JSON(url)
      .subscribe((res) => {
     //   const { bet: {details} } = res;
       // this.betPerformance = res;
       // console.log('res:', res[0].bet.details);
        this.betdata =  res[0].bet.details;
       // console.log('details:', details);
       this.isInprogress = false;
      });
  }

  // onSearch($event) {
  //   const entity = {
  //     accountNumber: this.selectedAccountNumber,
  //     dateFrom: $event.dateFrom,
  //     dateTo: $event.dateTo
  //   };

  //   this.getCollectionPerformance(entity);
  // }
}
