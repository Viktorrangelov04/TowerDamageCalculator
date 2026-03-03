export const formatCompactNumber = (
  value: number | string,
  fractionDigits: number = 2
): string => {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  const absValue = Math.abs(numValue);

  if (absValue < 1_000_000) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: fractionDigits,
    }).format(numValue);
  }

  const suffixes = ["", "", "M", "B", "T", "q", "Q", "s", "S", "O", "N", "D", "aa", "ab", "ac", "ad"];
  
  const tier = Math.floor(Math.log10(absValue) / 3);

  if (tier >= 2 && tier < suffixes.length) {
    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);
    const scaled = numValue / scale;

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: fractionDigits,
    }).format(scaled) + suffix;
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: fractionDigits,
  }).format(numValue);
};