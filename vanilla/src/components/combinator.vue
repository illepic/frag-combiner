<template>
  <div class="combiner">
    <div class="combiner__select row justify-content-center">
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
    <div class="combiner__products row justify-content-center no-gutters mt-3">
      <div class="fragrance-slot col-auto ">
        <fragrance-product
          :product="chosenFrag"
        />
      </div>
      <div class="fragrance-slot col-auto">
        <fragrance-product
          :product="companionFrag"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import { fallbackFrag } from '../parse';

  import FragranceProduct from './product.vue';

  export default {
    name: "Combinator",
    components: {
      FragranceProduct,
    },
    props: {
      chosenId: {
        type: String,
        default() {
          return null;
        }
      },
      fragrances: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        companion: 'warmer',
      };
    },
    computed: {
      chosenFrag() {
        return this.fragrances.length
          ? this.fragrances.find(({ id }) => id === this.chosenId)
          : fallbackFrag;
      },
      companionFrag() {
        return this.chosenFrag
          ? this.fragrances.find(
            ({ id }) => this.chosenFrag.companion[this.companion] === id
        ) : fallbackFrag;
      },

    },
    watch: {
      chosenId() {
        this.companion = 'warmer';
      },
    }
  }
</script>

<style lang="scss" scoped>

</style>