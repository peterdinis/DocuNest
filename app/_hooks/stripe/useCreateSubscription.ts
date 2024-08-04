"use client"

import { handleSubscriptMut } from "@/app/_store/mutations/stripeMutations";
import { useMutation } from "@tanstack/react-query"
import {toast} from "react-toastify";

const useCreateSubscription = () => {
    return useMutation({
        mutationKey: ["createSubscription"],
        mutationFn: (priceId: string) => handleSubscriptMut(priceId),
        onSuccess: () => {
            toast.success("New subscription was created")
        },

        onError: () => {
            toast.error("New subscription was not created");
        }
    });
}

export default useCreateSubscription;