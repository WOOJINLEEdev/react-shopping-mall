import AsyncBoundary from "components/common/AsyncBoundary";
import ErrorMessage from "components/common/ErrorMessage";
import Loading from "components/common/Loading";

const CommonAsyncBoundary: React.FC = ({ children }) => {
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
