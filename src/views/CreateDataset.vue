<template>
    <DatasetLoader></DatasetLoader>
</template>

<script>
import DatasetLoader from '@/components/DatasetLoader.vue';

export default {
  name: 'CreateDatasetView',
  components: { DatasetLoader },
};
</script>

<style>
.main {
  display: flex;
  align-items: center;
  height: 85vh;
  justify-content: center;
}
</style>
