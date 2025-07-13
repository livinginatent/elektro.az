export const formatToAzerbaijaniDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString("az-AZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
