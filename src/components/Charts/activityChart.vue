<script lang="ts" setup>
import { onMounted, onUpdated, PropType, ref } from "vue";
import { Chart, ChartData, ChartItem, ChartTypeRegistry, registerables } from "chart.js";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { Activity } from "@/interfaces/playlistCardInterfaces";

const { xs, name } = useDisplay();
let previousSize = name.value;

const props = defineProps({
  activityData: Array as PropType<Activity[]>,
});

let chart: Chart<keyof ChartTypeRegistry, { x: string; y: [number, number] }[], unknown>;
const mobileHeight = ref<string>("500px");
const fullDataSet = ref<Activity[]>([]);

const getTickLabel = (index: number) => {
  return fullDataSet.value[index].date;
};

const getTickValue = (index: number) => {
  return fullDataSet.value[index].frequency;
};

const formatTickLabel = (label: string) => {
  let items = label.split("-");
  return items[0] + "/" + items[1].substring(2);
};

onUpdated(() => {
  buildChart();
});

onMounted(() => {
  buildChart();
});

const onResize = () => {
  if ((name.value == "xs" && previousSize != "xs") || (previousSize == "xs" && name.value != "xs")) buildChart();

  previousSize = name.value;
};

const buildChart = () => {
  const ctx = document.getElementById("activity-chart") as ChartItem;
  Chart.register(...registerables);
  let percentage = 0.9;

  const datasets: ChartData<"bar", { x: string; y: [number, number] }[]> = {
    datasets: [
      {
        categoryPercentage: percentage,
        barPercentage: percentage,
        data: [],
        backgroundColor: "#e33ce9",
        borderRadius: 3,
        borderSkipped: false,
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
          enabled: true,
          callbacks: {
            label: function (toolTipItem) {
              return getTickValue(toolTipItem.dataIndex).toString();
            },
          },
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
            color: "#ffffff",
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
            color: "#ffffff",
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
};

const generateData = () => {
  let data = addMissingDates(props.activityData!);
  fullDataSet.value = data;
  mobileHeight.value = `${data.length * 15}px`;

  type dataItem = {
    x: string;
    y: [number, number];
  };

  if (data) {
    const values: dataItem[] = data.map((item) => {
      return { x: item.date, y: [xs.value ? 0 : -item.frequency, item.frequency] };
    });

    values.forEach((value: dataItem) => {
      chart.data.datasets[0].data.push(value);
    });

    chart.update();
  }
};

const addMissingDates = (dates: Activity[]) => {
  let populatedActivityData: Activity[] = [];

  let previousDate: Date = new Date(0);
  for (let item of dates) {
    let currentDateItems = item.date.split("-");
    let currentMonth = parseInt(currentDateItems[0]);
    let currentYear = parseInt(currentDateItems[1]);
    let currentDate = new Date(currentYear, currentMonth - 1);

    if (previousDate.getTime() == 0) {
      populatedActivityData.push(item);
      previousDate = currentDate;
      continue;
    }

    let monthDiff =
      currentDate.getMonth() - previousDate.getMonth() + 12 * (currentDate.getFullYear() - previousDate.getFullYear());

    for (let i = 0; i < monthDiff - 1; i++) {
      let nextDate = new Date(previousDate.setMonth(previousDate.getMonth() + 1));
      populatedActivityData.push({ date: `${nextDate.getMonth() + 1}-${nextDate.getFullYear()}`, frequency: 0 });
    }

    populatedActivityData.push(item);

    previousDate = currentDate;
  }

  return populatedActivityData;
};
</script>

<template>
  <v-sheet class="pa-5 chart-container" rounded color="rgba(0,0,0,0.5)" width="100%">
    <h2 :class="xs ? '' : 'text-h3 ml-3 font-weight-light'">Playlist activity</h2>
    <p :class="xs ? 'text-subtitle-2 sub-heading mb-10 ml-2' : 'text-subtitle-2 sub-heading mb-10 mt-2 ml-5'">
      How often songs are added to this playlist
    </p>
    <div v-if="xs" v-resize="onResize" class="activity-chart-container" :style="'height: ' + mobileHeight">
      <canvas id="activity-chart"></canvas>
    </div>
    <canvas v-else v-resize="onResize" id="activity-chart"></canvas>
  </v-sheet>
</template>

<style scoped>
.chart-container {
  max-width: 1500px;
}
.sub-heading {
  color: rgba(255, 255, 255, 0.6);
}
</style>
