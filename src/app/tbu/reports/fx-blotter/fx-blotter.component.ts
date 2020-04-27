import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { round } from 'lodash';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/service/data.service';
import * as XLSX from 'xlsx';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-fx-blotter',
  templateUrl: './fx-blotter.component.html',
  styleUrls: ['./fx-blotter.component.scss']
})

export class FxBlotterComponent implements OnInit, OnDestroy {
  @ViewChild('table') table: ElementRef;

  subscription: Subscription;

  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  startDate = '';
  endDate = '';
  newStartDate = '';
  newEndDate = '';

  totalAmount = 0;
  totalOutflow = 0;

  balTnxDate = '';
  balValueDate = '';
  balPurchase = 0.0;
  balRate = 0.0;
  balOutflow = 0.0;

  openBalanceUsd = 0;
  openBalanceNgn = 0;
  newRate = 0;

  reportTitle = '';
  reportData: any[] = [];
  openingBalData: any[] = [];
  blotterList: any[] = [];
  dealLists: any[] = [];
  returnFxData: any[] = [];
  insertEntryModel = {};
  openingAccountBal: any = {};

  reportPurchaseHeader = [
    {
      name: 'DEAL_NUM',
      title: 'DEAL NUM',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DEALTYPE',
      title: 'DEAL TYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'COUNTERPTY',
      title: 'COUNTERPTY',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TNXDATE',
      title: 'TNXDATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'VALUEDATE',
      title: 'VALUEDATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AMOUNT',
      title: 'PURCHASES($)',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'RATE',
      title: 'RATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NAIRAAMOUNT',
      title: 'OUTFLOW(N)',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FX_BUY_SELL',
      title: 'FX_BUY_SELL',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  reportSaleHeader = [
    {
      name: 'DEAL_NUM',
      title: 'DEAL NUM',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DEALTYPE',
      title: 'DEAL TYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'COUNTERPTY',
      title: 'COUNTERPTY',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TNXDATE',
      title: 'TNXDATE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'VALUEDATE',
      title: 'VALUEDATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AMOUNT',
      title: 'SALES($)',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'RATE',
      title: 'RATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NAIRAAMOUNT',
      title: 'OUTFLOW(N)',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'FX_BUY_SELL',
      title: 'FX_BUY_SELL',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  reportHeader = [
    {
      name: 'DEAL_NUM',
      title: 'DEAL NUM',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DEALTYPE',
      title: 'DEAL TYPE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'COUNTERPTY',
      title: 'COUNTERPTY',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'TNXDATE',
      title: 'TNXDATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'VALUEDATE',
      title: 'VALUEDATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'AMOUNT',
      title: 'AMOUNT($)',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'RATE',
      title: 'RATE',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'NAIRAAMOUNT',
      title: 'OUTFLOW(N)',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'FX_BUY_SELL',
      title: 'FX_BUY_SELL',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];


  dealTypes = [];

  selectedBlotterOption = 0;
  blotterPage = false;
  salesDealList = [];
  purchaseDealList = [];

  allAmount = 0;
  allOutFlow = 0;

  purchaseAmount = 0;
  purchaseOutFlow = 0;
  salesAmount = 0;
  salesOutFlow = 0;

  requestStartDate = '';
  requesteeEndDate = '';

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  async ngOnInit() {
    this.reportTitle = 'FX Blotter Report';
  }

  async onSearch(entity) {
    this.per_page = entity.per_page;
    this.startDate = entity.dateFrom;
    this.endDate = entity.dateTo;

    await this.processFxBlotterRequest();
  }

  getFXOpeningBalance = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `fx-blotter/getOpeningBal?startDate=${this.startDate}`;

    this.dataService.Get(url).subscribe(
      res => {
        if (res.data) {
          this.openingBalData = res.data;
          this.openingAccountBal = res.data[0];
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;
      },
      error => {
        this.reportData = [];

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  processFxBlotterRequest = async () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `fx-blotter/getOpeningBal?startDate=${this.startDate}`;

    this.dataService.Get(url).subscribe(
      res => {
        if (res.data) {
          this.openingBalData = res.data;
          this.openingAccountBal = res.data[0];

          if (this.openingBalData && this.openingBalData.length === 0) {
            console.log('invalid start date');
            this.utilityService.showErrorToast('Invalid Opening Start Date', 'Something went wrong!');
          } else {
            console.log('For valid Date Rage');
            // For valid Date Rage
            if (this.openingBalData[0].RequestDate === this.startDate) {
              // Get using existing Balance
              this.getFXDataList();
            } else {
              // Create a new Balance Entry
              console.log('Create a new Balance Entry');
              this.requestStartDate = this.openingBalData[0].RequestDate;
              this.getFxNewBalance();
            }
          }

          this.isInprogress = false;
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;
      },
      error => {
        this.reportData = [];

        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
        this.showNotFoundMsg = true;
      }
    );
  }

  getFxNewBalance = async () => {
    this.isInprogress = true;
    const newStartDate = moment(this.requestStartDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.startDate).format('DD-MMM-YYYY');

    const url = `http://10.21.21.17/DBConn.API/api/v1/DB/fetchdata`;
    const model = {
      dbconn: 'FINTWEMA',
      // tslint:disable-next-line: max-line-length
      query: `select  sum(decode(fx_buy_sell, 'B', -abs(ccy_one_amount_value),'S', abs(ccy_one_amount_value))) total_usd, sum(decode(fx_buy_sell, 'B', -abs(ccy_two_amount_value),'S', abs(ccy_two_amount_value)))  total_ngn from d10105.tt_fx t,d10105.sd_cpty sy,d10105.sd_subtype se where t.cpty_fbo_id_num=sy.fbo_id_num and t.subtype_fbo_id_num=se.fbo_id_num and deal_date >= '${newStartDate}' and deal_date<'${newEndDate}' and deal_state NOT IN ('DLTD','RVSD')`,
      parameters: []
    };

    // openingBalData
    return this.dataService.Post_JSON(model, url).subscribe(res => {
      this.returnFxData = res.responseData;
      this.isInprogress = false;
      // create the Table
      this.insertNewBalance();
      return res.responseData;
    });
  }

  insertNewBalance = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    console.log('openingBalData: ', this.openingBalData);

    if (this.returnFxData && this.returnFxData.length > 0) {
      this.openBalanceUsd = Math.floor(this.returnFxData[0].TOTAL_USD) + Math.floor(this.openingBalData[0].OpenBalanceUsd);
      this.openBalanceNgn = Math.floor(this.returnFxData[0].TOTAL_NGN) + Math.floor(this.openingBalData[0].OpenBalanceNgn);
      this.newRate = (this.openBalanceNgn / this.openBalanceUsd); // TODO: Add the decimal Round

      this.insertEntryModel = {
        requestDate: this.startDate,
        openBalanceUsd: this.openBalanceUsd,
        openBalanceNgn: this.openBalanceNgn,
        newRate: this.newRate
      };

      const url = 'fx-blotter/postFxBalance';

      this.dataService.Post(this.insertEntryModel, url).subscribe(
        res => {
          this.isInprogress = false;
          const msg = 'Record succesfully removed';
          this.utilityService.showSuccessToast(msg, 'Success!');

          this.getFXDataList();
        },
        error => {
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
    }
  }

  getFXDataList() {
    this.getFXOpeningBalance();

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const newStartDate = moment(this.startDate).format('DD-MMM-YYYY');
    const newEndDate = moment(this.endDate).format('DD-MMM-YYYY');

    this.balTnxDate = newStartDate;
    this.balValueDate = newStartDate;
    this.balPurchase = this.openingAccountBal.OpenBalanceUsd;
    this.balRate = this.openingAccountBal.NewRate;
    this.balOutflow = this.openingAccountBal.OpenBalanceNgn;

    const url = `http://10.21.21.30/DBConn.API/api/v1/DB/fetchdata`;
    const model = {
      dbconn: 'FINTWEMA',
      // tslint:disable-next-line: max-line-length
      query: `select deal_num, decode(t.deal_type,'FXSPOT','FX Spot','FXOUTS','FX Outright Short','FXOUTL','FX Outright Long' ) ||' - '||sy.name Dealtype, decode(fx_buy_sell,'B','Purchase','Sale') as FX_BUY_SELL, nvl(t.comments,sy.name) counterpty, to_char(deal_date,'dd-Mon-yyyy') TNXDATE, to_char((decode(t.deal_type,'FXOUTL',END_DATE,deal_date )),'dd-Mon-yyyy') VALUEDATE, abs(ccy_one_amount_value) AMOUNT,decode(t.deal_type,'FXOUTL',FWD_CONTRACT_RATE,contract_rate) RATE, abs(ccy_two_amount_value) nairaamount from d10105.tt_fx t,d10105.sd_cpty sy,d10105.sd_subtype se where t.cpty_fbo_id_num=sy.fbo_id_num and t.subtype_fbo_id_num=se.fbo_id_num and deal_date between '${newStartDate}' and '${newEndDate}' and deal_state NOT IN ('DLTD','RVSD') ORDER BY 5, 3,1`,
      parameters: []
    };

    this.dataService.Post_JSON(model, url).subscribe(
      res => {
        this.reportData = res.responseData;

        const finalResult = [];

        const dealTypeSaleLists = this.reportData.filter(i => i.FX_BUY_SELL === 'Sale');
        const dealTypePurchaseLists = this.reportData.filter(i => i.FX_BUY_SELL === 'Purchase');

        let totalSaleAmount = 0;
        let totalSaleOutflow = 0;

        let totalPurchaseAmount = 0;
        let totalPurchaseOutflow = 0;


        // Purchase Side
        dealTypePurchaseLists.forEach((item, index) => {
          if (index === 0) {
            finalResult.push({
              AMOUNT: '',
              COUNTERPTY: 'PURCHASES',
              DEALTYPE: '',
              DEAL_NUM: '',
              FX_BUY_SELL: '',
              NAIRAAMOUNT: '',
              RATE: '',
              TNXDATE: '',
              VALUEDATE: '',
            }, {
              AMOUNT: 'AMOUNT($)',
              COUNTERPTY: 'COUNTERPTY',
              DEALTYPE: 'DEAL TYPE',
              DEAL_NUM: 'D/S NO',
              FX_BUY_SELL: 'SALES',
              NAIRAAMOUNT: 'OUTFLOW(N)',
              RATE: 'RATE',
              TNXDATE: 'TNX DATE',
              VALUEDATE: 'VALUE DATE',
            });

            finalResult.push({
              AMOUNT: item.AMOUNT,
              COUNTERPTY: item.COUNTERPTY,
              DEALTYPE: item.DEALTYPE,
              DEAL_NUM: item.DEAL_NUM,
              FX_BUY_SELL: item.FX_BUY_SELL,
              NAIRAAMOUNT: item.NAIRAAMOUNT,
              RATE: item.RATE,
              TNXDATE: item.TNXDATE,
              VALUEDATE: item.VALUEDATE,
            });
          } else if ((index !== 0) && (index !== dealTypePurchaseLists.length - 1)) {

            finalResult.push({
              AMOUNT: item.AMOUNT,
              COUNTERPTY: item.COUNTERPTY,
              DEALTYPE: item.DEALTYPE,
              DEAL_NUM: item.DEAL_NUM,
              FX_BUY_SELL: item.FX_BUY_SELL,
              NAIRAAMOUNT: item.NAIRAAMOUNT,
              RATE: item.RATE,
              TNXDATE: item.TNXDATE,
              VALUEDATE: item.VALUEDATE,
            });
          } else if (index === dealTypePurchaseLists.length - 1) {
            finalResult.push({
              AMOUNT: item.AMOUNT,
              COUNTERPTY: item.COUNTERPTY,
              DEALTYPE: item.DEALTYPE,
              DEAL_NUM: item.DEAL_NUM,
              FX_BUY_SELL: item.FX_BUY_SELL,
              NAIRAAMOUNT: item.NAIRAAMOUNT,
              RATE: item.RATE,
              TNXDATE: item.TNXDATE,
              VALUEDATE: item.VALUEDATE,
            });
          }

          totalPurchaseAmount += item.AMOUNT;
          totalPurchaseOutflow += item.NAIRAAMOUNT;
        });

        if (dealTypePurchaseLists.length > 0) {
          finalResult.push(
            {
              AMOUNT: totalPurchaseAmount ? totalPurchaseAmount : '',
              COUNTERPTY: 'TOTAL PURCHASES',
              DEALTYPE: '',
              DEAL_NUM: '',
              FX_BUY_SELL: '',
              NAIRAAMOUNT: totalPurchaseOutflow ? totalPurchaseOutflow : '',
              RATE: '',
              TNXDATE: '',
              VALUEDATE: '',
            },
            {
              AMOUNT: '',
              COUNTERPTY: '',
              DEALTYPE: '',
              DEAL_NUM: '',
              FX_BUY_SELL: '',
              NAIRAAMOUNT: '',
              RATE: '',
              TNXDATE: '',
              VALUEDATE: '',
            });
        }

        // For Sales
        dealTypeSaleLists.forEach((item, index) => {

          if (index === 0 && dealTypeSaleLists.length > 0) { // TODO
            finalResult.push(
              {
                AMOUNT: '',
                COUNTERPTY: 'SALES',
                DEALTYPE: '',
                DEAL_NUM: '',
                FX_BUY_SELL: '',
                NAIRAAMOUNT: '',
                RATE: '',
                TNXDATE: '',
                VALUEDATE: '',
              }, {
              AMOUNT: 'AMOUNT($)',
              COUNTERPTY: 'COUNTERPTY',
              DEALTYPE: 'DEAL TYPE',
              DEAL_NUM: 'D/S NO',
              FX_BUY_SELL: 'SALES',
              NAIRAAMOUNT: 'OUTFLOW(N)',
              RATE: 'RATE',
              TNXDATE: 'TNX DATE',
              VALUEDATE: 'VALUE DATE',
            });

            finalResult.push({
              AMOUNT: item.AMOUNT,
              COUNTERPTY: item.COUNTERPTY,
              DEALTYPE: item.DEALTYPE,
              DEAL_NUM: item.DEAL_NUM,
              FX_BUY_SELL: item.FX_BUY_SELL,
              NAIRAAMOUNT: item.NAIRAAMOUNT,
              RATE: item.RATE,
              TNXDATE: item.TNXDATE,
              VALUEDATE: item.VALUEDATE,
            });
          } else if ((index !== 0) && (index !== dealTypeSaleLists.length - 1)) {
            // console.log('middle item', item.COUNTERPTY);
            finalResult.push({
              AMOUNT: item.AMOUNT,
              COUNTERPTY: item.COUNTERPTY,
              DEALTYPE: item.DEALTYPE,
              DEAL_NUM: item.DEAL_NUM,
              FX_BUY_SELL: item.FX_BUY_SELL,
              NAIRAAMOUNT: item.NAIRAAMOUNT,
              RATE: item.RATE,
              TNXDATE: item.TNXDATE,
              VALUEDATE: item.VALUEDATE
            });
          } else if (index === dealTypeSaleLists.length - 1) {
            finalResult.push({
              AMOUNT: item.AMOUNT,
              COUNTERPTY: item.COUNTERPTY,
              DEALTYPE: item.DEALTYPE,
              DEAL_NUM: item.DEAL_NUM,
              FX_BUY_SELL: item.FX_BUY_SELL,
              NAIRAAMOUNT: item.NAIRAAMOUNT,
              RATE: item.RATE,
              TNXDATE: item.TNXDATE,
              VALUEDATE: item.VALUEDATE
            });

          }

          totalSaleAmount += item.AMOUNT;
          totalSaleOutflow += item.NAIRAAMOUNT;

          console.log('dealTypeSaleLists.length > 0', totalSaleAmount);
          console.log('dealTypeSaleLists.length > 0', item.AMOUNT);

        });

        if (dealTypeSaleLists.length > 0) {
          finalResult.push(
            {
              AMOUNT: totalSaleAmount ? totalSaleAmount : '',
              COUNTERPTY: 'TOTAL SALES',
              DEALTYPE: '',
              DEAL_NUM: '',
              FX_BUY_SELL: '',
              NAIRAAMOUNT: totalSaleOutflow ? totalSaleOutflow : '',
              RATE: '',
              TNXDATE: '',
              VALUEDATE: '',
            },
            {
              AMOUNT: '',
              COUNTERPTY: '',
              DEALTYPE: '',
              DEAL_NUM: '',
              FX_BUY_SELL: '',
              NAIRAAMOUNT: '',
              RATE: '',
              TNXDATE: '',
              VALUEDATE: '',
            });
        }

        this.totalAmount = Math.floor(totalPurchaseAmount) + Math.floor(this.balPurchase) - Math.floor(totalSaleAmount);
        this.totalOutflow = Math.floor(totalPurchaseOutflow) + Math.floor(this.balOutflow) - Math.floor(totalSaleOutflow);

        this.reportData = finalResult;
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



























  fireEvent() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'FXBlotter.xlsx');
  }

  numberFormatting(entity) {
    return entity && !isNaN(entity) ? new Intl.NumberFormat().format(entity) : entity;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
