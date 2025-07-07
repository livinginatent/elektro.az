// Helper function to handle null/undefined values
export const formatValue = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  unit: string = "",
  fallback: string = "Mövcud deyil"
) => {
  if (value === null || value === undefined || value === "" || value === 0) {
    return fallback;
  }
  return `${value}${unit}`;
};
