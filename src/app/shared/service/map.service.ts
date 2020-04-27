import { Injectable } from '@angular/core';
import { UtilityService } from './utility.service';

import { Chart } from 'angular-highcharts';

@Injectable({ providedIn: 'root', })
export class MapService {

  constructor(private utilityService: UtilityService) {

  }




  // getIncidentsMonthlySummary() {
  //   let _categories: string[] = [];
  //   let _data: number[] = [];

  //           res.data.forEach(dt => {
  //             _categories.push(dt._month);
  //             _data.push(parseInt(dt.total))
  //           });

  //         this.MonthlyIncidentsSummary_chartOptions = this.setColumnChart(_data, _categories, "Monthly Incident Summary", "Monthly Incident Count", "Month", false, this.dateFrom, this.dateTo
  //           , 'month', this.canViewReport, this.router, this.displaySelectedLGA);

  // }

  setColumnChart(_series: any[], _categories: string[], _title: string, _subtitle: string,
    _yAxisTitle: string, _xAxisTitle: string, _chartType: ChartTypes = ChartTypes.column,
    _sharedTooltip = true,  _height = 600, _isRouting = false,  _routeUrl = '', 
    _titleAlign = 'center', _chartInverted = false, _showDataLabel = false, 
    _showLineChartLabel= false, _enableMouseTracking=true) {
    return new Chart({
      
      title: {
        align: _titleAlign,
        text:  _title
      },
      subtitle: {
        align: _titleAlign,
        style: { "font-size": "0.75em" },
        text: _subtitle
      },
      tooltip: {
        shared: _sharedTooltip,
        crosshairs: true
         // headerFormat: "<span>{series.name}</span><br />",
        // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br />'
      },
      plotOptions: {
        line: { //this section is applicable to line charts and its related charts
          dataLabels: {
            enabled: _showLineChartLabel  //show the value on the the lines charts when is set to true
          },
          enableMouseTracking: _enableMouseTracking //it deplays the tooltips popup when is true and vice versa
        },
        series: {
          cursor: 'pointer',
          events: {
            click: function (e: any) {

              if (_isRouting) {
                this.utilityService.navigate(_routeUrl);
              } else {
                console.log(event);
                alert(
                  'Name: ' + this.name + '\n' +
                  'Category: ' + e.point.category + '\n' +
                  'value: ' + e.point.options.y
                );
              }


              // if (canViewReport) {
              //   router.navigate(['report'], { queryParams: { fromDashboard: 'y', dateFrom: dateFrom, dateTo: dateTo, type: _type, val: event.point.category } });
              // window.open('report?fromDashboard=y&dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&type=' + _type + '&val=' + event.point.category, '_self');
              //}
            }
          },
          marker: {
            lineWidth: 1
          }
        },
        column: {
          dataLabels: {
            enabled: _showDataLabel
          }
        }
      },
      // series: _series,
      series: [{
         data: _series// _data
       }],
      chart: {
        type: _chartType,
        height: _height,
        inverted: _chartInverted,
        polar: false,
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: _yAxisTitle
        },
        labels: {
          format: '{value}'
        },
        lineWidth: 2
      },
      xAxis: {
        categories: _categories,
        reversed: false,
        maxPadding: 0.05,
        showLastLabel: true,
        title: {
          text: _xAxisTitle
        }
      },
      // legend: {
      //   layout: 'vertical',
      //   align: 'right',
      //   verticalAlign: 'middle',        
      // },
    });
  }


  

  // getIncidentsLGASummary_PieChart() {
  //   let _data: any[] = [];

  //           res.data.forEach(dt => {
  //             let param = { name: dt.lga, y: parseInt(dt.total), drilldown: dt.lga };
  //             _data.push(param);
  //           });

  //         this.IncidentDistribution_chartOptions = this.setPieChart(_data, this.lgaSummar_drilldownSeries, this.dateFrom, this.dateTo, this.canViewReport, this.router, this.displaySelectedLGA); //load the 
  // }

  setPieChart(_data: any[], _drilldownSeries: any[], _title: string, _subTitle: string, _name: string, _isRouting = false, _routeUrl = '') {
    return {
      title: {
        align: "left",
        text: _title
      },
      subtitle: {
        align: "left",
        style: { "font-size": "0.75em" },
        text: _subTitle
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
            //format: "{point.name}: {point.y:.1f}%"
          },
          showInLegend: true
        },
        legend: {
          layout: "vertical",
          borderWidth: 0,
          floating: true,
          align: "left",
          verticalAlign: "middle",
          labelFormat: "{name}: {y:.2f}%"
        },
        series: {
          cursor: 'pointer',
          events: {
            click: function (event) {
              console.log(event);

              if (_isRouting) {
                this.utilityService.navigate(_routeUrl);
              } else {

                alert('Category: ' + event.point.options.name + ', value: ' + event.point.options.y);
                // if (canViewReport) {
                //   router.navigate(['report'], { queryParams: { fromDashboard: 'y', dateFrom: dateFrom, dateTo: dateTo, type: 'lga', val: event.point.options.name } });
                // window.open('report?fromDashboard=y&dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&type=lga' + '&val=' + event.point.options.name, '_self');
                //  }
              }
            }
          }
        }
      },
      tooltip: {
        headerFormat: "<span>{series.name}</span><br />",
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br />'
      },
      chart: {
        type: "pie"
      },
      series: [{
        name: _name,
        colorByPoint: true,
        data: _data
      }],
      legend: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        layout: "vertical",
        borderWidth: 0,
        //floating: true,
        align: "left",
        verticalAlign: "middle",
        labelFormat: "{name}: {y:.2f}%"
      },
      // drilldown: {
      //   series: _drilldownSeries
      // series: [{
      //   name: "Akoko Edo",
      //   id: "Akoko Edo",
      //   data: [
      //     ["Protest", 2], ["Arson", 4], ["Kidnap", 5], ["Murder", 2], ["Missing Person", 5]
      //   ]
      // }, {
      //   name: "Egor",
      //   id: "Egor",
      //   data: [
      //     ["Protest", 2], ["Arson", 4], ["Kidnap", 5], ["Murder", 2], ["Missing Person", 5]
      //   ]
      // }, {
      //   name: "Esan West",
      //   id: "Esan West",
      //   data: [
      //     ["Protest", 2], ["Arson", 4], ["Kidnap", 5], ["Murder", 2], ["Missing Person", 5]
      //   ]
      // }, 
      // ]
      // }

    };
  }

}


export enum ChartTypes {
  column = 'column',
  bar = 'bar',
  pie = 'pie',
  line = 'line',
  spline = 'spline'
}