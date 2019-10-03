<template>
  <v-app id="app">
    <v-row id="row" align="center">
      <v-col id="controlCol" sm="8" md="2">
        <Control />
      </v-col>
      <v-col id="chartCol" sm="8" md="8">
        <Chart />
      </v-col>
    </v-row>
    <!-- <v-row>
        <v-col>
          <Sparkline></Sparkline>
        </v-col>
    </v-row>-->
  </v-app>
</template>

<script>
import Chart from "./components/Chart";
import Control from "./components/Control";
import Sparkline from "./components/Sparkline";

export default {
  name: "App",
  components: {
    Chart,
    Control,
    Sparkline
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style>
#app {
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background: linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 30, 0.7)),
    url("https://images.pexels.com/photos/241544/pexels-photo-241544.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260");
}

#rainbow {
  width: 30%;
  margin: auto;
}
#controlCol {
  height: 200px;
  width: 10px;
  margin-left: 80px;
}
#chartCol {
  margin-left: 100px;
  background-color: #fff;
  border-radius: 5px;
  height: 100%;
}
</style>