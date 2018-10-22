<template>
<div class="spectrum row no-gutters">
  <div
    v-for="category in spectrum"
    :key="category.category"
    class="spectrum-category col text-center text-uppercase"
  >
    <div class="spectrum-category__images d-flex">
      <div
        v-for="fragrance in category.fragrances"
        :key="fragrance.id"
        :style="{backgroundImage: `url(${fragrance.img.spectrum})`}"
        class="spectrum-category__image h-100"
        :class="{highlighted: fragrance.id === highlightedId, chosen: fragrance.id === chosenId}"
        @mouseover="highlight(fragrance.id, category.category)"
        @click="$emit('choose', fragrance.id)"
      />
    </div>

    <div
      class="spectrum-category__category border border-secondary"
      :class="{'highlighted-category': category.category === highlightedCat}"
      @mouseover="highlight(category.fragrances[0].id, category.category)"
    >
      {{ category.category }}
    </div>

    <ul class="spectrum-category__text list-unstyled small">
      <li
        v-for="fragrance in category.fragrances"
        :key="fragrance.id"
        :class="{highlighted: fragrance.id === highlightedId, chosen: fragrance.id === chosenId}"
        @mouseover="highlight(fragrance.id, category.category)"
        @click="$emit('choose', fragrance.id)"
      >
        {{ fragrance.names.short }}
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  name: 'Spectrum',
  props: {
    spectrum: {
      type: Array,
      default() {
        return [];
      }
    },
    chosenId: {
      type: String,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      highlightedId: null,
      highlightedCat: null,
    };
  },
  computed: {
  },
  methods: {
    highlight(id, cat) {
      this.highlightedId = id;
      this.highlightedCat = cat;
    },
  },
  created() {
    const {id , cat} = this.spectrum[0].fragrances[0];
    this.highlight(id, cat);
  }
}
</script>
<style lang="scss" scoped>
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';
@import '~bootstrap/scss/mixins';

.spectrum-category__images {
  height: 160px;
}
.spectrum-category__image {
  width: 56px;
  background: center top no-repeat;
  background-size: 100% auto;
}
.spectrum-category__category {
  background-color: theme-color(light);
}
.spectrum-category__image,
.spectrum-category__text,
.spectrum-category__category {
  cursor: pointer;
}

// Combine for image and text since they don't affect each other
.highlighted,
.chosen {
  background-position: center bottom;
  text-decoration: underline;
}
.highlighted-category {
  background-color: theme-color(dark);
  color: theme-color(light);
}
</style>
