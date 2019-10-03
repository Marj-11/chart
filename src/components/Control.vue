<template>
  <v-card >
    <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-card-text>Filter dimension values</v-card-text>
        <p class="ml-4" v-on="on">
          Choose Data source
          <i id="dropdown" class="ml-1 fas fa-sort-down"></i>
        </p>
      </template>
      <v-list>
        <v-list-item
          id="hoverElements"
          v-for="(item, index) in items"
          :key="index"
          @click="fireChips(index)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-chip
      v-if="FBChip"
      class="ma-2"
      close
      color="#CFD8DC"
      text-color="black"
      @click:close="closeChips(0)"
    >Facebook</v-chip>
    <v-chip
      v-if="GooGAdChip"
      class="ma-2"
      close
      color="#CFD8DC"
      text-color="black"
      @click:close="closeChips(1)"
    >Google Adwords</v-chip>
    <v-chip
      v-if="MChip"
      class="text--black ma-2"
      close
      color="#CFD8DC"
      text-color="black"
      @click:close="closeChips(2)"
    >Mailchimp</v-chip>
    <v-chip
      v-if="GoogANAChip"
      class="text--black ma-2"
      close
      color="#CFD8DC"
      text-color="black"
      @click:close="closeChips(3)"
    >Google Analytics</v-chip>
    <v-row justify="space-around">
      <v-card-actions class="mt-12">
        <v-btn @click="closeChips(4)" class="white--text" small color="black">Reset</v-btn>
      </v-card-actions>
      <v-card-actions class="mt-12">
        <input type="file" ref="fileInput" @change="loadTextFromFile" style="display: none" />
        <v-btn small class="white--text" color="#43A047" @click="onPickFile">CSV</v-btn>
      </v-card-actions>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      mainData: [],
      lodash: [],

      items: [
        { title: "Facebook" },
        { title: "Google Adwords" },
        { title: "Mailchimp" },
        { title: "Google Analytics" }
      ]
    };
  },

  methods: {
    fireChips(i) {
      this.$store.dispatch("fireChips", i);
    },
    closeChips(i) {
      this.$store.dispatch("closeChips", i);
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    loadTextFromFile(load) {
      setTimeout(() => {
        this.g();
      }, 1000);
      let arr = [];
      const file = load.target.files[0];
      const reader = new FileReader();
      reader.onload = e =>
        arr.push(
          e.target.result
            .split("\n")
            .slice(1)
            .map(line => line.split(","))
        );
      reader.readAsText(file);
      return (this.mainData = arr);
    },
    g() {
      const data = this.mainData;
      let grouped = _.groupBy(data[0], lineData => {
        return lineData[1];
      });
      this.$store.dispatch("receiveData", grouped);
    }
  },
  computed: {
    FBChip() {
      return this.$store.state.chip1;
    },
    GooGAdChip() {
      return this.$store.state.chip2;
    },
    MChip() {
      return this.$store.state.chip3;
    },
    GoogANAChip() {
      return this.$store.state.chip4;
    },
    getUniq() {
      return this.$store.getters.getUniq;
    }
  }
};
</script>
<style scoped>
#dropdown:hover {
  cursor: pointer;
}
#hoverElements:hover {
  background-color: greenyellow;
}
</style>