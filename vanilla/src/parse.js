/**
 * Parse the "original" data that is in the page to extract product info
 */

import pageData from './original-data/page_data';
import drupalData from './original-data/drupal_settings';

// Products in this cat show in "spectrum"
const COMBO_CAT = 'CAT3805';

// Shows up top in spectrum
export const starters = pageData.catalog.categories
  .find(({ CATEGORY_ID }) => CATEGORY_ID === COMBO_CAT)
  .products.map(({ PRODUCT_ID }) => PRODUCT_ID);

// Spectrum + warmer/fresher frags not in spectrum
export const combiners = Object.values(drupalData).map(
  ({ fragrance_id: id }) => id
);

// Quick list of cats, lowercase
export const categories = pageData.catalog.categories
  .filter(({ CATEGORY_ID }) => CATEGORY_ID !== COMBO_CAT)
  .map(({ CATEGORY_NAME }) => CATEGORY_NAME.toLowerCase());

// Pull out all products
const allProducts = pageData.catalog.categories.reduce((acc, cat) => {
  // Specifically for starters, extract since has FRAGRANCE_FAMILY key needed
  if (cat.CATEGORY_ID === COMBO_CAT) {
    acc.push(...cat.products);
    return acc;
  }
  // Bail if no children
  if (!cat.children) {
    return acc;
  }
  // Get everything else
  cat.children.forEach(catChild => {
    const catProducts = catChild.products.filter(
      childProd =>
        // If in original drupal list of prods to care about
        combiners.some(id => id === childProd.PRODUCT_ID) &&
        // And not already in list
        !acc.some(({ PRODUCT_ID }) => PRODUCT_ID === childProd.PRODUCT_ID)
    );
    acc.push(...catProducts);
  });

  return acc;
}, []);

export const fragrances = Object.values(drupalData).map(
  (
    {
      fragrance_id: id,
      fragrance_name: short,
      fragrance_image: combiner,
      fragrance_spectrum_image: spectrum,
      combination_warmer: warmer,
      combination_fresher: fresher,
      buy_button_desktop: strBuyDesktop,
      buy_button_mobile: strBuyMobile,
    },
    index
  ) => {
    // Discover if a starter
    const isStarter = starters.some(starterId => id === starterId);

    // Need: skus, category
    const lookup = allProducts.find(
      ({ PRODUCT_ID: fragId }) => id === fragId
    ) || { FRAGRANCE_FAMILY: 'citrus' };

    const cat = lookup.FRAGRANCE_FAMILY.toLowerCase();
    const long = lookup.PROD_RGN_NAME || '';
    const skus = lookup.skus
      ? lookup.skus.reduce((acc, { PRODUCT_SIZE, formattedPrice }) => {
          acc[PRODUCT_SIZE] = formattedPrice;
          return acc;
        }, {})
      : {};

    return {
      id,
      names: {
        short,
        long,
      },
      cat,
      pizazz: index,
      img: {
        combiner,
        spectrum,
      },
      companion: {
        warmer,
        fresher,
      },
      strings: {
        strBuyDesktop,
        strBuyMobile,
      },
      skus,
      isStarter,
    };
  }
);

export const fallbackFrag = fragrances[0];
