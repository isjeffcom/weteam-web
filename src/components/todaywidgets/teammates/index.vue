<template>
    <div id="teammates" class="user-widget">
        <div class="user-widget-inner">
            <div class="user-widget-title">
                <span>TEAMMATES</span>
            </div>
            <apexchart width="100%" type="bar" :options="chartOptions" :series="chartData"></apexchart>
        </div>
         
    </div>
</template>




<script>
export default {
    name: "teammates",
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
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                xaxis: {
                    labels: {
                        show: false
                    },
                    categories: ["name", "name", "name", "name", "name", "name", "name", "name"]
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
}
</script>


<style scoped>

</style>