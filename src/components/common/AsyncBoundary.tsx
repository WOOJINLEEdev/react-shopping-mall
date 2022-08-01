import { ReactNode, Suspense, SuspenseProps } from "react";
import {
  ErrorBoundary,
  ErrorBoundaryPropsWithRender,
} from "react-error-boundary";

interface IAsyncBoundaryProps
  extends Omit<ErrorBoundaryPropsWithRender, "fallbackRender"> {
  pendingFallback: SuspenseProps["fallback"];
  rejectedFallback: ErrorBoundaryPropsWithRender["fallbackRender"];
  children: ReactNode;
}

const AsyncBoundary = ({
  pendingFallback,
  rejectedFallback,
  children,
  ...errorBoundaryProps
}: IAsyncBoundaryProps) => {
  return (
    <ErrorBoundary fallbackRender={rejectedFallback} {...errorBoundaryProps}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default AsyncBoundary;
