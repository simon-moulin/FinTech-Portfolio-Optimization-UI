<template>
    <CreateModel></CreateModel>
</template>

<script>
import CreateModel from '@/components/CreateModel.vue';

export default {
  name: 'CreateModelView',
  components: { CreateModel },
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
