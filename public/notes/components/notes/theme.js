import { CATEGORIES } from "../../data/resources.js";

// Brand colour per category (cycles through the four logo colours if you add more)
const THEMES = ["blue", "green", "red", "yellow"];

export const themeFor = (category) => {
  const index = CATEGORIES.indexOf(category);
  return THEMES[(index < 0 ? 0 : index) % THEMES.length];
};
