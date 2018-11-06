<template>
  <div class="fragrance-combiner">

    <div class="row">
      <h2 class="col text-center mb-5">Step 1. Choose your favorite fragrance</h2>
    </div>

    <spectrum
      :starters="starters"
      :categories="categories"
      :chosenId="chosenId"
      @choose="chosenId = $event"
    />

    <div class="row">
      <h2 class="col text-center my-3">Step 2. Choose your combination</h2>
    </div>

    <combinator
      :fragrances="fragrances"
      :chosen-id="chosenId"
    />

  </div>
</template>

<script>
import { fragrances, categories } from './parse';

import Spectrum from './components/spectrum.vue';
import Combinator from './components/combinator.vue';

export default {
  name: 'VueFragranceCombining',
  components: {
    Spectrum,
    Combinator,
  },
  data() {
    return {
      fragrances,
      categories,
      chosenId: null,
    };
  },
  computed: {
    starters() {
      return this.fragrances.filter(({ isStarter }) => isStarter);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
