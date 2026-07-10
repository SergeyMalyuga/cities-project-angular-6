export function getRatingWidth(rating: number): number {
  const safeRating = rating ?? 0;
  return Math.floor(safeRating * 20);
}
