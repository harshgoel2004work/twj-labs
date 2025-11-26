// usePricingData.ts
"use client"

import { useState, useEffect } from 'react';
import { getPricingPlans } from '@/actions/get-pricing'; // Import your server action

export function usePricingData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_KEY = 'pricing_data';
    const EXPIRY_TIME = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

    const fetchAndCache = async () => {
      try {
        // 1. Check Local Storage
        const cached = localStorage.getItem(CACHE_KEY);
        
        if (cached) {
          const { value, timestamp } = JSON.parse(cached);
          const now = Date.now();

          // 2. If cache is valid (less than 2 hours old), use it
          if (now - timestamp < EXPIRY_TIME) {
            console.log("Using cached data from LocalStorage");
            setData(value);
            setLoading(false);
            return;
          }
        }

        // 3. If no cache or expired, fetch from Server Action
        console.log("Cache expired or missing. Fetching from server...");
        const freshData = await getPricingPlans();

        // 4. Save to Local Storage with timestamp
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          value: freshData,
          timestamp: Date.now()
        }));

        setData(freshData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndCache();
  }, []);

  return { data, loading };
}