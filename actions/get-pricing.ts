'use server'

import { fetchAllPricingPlans } from '@/lib/sanity-queries'
import type { PricingPlanType } from '@/data/pricing-plans'

/**
 * Drop-in replacement for the previous SQLite-backed `getPricingPlans`.
 * Returns all pricing categories ordered by the Sanity category field.
 */
export const getPricingPlans = async (): Promise<PricingPlanType[]> => {
  return fetchAllPricingPlans()
}