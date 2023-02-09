import { heroes } from "../data/hero";

export const getSearchHero = (name = "") => {
  name = name.toLocaleLowerCase().trim();

  if (name.length === 0) return [];

  return heroes.filter((hero) =>
    hero.superhero.toLocaleLowerCase().includes(name)
  );
};
