<template>
  <div class="wrap">
    <q-card class="my-card text-black">
      <q-card-section>
        <div class="text-h6">Cumulative log returns</div>
        <Line
          v-if="chartDatas.datasets"
          id="my-chart-id"
          :options="chartOptions"
          :data="chartDatas"
          :height="400"
          :width="700"
        />
      </q-card-section>
    </q-card>
    <q-card class="text-black tableau">
      <div class="text-h6">Metrics</div>
      <q-table :rows="metrics" :columns="columns" row-key="name" :rows-per-page-options="[0]" />
    </q-card>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { postData } from '../utils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
  name: 'ResultView',
  components: { Line },
  setup() {
    const route = useRoute();
    const chartDatas = ref([]);
    const metrics = ref([]);

    const chartOptions = {
      responsive: false,
      maintainAspectRatio: true,
      elements: {
        point: {
          radius: 0,
        },
      },
    };

    const colorsArray = [
      'rgba(109, 158, 143, 0.5)',
      'rgba(178, 195, 26, 0.5)',
      'rgba(58, 166, 7, 0.5)',
      'rgba(209, 110, 88, 0.5)',
      'rgba(1, 100, 242, 0.5)',
      'rgba(18, 111, 110, 0.5)',
      'rgba(255, 10, 13, 0.5)',
    ];

    const fetchChart = async () => {
      const res = await postData('http://127.0.0.1:5000/get_results_chart', {
        dataset_name: route.params.dataset,
        model_name: route.params.modelname,
      });
      chartDatas.value = {
        datasets: res,
      };
      // colorsArray = colorsArray.sort((a, b) => 0.5 - Math.random());
      chartDatas.value.datasets.forEach((el, i) => {
        const randomColor = colorsArray[i];
        // eslint-disable-next-line no-param-reassign
        el.backgroundColor = randomColor;
        el.borderColor = randomColor;
      });
    };

    const fetchMetrics = async () => {
      const response = await postData('http://127.0.0.1:5000/get_results_metrics', {
        dataset_name: route.params.dataset,
        model_name: route.params.modelname,
      });
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(response)) {
        metrics.value.push({
          name: key,
          expected_return: value.expected_return,
          volatility: value.volatility,
          sharpe_ratio: value.sharpe_ratio,
        });
      }
      console.log(metrics.value);
    };

    const columns = [
      {
        name: 'Model name',
        align: 'center',
        label: 'Model name',
        field: (row) => row.name.toUpperCase(),
        sortable: true,
      },
      {
        name: 'Returns',
        align: 'center',
        label: 'Expected Returns',
        field: 'expected_return',
        sortable: true,
      },
      {
        name: 'volatility',
        align: 'center',
        label: 'Volatility',
        field: 'volatility',
        sortable: true,
      },
      {
        name: 'sharpe ratio',
        align: 'center',
        label: 'Sharpe ratio',
        field: 'sharpe_ratio',
        sortable: true,
      },
    ];

    onMounted(() => {
      fetchChart();
      fetchMetrics();
    });

    return {
      chartDatas,
      metrics,
      columns,
      chartOptions,
    };
  },
};
</script>

<style>
.wrap {
  height: 400px;
}
.my-card {
  margin-bottom: 20px;
}

.tableau {
  margin-bottom: 20px;
}
</style>
