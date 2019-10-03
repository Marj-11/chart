<template>
  <div>
    <canvas id="chart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

import { mapGetters } from "vuex";
export default {
  data() {
    return {
      labels: [],
      clicks: [],
      impressions: []
    };
  },
  methods: {
    getData() {
      const data = this.$store.getters.getData;
      if (data === undefined) {
        alert("Please select a CSV file!");
      } else {
        data.forEach(el => {
          this.labels.push(el[0]);
          this.clicks.push(el[3]);
          this.impressions.push(el[4]);
        });
      }
    },
    eraseData() {
      this.labels = [];
      this.clicks = [];
      this.impressions = [];
    },
    createChart(chartId, chartData) {
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: "line",
        data: chartData.data,
        options: chartData.options
      });
    },
    chart() {
      const data = {
        data: {
          datasets: [
            {
              data: this.clicks,
              label: "Clicks",
              fill: false,
              yAxisID: "left-y-axis",
              borderColor: "#1E88E5",
              backgroundColor: "#1E88E5",
              borderWidth: 1
            },
            {
              data: this.impressions,
              label: "Impressions",
              fill: false,
              yAxisID: "right-y-axis",
              borderColor: "yellowgreen",
              backgroundColor: "yellowgreen",
              borderAlign: "center",
              borderWidth: 1
            }
          ],
          labels: this.labels
        },
        options: {
          legend: {
            position: "bottom"
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Clicks"
                },
                id: "left-y-axis",
                type: "linear",
                position: "left",
                ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                    if (value < 100000) {
                      return value;
                    } else {
                      return value / 1000 + "k";
                    }
                  }
                }
              },
              {
                id: "right-y-axis",
                type: "linear",
                position: "right",
                scaleLabel: {
                  display: true,
                  labelString: "Impressions"
                },
                ticks: {
                  beginAtZero: true,
                  callback: function(value, index, values) {
                    if (value < 100000) {
                      return value;
                    } else {
                      return value / 1000 + "k";
                    }
                  }
                }
              }
            ]
          }
        }
      };
      this.createChart("chart", data);
    }
  },

  computed: {
    ...mapGetters(["chips"])
  },
  watch: {
    chips() {
      if (this.chips === true) {
        this.getData();
      } else {
        this.eraseData();
      }
    },
    clicks() {
      this.chart();
    }
  },
  mounted() {
    this.eraseData();
  }
};
</script>

<style scoped>
#chart{
  margin-top: 70px;
}
</style>



