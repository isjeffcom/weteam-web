<template>
    <div id="thisweek" class="user-widget">
        <div class="user-widget-inner">
            <div class="user-widget-title">
                <span>THIS WEEK</span>
            </div>
            <apexchart width="100%" type="area" :options="chartOptions" :series="chartData"></apexchart>
        </div>
    </div>
</template>


<script>

export default {
    name: "thisweek",
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
            chartOptions: {
                chart: {
                    id: 'thisweek',
                    zoom: {
                        enabled: false
                    }
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
                tooltip:{
                    enabled: false
                },
                dataLabels:{
                    enabled: false
                }
            },
        }
    },
    components:{

    }
}
</script>