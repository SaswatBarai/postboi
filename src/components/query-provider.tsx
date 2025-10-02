"use client"

import { childrenProps } from "@/app/(auth)/layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"


export function QueryProvider({ children }: childrenProps) {
    const [client] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}