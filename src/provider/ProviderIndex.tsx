import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";

// QueryClient yaratish

interface ProviderIndexProps {
  children: React.ReactNode;
}

const ProviderIndex: React.FC<ProviderIndexProps> = ({ children }) => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};

export default ProviderIndex;
