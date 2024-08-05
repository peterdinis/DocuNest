"use client"

import { useQuery } from "@tanstack/react-query"
import { fetchAllPricingPlans } from "@/app/_store/queries/stripeQueries"

const usePricingPlans = () => {
    return useQuery({
        queryKey: ["allPricingPlans"],
        queryFn: fetchAllPricingPlans,
        staleTime: Infinity,
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
    })
}

export default usePricingPlans