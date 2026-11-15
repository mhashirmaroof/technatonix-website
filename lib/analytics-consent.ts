export type RegionalAnalyticsRule = {
  region: string;
  analyticsStorage: 'denied' | 'granted';
  prompt: boolean;
};

// Add rules only after legal review, including the treatment of unknown subdivisions.
export const regionalAnalyticsRules: RegionalAnalyticsRule[] = [];

export function analyticsRegionPolicy(
  country: string | undefined,
  subdivision: string | undefined,
  rules: readonly RegionalAnalyticsRule[] = regionalAnalyticsRules,
): { analyticsStorage: 'denied' | 'granted'; prompt: boolean } {
  const fallback = { analyticsStorage: 'denied', prompt: true } as const;
  if (!country || !/^[A-Z]{2}$/.test(country)) return fallback;
  const countryRules = rules.filter(rule => rule.region.startsWith(`${country}-`));
  if (subdivision && !/^[A-Z0-9]{1,3}$/.test(subdivision)) return fallback;
  const region = subdivision ? `${country}-${subdivision}` : undefined;
  const rule = rules.find(item => item.region === region);
  if (rule) return { analyticsStorage: rule.analyticsStorage, prompt: rule.prompt };
  if (countryRules.length > 0) return fallback;
  const countryRule = rules.find(item => item.region === country);
  return countryRule
    ? { analyticsStorage: countryRule.analyticsStorage, prompt: countryRule.prompt }
    : fallback;
}
