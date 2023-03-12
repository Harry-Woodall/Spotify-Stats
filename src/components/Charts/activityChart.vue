<script lang="ts" setup>
import { onMounted, onUpdated, ref } from "vue";
import { Chart, ChartData, ChartItem, ChartTypeRegistry, registerables } from "chart.js";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { xs } = useDisplay();

const props = defineProps({
  activityData: { type: Object },
});

let chart: Chart<keyof ChartTypeRegistry, { x: string; y: number }[], unknown>;
const mobileHeight = ref<string>("500px");
const fullDataSet = ref<Object>({});

const getTickLabel = (index: number) => {
  return Object.keys(fullDataSet.value)[index];
};

const formatTickLabel = (label: string) => {
  let items = label.split("-");
  return items[0] + "/" + items[1].substring(2);
};

onUpdated(() => {
  generateData();
});

onMounted(() => {
  const ctx = document.getElementById("activity-chart") as ChartItem;
  Chart.register(...registerables);

  const datasets: ChartData<"bar", { x: string; y: number }[]> = {
    datasets: [
      {
        data: [],
        backgroundColor: "#e33ce9",
        borderRadius: 3,
        parsing: {
          xAxisKey: xs.value ? "y" : "x",
          yAxisKey: xs.value ? "x" : "y",
        },
      },
      {
        data: [],
        backgroundColor: "#e33ce9",
        borderRadius: 3,
        parsing: {
          xAxisKey: xs.value ? "y" : "x",
          yAxisKey: xs.value ? "x" : "y",
        },
      },
    ],
  };

  chart = new Chart(ctx, {
    type: "bar",
    data: datasets,
    options: {
      hover: {
        mode: undefined,
      },
      indexAxis: xs.value ? "y" : "x",
      maintainAspectRatio: xs.value ? false : true,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        y: {
          display: xs.value,
          border: {
            display: false,
          },
          stacked: true,
          ticks: {
            color: "#bb86fc",
            font: {
              family: "roboto",
              size: 15,
            },
            callback: function (val, index) {
              if (xs.value) return index % 6 === 0 ? formatTickLabel(getTickLabel(index)) : "";
            },
          },
          grid: {
            drawTicks: false,
            display: false,
          },
        },
        x: {
          display: true,
          border: {
            display: false,
          },
          stacked: true,
          ticks: {
            color: "#bb86fc",
            font: {
              family: "roboto",
              size: 16,
            },
            callback: function (val, index) {
              if (!xs.value) {
                if (index % 6 === 0) {
                  return formatTickLabel(getTickLabel(index));
                }
              }
            },
          },
          grid: {
            drawTicks: false,
            display: false,
          },
        },
      },
    },
  });

  generateData();
});

const generateData = () => {
  let data = addMissingDates(props.activityData!);
  fullDataSet.value = data;

  mobileHeight.value = `${Object.keys(data).length * 20}px`;
  console.log(mobileHeight.value);

  if (data) {
    const values = Object.keys(data)?.map((key) => {
      return { x: key, y: data![key] as number };
    });

    values.forEach((value) => {
      chart.data.datasets[0].data.push(value);
    });

    if (!xs.value) {
      const reverseValues = Object.keys(data)?.map((key) => {
        return { x: key, y: (data![key] as number) * -1 };
      });

      reverseValues.forEach((value) => {
        chart.data.datasets[1].data.push(value);
      });
    }

    chart.update();
  }
};

const addMissingDates = (dateObject: { [key: string]: any }) => {
  let populatedActivityData: { [key: string]: any } = {};

  let previousDate: Date = new Date(0);
  for (let item of Object.keys(dateObject)) {
    let currentDateItems = item.split("-");
    let currentMonth = parseInt(currentDateItems[0]);
    let currentYear = parseInt(currentDateItems[1]);
    let currentDate = new Date(currentYear, currentMonth - 1);

    if (previousDate.getTime() == 0) {
      previousDate = currentDate;
      populatedActivityData[item] = dateObject[item];
      continue;
    }

    let monthDiff =
      currentDate.getMonth() - previousDate.getMonth() + 12 * (currentDate.getFullYear() - previousDate.getFullYear());

    for (let i = 0; i < monthDiff; i++) {
      let nextDate = new Date(previousDate.setMonth(previousDate.getMonth() + 1));
      populatedActivityData[`${nextDate.getMonth() + 1}-${nextDate.getFullYear()}`] = 0;
    }

    populatedActivityData[item] = dateObject[item];

    previousDate = currentDate;
  }

  return populatedActivityData;
};
</script>

<template>
  <v-sheet class="pa-5 mt-10" rounded color="rgba(0,0,0,0.5)" width="100%">
    <h2>Playlist activity</h2>
    <p class="text-subtitle-2 sub-heading mb-10">How often songs are added to this playlist</p>
    <div v-if="xs" class="activity-chart-container" :style="'height: ' + mobileHeight">
      <canvas id="activity-chart"></canvas>
    </div>
    <canvas v-else id="activity-chart"></canvas>
  </v-sheet>
</template>

<style scoped>
.sub-heading {
  color: rgba(255, 255, 255, 0.6);
}
</style>
