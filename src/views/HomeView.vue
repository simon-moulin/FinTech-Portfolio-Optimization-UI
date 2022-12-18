<template>
  <div class="main">
    <q-btn color="primary" @click="card = true" id="btn1" class="home_button">
      <p>Load a Model</p>
    </q-btn>
    <q-btn color="primary" @click="goToCreate" id="btn2" class="home_button">
      <p>Create new Model</p>
    </q-btn>
  </div>

  <q-dialog v-model="card">
    <q-card class="my-card text-black" style="width: 40%">
      <q-card-section>
        <div class="text-h6">Select a model to load</div>
        <br />
        <q-select v-model="selectedDataset" :options="datasets" label="Dataset" />
        <q-select
          v-model="selectedModel"
          :options="models"
          :disable="selectedDataset.length <= 0"
          label="Model name"
        />
      </q-card-section>
      <q-card-section right>
        <q-btn color="primary" @click="goToResults" label="Show results" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
import { postData } from '../utils';

export default {
  name: 'HomeView',
  setup() {
    const datasets = ref([]);
    const models = ref([]);
    const selectedDataset = ref('');
    const selectedModel = ref('');

    const fetchModels = () => {
      const url = 'http://127.0.0.1:5000/get_names';
      postData(url, { dataset_name: selectedDataset.value }).then((response) => {
        models.value = response;
      });
    };

    watch(selectedDataset, (val, prevVal) => {
      fetchModels();
    });

    const fetchDatasets = () => {
      postData('http://127.0.0.1:5000/get_datasets').then((response) => {
        datasets.value = response.datas;
      });
    };

    onMounted(() => {
      fetchDatasets();
    });

    const router = useRouter();
    const card = ref(false);

    const goToCreate = () => {
      router.push({ name: 'create-model' });
    };

    const goToResults = () => {
      router.push({
        name: 'results',
        params: {
          dataset: selectedDataset.value.replace('.csv', ''),
          modelname: selectedModel.value,
        },
      });
    };

    return {
      selectedDataset,
      selectedModel,
      models,
      datasets,
      fetchModels,
      goToCreate,
      goToResults,
      card,
    };
  },
};
</script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  height: 85vh;
  justify-content: center;
}
.home_button {
  /*border-radius: 10px; */
  border: 0px;
  font-size: 24px;
  font-weight: bold;
  margin: 100px;
  color: white;
  width: 250px;
  height: 250px;
}
</style>
