import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Chart } from 'angular-highcharts';
import { UtilityService } from '../../shared/service/utility.service';
import { DataService } from '../../shared/service/data.service';
import { IAccountStatitics } from '../../shared/my-interfaces';
// import { fadeAnimation } from '../../shared';
import { MapService } from '../../shared/service/map.service';

@Component({
  selector: 'app-accstats',
  templateUrl: './accstats.component.html',
  styleUrls: ['./accstats.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class AccstatsComponent implements OnInit {
  productChart: Chart;
  regionChart: Chart;
  zoneChart: Chart;
  branchChart: Chart;
  @ViewChild('bottomtag') bottomtag: ElementRef;

  isInprogress = false;
  isSearchedBefore = false;
  accountStatsByProduct: IAccountStatitics[] = [];
  accountStatsByRegion: IAccountStatitics[] = [];
  accountStatsByZone: IAccountStatitics[] = [];
  accountStatsByRegionGraph: IAccountStatitics[] = [];
  accountStatsByZoneGraph: IAccountStatitics[] = [];
  accountStatsByBranchesGraph: IAccountStatitics[] = [];
  showTable = true;

  selectedProductType = '';
  selectedProductCode = '';
  selectedPronductIndex: number = null;
  selectedRegionIndex: number = null;

  totalAccount = 0.0;
  totalDormant = 0.0;
  totalVolume = 0.0;
  totalcount = 0;

  totalAccount_region = 0.0;
  totalVolume_region = 0.0;

  totalAccount_zone = 0.0;
  totalVolume_zone = 0.0;
  dormancy_zone = 0;

  isSameZoneName = false;
  holdCountVal = 0;
  lastZoneName = '';


  myAccess: any = {};

  constructor(
    private dataService: DataService,
    public utilityService: UtilityService,
    private mapService: MapService
  ) { }

  ngOnInit() {
    if (!!this.dataService.getStoredTempData('accstats_showtable') && this.dataService.getStoredTempData('accstats_showtable') === 'false'
    ) {
      this.showTable = false;
    }
    this.getAccountStatiticsByProducts();
    this.myAccess = this.utilityService.getAccessInfo('Account Statistics');
  }

  // set whether report should show table or graph
  selectReportLayoutType(type = 't') {
    if (type === 't') {
      this.showTable = true;
    } else {
      this.showTable = false;
    }
    this.dataService.StoreTempData('accstats_showtable', this.showTable);
  }

  getAccountStatiticsByProducts() {

    const productTypes = [];

    this.isSearchedBefore = true;
    this.isInprogress = true;
    this.dataService.Get(`getAccountStatiticsByProducts`).subscribe(
      res => {
        // const results: IAccountStatitics[] = res;
        this.isInprogress = false;
        this.accountStatsByProduct = res;

        this.accountStatsByProduct.forEach(val => {
          this.totalAccount += val.Total;
          this.totalDormant += val.TotalDormant;
          this.totalVolume += val.DVolume;

          if (productTypes.indexOf(val.ProductType) === -1) {
            productTypes.push(val.ProductType);
          }
        });

        const _acctStatsByProductData = [];
        let removeTotalVolume = 0.00;
        let removeTotalCount = 0;

        productTypes.forEach(val => {
          const removeData = this.accountStatsByProduct.filter(x => x.ProductType === val && x.DVolume < 0);

          if (removeData.length > 0) {
            const dprodType_Volume = removeData.map(x => x.DVolume);
            const dprodType_TotalVolume = dprodType_Volume.reduce(this.getSum);
            const dprodType_Count = removeData.map(x => x.Total);
            const dprodType_TotalCount = dprodType_Count.reduce(this.getSum);

            removeTotalVolume += dprodType_TotalVolume;
            removeTotalCount += dprodType_TotalCount;
          }


        });


        productTypes.forEach(val => {
          const data = this.accountStatsByProduct.filter(x => x.ProductType === val && x.DVolume >= 0);

          if (data.length > 0) {
            const prodType_Volume = data.map(x => x.DVolume);
            const prodType_TotalVolume = prodType_Volume.reduce(this.getSum);
            const prodType_Count = data.map(x => x.Total);
            const prodType_TotalCount = prodType_Count.reduce(this.getSum);

            const dt = {
              name: val, y: (prodType_TotalVolume / (this.totalVolume - removeTotalVolume)) * 100, countTotal: prodType_TotalCount,
              count: (prodType_TotalCount / (this.totalAccount - removeTotalCount)) * 100,
              amount: prodType_TotalVolume.toLocaleString(), drilldown: val
            };
            _acctStatsByProductData.push(dt);
          }

        });

        this.productChart = this.setPieChart(_acctStatsByProductData, 'Account Statistics By Product', 'Amount in (000)', 'Volume');
      },
      error => {
        // console.log(error);
        this.utilityService.showErrorToast(error, 'Something went wrong!');
        this.isInprogress = false;
      }
    );
  }

  getSum(total, num) {
    return total + num;
  }

  close() {
    this.accountStatsByRegion = [];
    this.accountStatsByZone = [];
    this.accountStatsByRegionGraph = [];
    this.accountStatsByZoneGraph = [];
    this.accountStatsByBranchesGraph = [];
    this.selectedPronductIndex = null;
    this.selectedRegionIndex = null;
    this.selectedProductCode = '';
    this.selectedProductType = '';
  }

  getAccountStatiticsByRegion(index: number, productcode: string) {
    const _acctStatsByRegionCat: string[] = [];
    const _acctStatsByRegionData: number[] = [];

    this.isInprogress = true;
    this.totalAccount_region = 0.0;
    this.totalVolume_region = 0.0;
    this.accountStatsByRegion = [];
    this.accountStatsByZone = [];

    this.selectedProductCode = productcode;
    this.selectedPronductIndex = index;

    this.dataService
      .Get(`getAccountStatiticsByRegion/${productcode}`)
      .subscribe(
        res => {
          this.accountStatsByRegion = res;
          this.isInprogress = false;
          // console.log('getAccountStatiticsByRegion:', this.accountStatsByRegion);

          if (this.accountStatsByRegion.length > 0) {
            this.accountStatsByRegion.forEach(val => {
              this.totalAccount_region += val.Total;
              this.totalVolume_region += val.DVolume;

              _acctStatsByRegionCat.push(val.RegionName);
              _acctStatsByRegionData.push(
                parseFloat(val.DVolume ? val.DVolume.toFixed(2) : '0.00')
              );
            });
          } else {
            this.utilityService.showInfoToast(
              'Drilldown not available at the moment',
              'Drilldown!'
            );
            this.close();
          }
        },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
  }

  getAccountStatiticsByZones(index: number, regioncode: string) {
    const _acctStatsByZoneCat: string[] = [];
    const _acctStatsByZoneData: number[] = [];

    this.isInprogress = true;
    this.totalAccount_zone = 0.0;
    this.totalVolume_zone = 0.0;
    this.dormancy_zone = 0;
    this.accountStatsByZone = [];
    this.selectedRegionIndex = index;

    this.dataService
      .Get(
        `getAccountStatiticsByZones?productcode=${
        this.selectedProductCode
        }&regioncode=${regioncode}`
      )
      .subscribe(
        res => {
          this.accountStatsByZone = res;
          this.isInprogress = false;

          this.accountStatsByZone.forEach(val => {
            this.totalAccount_zone += val.DTotal;
            this.totalVolume_zone += val.DVolume;
            this.dormancy_zone += val.Dormancy;

            if (_acctStatsByZoneCat.indexOf(val.ZoneName) === -1) { _acctStatsByZoneCat.push(val.ZoneName); }
          });

          _acctStatsByZoneCat.forEach(zoneName => {
            let total = 0.0;
            this.accountStatsByZone.forEach(val => {
              if (zoneName === val.ZoneName) { total += val.DVolume; }
            });

            _acctStatsByZoneData.push(parseFloat(total.toFixed(2)));
          });
          //  console.log('_acctStatsByZoneCat:', JSON.stringify(_acctStatsByZoneCat));
          //  console.log('_acctStatsByZoneData:', JSON.stringify(_acctStatsByZoneData));
        },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
  }


  getAccountStatiticsByRegionGraph(productType: string) {

    this.isInprogress = true;
    this.selectedProductType = productType;
    const _graphData: any[] = [];

    this.dataService
      .Get(`getAccountStatiticsByRegionGraph/${productType}`)
      .subscribe(
        res => {
          this.accountStatsByRegionGraph = res;
          this.isInprogress = false;


          if (this.accountStatsByRegionGraph.length > 0) {

            const DVolumes = this.accountStatsByRegionGraph.map(x => x.DVolume);
            const TotalDVolumes = DVolumes.reduce(this.getSum);
            const count = this.accountStatsByRegionGraph.map(x => x.Total);
            const TotalCount = count.reduce(this.getSum);

            this.accountStatsByRegionGraph.forEach(val => {

              const dt = {
                name: val.RegionName, y: (val.DVolume / TotalDVolumes) * 100,
                countTotal: val.Total,
                count: (val.Total / TotalCount) * 100,
                amount: val.DVolume.toLocaleString(),
                regioncode: val.RegionCode,
                regionname: val.RegionName
              };
              _graphData.push(dt);
            });

            this.regionChart = this.setPieChart(_graphData, this.selectedProductType + ' By Region', 'Amount in (000)', 'Volume', 'r');
            this.utilityService.scrollToElement(this.bottomtag);
          }

        },
        error => {
          // console.log(error);
          this.accountStatsByRegionGraph = [];
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
  }

  getAccountStatiticsByZonesGraph(regioncode: string, regionname: string) {

    this.isInprogress = true;
    const _graphData: any[] = [];

    this.dataService
      .Get(
        `getAccountStatiticsByZonesGraph?producttype=${
        this.selectedProductType
        }&regioncode=${regioncode}`
      )
      .subscribe(
        res => {
          this.accountStatsByZoneGraph = res;
          this.isInprogress = false;

          if (this.accountStatsByZoneGraph.length > 0) {

            const DVolumes = this.accountStatsByZoneGraph.map(x => x.DVolume);
            const TotalDVolumes = DVolumes.reduce(this.getSum);
            const count = this.accountStatsByZoneGraph.map(x => x.DTotal);
            const TotalCount = count.reduce(this.getSum);

            this.accountStatsByZoneGraph.forEach(val => {

              const dt = {
                name: val.ZoneName,
                y: (val.DVolume / TotalDVolumes) * 100,
                countTotal: val.DTotal,
                count: (val.DTotal / TotalCount) * 100,
                amount: val.DVolume.toLocaleString(),
                zonecode: val.ZoneCode
              };
              _graphData.push(dt);
            });

            this.zoneChart = this.setPieChart(_graphData, regionname + ' Zonal level', 'Amount in (000)', 'Volume', 'z');
            this.utilityService.scrollToElement(this.bottomtag);
          }
        },
        error => {
          // console.log(error);
          this.accountStatsByZoneGraph = [];
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
  }

  getAccountStatiticsByBranches(zonecode: string, zonename: string) {

    this.isInprogress = true;
    const _graphData: any[] = [];

    this.dataService
      .Get(
        `getAccountStatiticsByBranches?producttype=${
        this.selectedProductType
        }&zonecode=${zonecode}`
      )
      .subscribe(
        res => {
        //  console.log('accountStatsByBranchesGraph:', res);
          this.accountStatsByBranchesGraph = res;
          this.isInprogress = false;

          if (this.accountStatsByBranchesGraph.length > 0) {

            const DVolumes = this.accountStatsByBranchesGraph.map(x => x.DVolume);
            const TotalDVolumes = DVolumes.reduce(this.getSum);
            const count = this.accountStatsByBranchesGraph.map(x => x.DTotal);
            const TotalCount = count.reduce(this.getSum);

            this.accountStatsByBranchesGraph.forEach(val => {

              const dt = {
                name: val.BranchName,
                y: (val.DVolume / TotalDVolumes) * 100,
                countTotal: val.DTotal,
                count: (val.DTotal / TotalCount) * 100,
                amount: val.DVolume.toLocaleString(),
                branchcdoe: null // val.ZoneCode
              };
              _graphData.push(dt);
            });

            this.branchChart = this.setPieChart(_graphData, zonename + ' branch level', 'Amount in (000)', 'Volume', '');
            this.utilityService.scrollToElement(this.bottomtag);
          }
        },
        error => {
          // console.log(error);
          this.accountStatsByZoneGraph = [];
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        }
      );
  }


  checkSameZone(index: number, _zoneName: string) {
    if (index <= this.accountStatsByZone.length - 1) {
      this.isSameZoneName = _zoneName === this.lastZoneName;
      if (this.isSameZoneName) {
        this.holdCountVal++;
      } else { this.holdCountVal = 1; }
    } else {
      this.isSameZoneName = false;
      this.holdCountVal = 1;
    }

    this.lastZoneName = _zoneName;
  }


  setPieChart(
    _data: any[],
    _title: string,
    _subTitle: string,
    _name: string,
    _level = 'g'
  ) {
    return new Chart({
      title: {
        align: 'left',
        text: _title
      },
      // subtitle: {
      //   align: 'center',
      //   style: { 'font-size': '0.75em' },
      //   text: _subTitle
      // },

      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            format: '# of {point.name}: ({point.countTotal}) {point.count:.1f}%',
          },
          showInLegend: true,
          allowPointSelect: true,
        },
        // legend: {
        //   layout: 'vertical',
        //   borderWidth: 0,
        //   floating: true,
        //   align: 'left',
        //   verticalAlign: "middle",
        //   labelFormat: "{name}: {y:.2f}%"
        // },
        series: {
          cursor: 'pointer',
          events: {
            click: (event) => {

              if (_level === 'g') { // if it is main view then open regional chart
                this.getAccountStatiticsByRegionGraph((event as any).point.options.name);
              } else if (_level === 'r') { // if it is regional view then open zonal chart
                this.getAccountStatiticsByZonesGraph((event as any).point.options.regioncode, (event as any).point.options.regionname);
              } else if (_level === 'z') { // if it is regional view then open zonal chart
                this.getAccountStatiticsByBranches((event as any).point.options.zonecode, (event as any).point.options.name);
              } else {
                this.utilityService.showInfoToast('Drilldown not available at the moment', 'Drilldown!');
              }
              // console.log(event);
              // console.log((event as any).point.options);

            }
          }
        }
      },
      tooltip: {
        headerFormat: '<span>{series.name}</span><br />',
        pointFormat:
          '<span style="color:{point.color}">{point.name}</span>: <b>₦{point.amount}</b>'
      },
      chart: {
        type: 'pie',
      },
      series: [
        {
          name: _name,
          // colorByPoint: true,
          data: _data
        }
      ],
      legend: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        layout: 'vertical',
        borderWidth: 0,
        // floating: true,
        align: 'left',
        verticalAlign: 'middle',
        labelFormat: '{name}: {y:.2f}%'
      },

    });
  }


}






// setColumnChart(
//   _series: any[],
//   _categories: string[],
//   _title: string,
//   _subtitle: string,
//   _yAxisTitle: string,
//   _xAxisTitle: string,
//   _chartType: ChartTypes = ChartTypes.column,
//   _sharedTooltip = true,
//   _height = 800,
//   _titleAlign = "center",
//   _chartInverted = false,
//   _showDataLabel = false
// ) {
//   return new Chart({
//     title: {
//       align: _titleAlign,
//       text: _title
//     },
//     subtitle: {
//       align: _titleAlign,
//       style: { "font-size": "0.75em" },
//       text: _subtitle
//     },
//     tooltip: {
//       shared: _sharedTooltip,
//       crosshairs: true
//       //  headerFormat: "<span>{series.name}</span><br />",
//       // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br />'
//     },
//     plotOptions: {
//       series: {
//         cursor: "pointer",
//         showInLegend: false,
//         events: {
//           click: (e: any) => {
//             console.log(event);
//             alert(
//               "Category: " +
//               e.point.category +
//               "\n" +
//               "value: " +
//               e.point.options.y
//             );
//           }
//         },
//         marker: {
//           lineWidth: 1
//         }
//       },
//       column: {
//         dataLabels: {
//           enabled: _showDataLabel
//         }
//       }
//     },
//     // series: _series,
//     series: [
//       {
//         data: _series // _data
//       }
//     ],
//     chart: {
//       type: _chartType,
//       height: _height
//     },
//     yAxis: {
//       allowDecimals: true,
//       title: {
//         text: _yAxisTitle
//       }
//       // labels: {
//       //   format: '{value}'
//       // },
//       // lineWidth: 2
//     },
//     xAxis: {
//       categories: _categories,
//       maxPadding: 0.05,
//       showLastLabel: true,
//       title: {
//         text: _xAxisTitle
//       }
//     }
//   });
// }
