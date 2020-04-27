import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { ExcelExporterService } from './../../../shared/service/excel-exporter.service';
import { UtilityService } from './../../../shared/service/utility.service';

@Component({
  selector: 'app-unrealized-transactions',
  templateUrl: './unrealized-transactions.component.html',
  styleUrls: ['./unrealized-transactions.component.scss']
})

export class UnrealizedTransactionsComponent implements OnInit {

  isInprogress = false;
  showNotFoundMsg = false;

  page = 1;
  per_page = 15;
  totalRecords = 0;
  total_pages = 0;
  pre_page?: number;
  next_page?: number;

  reportTitle = '';
  reportData: any[] = [];

  reportHeader = [
    {
      name: 'HOLDINGNUMBER',
      title: 'HOLDINGNUMBER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BUYDEALNUMBER',
      title: 'BUYDEALNUMBER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BUYPRICE',
      title: 'BUYPRICE',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'SELLDEALNUMBER',
      title: 'SELLDEALNUMBER',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'SELLPRICE',
      title: 'SELLPRICE',
      right: false,
      isDate: false,
      isNumber: true
    },
    {
      name: 'QUANTITYREALIZED',
      title: 'QUANTITYREALIZED',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'DATETOREALISE',
      title: 'DATETOREALISE',
      right: false,
      isDate: true,
      isNumber: false
    },
    {
      name: 'TRANSACTIONDATE',
      title: 'TRANSACTIONDATE',
      right: false,
      isDate: true,
      isNumber: false
    }
  ];

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private excelExporterService: ExcelExporterService
  ) { }

  ngOnInit() {
    this.reportTitle = 'Unrealized Transactions';
    this.getUnrealizedTransactions();
  }

  getUnrealizedTransactions = () => {
    this.showNotFoundMsg = false;
    this.isInprogress = true;

    const url = `http://10.21.21.30/DBConn.API/api/v1/DB/fetchdata`;
    const model = {
      dbconn: 'FINTWEMA',
      // tslint:disable-next-line: max-line-length
      query: "select  buy_deal_num as BuyDealNumber, sell_deal_num as SellDealNumber, trantime as TransactionDate, date_to_realize as DateToRealise, Realized_Qty As QuantityRealized, Holding_Deal_Num As HoldingNumber, (select ROUND(price,2) from D10105.Tt_Sec_Bs Where Buy_Or_Sell='B' and deal_num=A.Buy_Deal_Num) As BuyPrice, (select ROUND(price,2) from D10105.Tt_Sec_Bs Where Buy_Or_Sell='S' and deal_num=A.sell_Deal_Num) As SellPrice From  D10105.Tt_Sec_Realize_Entry A Where Is_Processed = 'N' order by trantime desc",
      parameters: []
    };

    console.log(model);

    this.dataService.Post_JSON(model, url).subscribe(
      res => {
        if (res.responseData && res.responseData.length > 0) {
          this.reportData = res.responseData;
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
    this.isInprogress = true;

    const data = this.reportData;
    this.excelExporterService.exportAsExcelFile(data, `unrealized-transaction-report`);
    this.isInprogress = false;
  }

}
