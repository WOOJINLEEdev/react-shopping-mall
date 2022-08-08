import AsyncBoundary from "components/common/AsyncBoundary";
import ErrorMessage from "components/common/ErrorMessage";
import Loading from "components/common/Loading";

import { ICommonAsyncBoundary } from "types";

const CommonAsyncBoundary = ({ children }: ICommonAsyncBoundary) => {
  return (
    <AsyncBoundary
      rejectedFallback={() => <ErrorMessage />}
      pendingFallback={<Loading />}
    >
      {children}
    </AsyncBoundary>
  );
};

export default CommonAsyncBoundary;
