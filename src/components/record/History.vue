<template lang="pug">
  #history
    v-headBar(title="历史用电")
    .chart(v-if="chart")
      vue-chart(:type="chart.type", :data="chart.data", :options="chart.options")
</template>

<script>
import HeadBar from '@/components/common/HeadBar'
import FootBar from '@/components/common/FootBar'
import Spliter from '@/components/common/Spliter'
import { Toast } from 'mint-ui'
import { OK_STATUS } from '@/config'
import VueChart from 'vue-chart'

export default {
  name: 'history',
  components: {
    'v-headBar': HeadBar,
    'v-footBar': FootBar,
    'v-spliter': Spliter,
    VueChart
  },
  created () {
    let account = this.$store.state.account
    this.account = account
    this.loadHistoryData()
  },
  data () {
    return {
      account: {},
      chart: null
    }
  },
  methods: {
    loadHistoryData () {
      this.$http.post('/mobile/user/history_ele.html', {
      }, {
        timeout: 5000,
        emulateJSON: true
      }).then((response) => {
        response = response.body
        let status = response.status
        if (status === OK_STATUS) {
          this.loadChartData(response.data.dates, response.data.nums)
        }
      }, (response) => {
        Toast({
          message: '请求超时',
          position: 'bottom',
          duration: 1500
        })
      })
    },
    loadChartData (labels, values) {
      this.chart = {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: '历史用电',
            backgroundColor: '#81AD62',
            borderColor: '#81AD62',
            fill: false,
            steppedLine: false,
            // pointBackgroundColor: '#C60808',
            // pointRadius: [
            //   6, 6, 6, 6, 6, 10
            // ],
            // pointHoverRadius: [
            //   6, 6, 6, 6, 6, 10
            // ],
            data: values
          }]
        },
        options: {
          responsive: true,
          scales: {
            scales: {
              yAxes: [{
                stacked: false
              }]
            }
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #history
    margin-top: 3.5rem;
    .chart
      padding: 1rem;
      @media screen and (min-width: 50rem)
        max-width: 50rem;
        margin-left: calc((100% - 52rem) / 2);
</style>
