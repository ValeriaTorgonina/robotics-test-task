// @ts-ignore
import ApexCharts, { ApexOptions } from 'apexcharts';

const options = {
  legend: {
    //show: false,
    show: true
  },
  grid: {
    show: false
  },
  chart: {
    events: {
      click(e, chart, options) {
        console.log('all',[...e, chart, options])
      },
      legendClick(chart, seriesIndex, options) {
        console.log('legend', [...chart, seriesIndex, options])
      },
      markerClick(e, chart, options) {
        console.log('marker', [...e, chart, options])
      }
    },
    type: 'line',
    height: 400,
    toolbar: {show: false},
    stacked: false

  },

  dataLabels: {
    enabled: true,
    textAnchor: 'end',
    enabledOnSeries: true,
    style: {fontSize: '20px'},
  },


  stroke: {
    curve: 'smooth',
    lineCap: 'round',
    dashArray: 5,
    width: 2

  },
  series: [{
    name: '',
    data: [0, 5, 5.5, 5, 4, 8, 8, 9, 10, 10, 10, 15, 15, 20],
  }],
  tooltip: {
    enabled: false
  },


  annotations: {

    points: [{label: {text: '123'}, seriesIndex: 2}]
  },
  states: {

  },
  plotOptions: {},
  subtitle: {
    // style: {fontSize: '0', color: ''}
  },
  markers: {
    size: 6,
  },
  xaxis: {
    categories: [],
    labels: {show: false},

    tooltip: {enabled: true},
    axisBorder: {show: false},
  },
  yaxis: {
    labels: {show: false},
    axisBorder: {show: false},
    tooltip: {enabled: true}
  },
};

var chart = new ApexCharts(document.querySelector('.svg'), options);

chart.render();
