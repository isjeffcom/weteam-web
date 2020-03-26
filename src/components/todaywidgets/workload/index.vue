<template>
    <div id="workload" class="user-widget">
        <div class="user-widget-inner">
            <div class="user-widget-title">
                <span>WORKLOAD</span>
            </div>
            <apexchart width="100%" type="heatmap" :options="chartOptions" :series="series"></apexchart>
        </div>
        
    </div>
</template>


<script>

export default {
    name: "workload",
    props:{
        chartData:{
            type: Array,
            default(){
                return [
                    {
                        name: 'series-1',
                        data: [30, 40, 35, 50, 49, 60, 70, 91]
                    }
                ]
            } 
        }
    },

    data(){
        return{
            series: [{
            name: 'Metric1',
            data: this.generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric2',
            data: this.generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric3',
            data: this.generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric4',
            data: this.generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric5',
            data: this.generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric6',
            data: this.generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric7',
            data: this.generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric8',
            data: this.generateData(18, {
              min: 0,
              max: 90
            })
          },
          {
            name: 'Metric9',
            data: this.generateData(18, {
              min: 0,
              max: 90
            })
          }
          ],
          chartOptions: {
            chart: {
              height: 350,
              type: 'heatmap',
            },
            xaxis: {
                labels: {
                    show: false
                },
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
            },
            yaxis: {
                labels: {
                    show: false
                },
            },
            dataLabels: {
              enabled: false
            },
            colors: ["#008FFB"],
          },
        }
    },
    methods:{
        generateData(count, yrange) {
            var i = 0
            var series = []
            while (i < count) {
                var x = (i + 1).toString();
                var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
                series.push({
                    x: x,
                    y: y
                })
                i++
            }
            return series
        }
    }
}
</script>