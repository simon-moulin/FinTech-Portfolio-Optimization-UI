<template>
  <q-card class="my-card text-black" style="width: 40%">
    <q-card-section>
      <div class="text-h6">Create a new dataset</div>
      <br />
      <div>
        <q-input v-model="assetNameInput" label="Asset name" @keyup.enter="addAsset">
          <template v-slot:after> <q-btn @click="addAsset" round dense flat icon="add" /> </template
        ></q-input>
      </div>
    </q-card-section>

    <q-card-section>
      <div class="q-pa-md">
        <q-list
          v-if="assetsList.length > 0"
          dense
          bordered
          padding
          separator
          class="rounded-borders"
        >
          <q-item v-for="asset in assetsList" v-bind:key="asset">
            <q-item-section> {{ asset }}</q-item-section>
            <q-item-section side
              ><q-btn @click="deleteAsset(asset)" flat round icon="delete"
            /></q-item-section>
          </q-item>
        </q-list>
        <q-list v-else dense bordered padding separator class="rounded-borders">
          <q-item><q-item-section>No assets</q-item-section></q-item>
        </q-list>
      </div>
    </q-card-section>
    <q-card-section>
      <q-input v-model="enteredStartDate" type="date" label="Start Date" />
      <br />
      <q-input v-model="enteredEndDate" type="date" label="End Date" />
    </q-card-section>

    <q-card-section>
      <q-btn color="primary" label="Create Dataset" :loading="loading" @click="createDataset" />
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { postData } from '../utils';

export default {
  name: 'DatasetLoader',
  components: {},
  setup() {
    localStorage.removeItem('selectedDataset');
    const assetNameInput = ref('');
    const assetsList = ref([]);
    const enteredStartDate = ref(new Date());
    const enteredEndDate = ref(new Date());
    const loading = ref(false);
    const router = useRouter();

    const addAsset = () => {
      if (assetNameInput.value !== '') {
        assetsList.value.push(assetNameInput.value);
        assetNameInput.value = '';
      }
    };

    const deleteAsset = (assetName) => {
      assetsList.value.splice(assetsList.value.indexOf(assetName), 1);
    };

    const createDataset = async () => {
      const tickers = assetsList.value.join(' ');
      const startDate = new Date(enteredStartDate.value).toLocaleDateString('fr-CA');
      const endDate = new Date(enteredEndDate.value).toLocaleDateString('fr-CA');
      loading.value = true;
      const res = await postData('http://127.0.0.1:5000/create_dataset', {
        tickers,
        end_date: endDate,
        start_date: startDate,
      });
      localStorage.setItem('selectedDataset', res.name);
      router.push({ name: 'create-model' });
    };

    return {
      createDataset,
      assetsList,
      deleteAsset,
      addAsset,
      assetNameInput,
      enteredStartDate,
      enteredEndDate,
      loading,
    };
  },
};
</script>

<style></style>
