export function parseIngredients(ingredientString) {
  if (!ingredientString) return [];
  return ingredientString.split('; ');
}

export function findById(items, id, idField) {
  return items.find((item) => item[idField] === id);
}
