// Drupal settings data
export interface DrupalFragSetting {
  fragrance_name: string;
  fragrance_id: string;
  fragrance_image: string;
  fragrance_spectrum_image: string | null;
  combination_warmer: string;
  combination_fresher: string;
  buy_button_mobile: string;
  buy_button_desktop: string;
}
export interface DrupalSettings {
  [prodId: string]: DrupalFragSetting;
}
