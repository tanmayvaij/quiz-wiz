import {Quiz} from "../components";

export const DataSciencePage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-58px)]">
      <Quiz dataCollection="ds-answers" questionCollection="ds-questions" />
    </div>
  );
};

