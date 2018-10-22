<template>
  <div class="fragrance-combiner">

    <div class="row">
      <h2 class="col text-center mb-5">Step 1. Choose your favorite fragrance</h2>
    </div>

    <spectrum
      :spectrum="spectrum"
      :chosenId="chosenId"
      @choose="chosenId = $event"
    />

    <div class="combiner">
      <h2 class="text-center my-3">Step 2. Choose your combination</h2>
      <div class="row justify-content-center">
        <form>
          <div class="form-row align-items-center">
            <div class="col-auto">Make it</div>
            <div class="col-auto">
              <label
                class="mr-sm-2 sr-only"
                for="companionSelect"
              >Select companion fragrance</label>
              <select
                id="companionSelect"
                v-model="companion"
                class="custom-select mr-2"
              >
                <option
                  selected
                  value="warmer"
                >Warmer</option>
                <option value="fresher">Fresher</option>
              </select>
            </div>
          </div>
        </form>
      </div>
      <div class="row justify-content-center no-gutters mt-3">
        <div class="fragrance-slot col-auto ">
          <fragrance-product
            :product="chosenFrag"
          />
        </div>
        <div class="fragrance-slit col-auto">
          <fragrance-product
            :product="companionFrag"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { fragrances, categories } from './parse';

import FragranceProduct from './components/product.vue';
import Spectrum from './components/spectrum.vue';

export default {
  name: 'VueFragranceCombining',
  components: {
    FragranceProduct,
    Spectrum,
  },
  data() {
    return {
      fragrances,
      categories,
      companion: null,
      chosenId: null,
    };
  },
  computed: {
    starters() {
      return this.fragrances.filter(({ isStarter }) => isStarter);
    },
    spectrum() {
      return (
        this.categories
          // For each category, generate object with category and frags
          .map(category => ({
            category,
            fragrances: this.starters
              .filter(({ cat: fragCategory }) => category === fragCategory)
              // Sort order of frags within cat
              .sort(({ pizazz: a }, { pizazz: b }) => a - b),
          }))
          // Only show categories which have fragrances
          .filter(category => !!category.fragrances.length)
      );
    },
    chosenFrag() {
      return this.starters.find(({ id }) => id === this.chosenId);
    },
    companionFrag() {
      return this.fragrances.find(
        ({ id }) => this.chosenFrag.companion[this.companion] === id
      );
    },
  },
  watch: {
    // Always reset companion to warmer when choosing new ID
    chosenId() {
      this.companion = 'warmer';
    },
  },
  created() {
    this.chosenId = this.spectrum[0].fragrances[0].id;
  },
};
</script>

<style lang="scss" scoped>
</style>
