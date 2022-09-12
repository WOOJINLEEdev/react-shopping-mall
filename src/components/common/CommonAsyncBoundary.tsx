import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import AsyncBoundary from "components/common/AsyncBoundary";
import ErrorMessage from "components/common/ErrorMessage";
import Loading from "components/common/Loading";

interface ICommonAsyncBoundaryProps {
  children?: ReactNode;
}

const CommonAsyncBoundary = ({ children }: ICommonAsyncBoundaryProps) => {
  return (
    <AsyncBoundary
      rejectedFallback={() => <ErrorMessage />}
      pendingFallback={<Loading />}
    >
      {children || <Outlet />}
    </AsyncBoundary>
  );
};

export default CommonAsyncBoundary;
