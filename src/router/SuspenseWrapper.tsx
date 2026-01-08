import { Suspense, ReactNode } from "react";
import { Spin } from "antd";

interface SuspenseWrapperProps {
  children: ReactNode;
}

export const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size="large" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};
