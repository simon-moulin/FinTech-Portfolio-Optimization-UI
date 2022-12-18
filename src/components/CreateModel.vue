<template>
  <q-card class="my-card text-black" style="width: 40%">
    <q-card-section>
      <div class="text-h6">Create a new model</div>
      <br />
      <q-input v-model="modelName" label="Model name"></q-input>
      <q-select v-model="selectedDataset" :options="options" label="Dataset" />
      <!-- <q-select v-model="selectedModel" :options="modelTypes" label="Model Type" /> -->
    </q-card-section>

    <q-card-section>
      Training parameters
      <div class="q-pa-md">
        <q-badge color="primary"> Batchsize: {{ batchsize }} (0 to 512) </q-badge>
        <q-slider v-model="batchsize" :min="0" :max="512" :step="64" />

        <q-badge color="secondary"> Timestep: {{ timestep }} (0 to 100) </q-badge>
        <q-slider v-model="timestep" :min="0" :max="100" :step="10" />
      </div>
    </q-card-section>

    <q-card-section>
      <q-btn color="primary" @click="goToCreateDataset" label="Add Dataset" />
      <q-btn color="primary" @click="launchTraining" :loading="loading" label="Train this model" />
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { postData } from '../utils';

export default {
  name: 'CreateModel',
  components: {},
  setup() {
    const router = useRouter();

    const selectedDataset = ref('');
    const selectedModel = ref('');
    const batchsize = ref(64);
    const timestep = ref(30);
    const modelName = ref('');
    const loading = ref(false);

    if (localStorage.getItem('selectedDataset')) {
      selectedDataset.value = localStorage.getItem('selectedDataset');
    }

    // const modelTypes = ref(['GRU', 'LSTM', 'RNN']);

    const goToCreateDataset = () => {
      router.push({ name: 'create-dataset' });
    };

    const options = ref([]);
    const fetchDatasets = () => {
      postData('http://127.0.0.1:5000/get_datasets').then((response) => {
        options.value = response.datas;
      });
    };

    const launchTraining = async () => {
      loading.value = true;
      await postData('http://127.0.0.1:5000/train', {
        dataset: selectedDataset.value,
        name: modelName.value,
        timestep: timestep.value,
        batch_size: batchsize.value,
      });
      localStorage.setItem('timestep', timestep.value);
      localStorage.setItem('dataset', selectedDataset.value);
      localStorage.setItem('name', modelName.value);
      localStorage.setItem('batch_size', batchsize.value);

      router.push({ name: 'training' });
    };

    onBeforeMount(() => {
      fetchDatasets();
    });

    return {
      goToCreateDataset,
      launchTraining,
      selectedDataset,
      options,
      selectedModel,
      // modelTypes,
      loading,
      batchsize,
      timestep,
      modelName,
    };
  },
};
</script>

<style></style>
