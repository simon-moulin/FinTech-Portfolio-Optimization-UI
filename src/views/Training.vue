<template>
  <q-card class="my-card text-black" style="width: 40%">
    <q-card-section>
      <div class="text-h6">Training output</div>
      <br />
      <ul class="output">
        <li v-for="(i, item) in outputs" v-bind:key="i">
          {{ i }}
        </li>
      </ul>
    </q-card-section>

    <q-card-section>
      <q-btn color="primary" disabled label="Show results" />
    </q-card-section>
  </q-card>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'TrainingView',
  components: {},
  setup() {
    const real_outputs = [
      '[DEBUG] Training and testing with the device: cpu',
      `[DEBUG] Training model: ${localStorage.getItem('name')}`,
      '[DEBUG] [+] Creating LSTM model',
      '[DEBUG] [+] Setting sgd optimizer',
      '[DEBUG] [+] Training model...',
    ];
    const outputs = ref(['']);
    let i = 0;
    setInterval(() => {
      outputs.value.push(`${new Date(Date.now()).toLocaleTimeString()} ${real_outputs[i]}`);
      i += 1;
    }, Math.floor(Math.random() * 5000));

    return {
      outputs,
    };
  },
};
</script>

<style>
.output {
  width: 100%;
  text-align: left;
  border: 1px solid white;
  color: white;
  background-color: black;
}

ul {
  height: 200px;
  list-style: none;
}
</style>
