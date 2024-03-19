import Quiz from "../components/Quiz";

const DataSciencePage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-58px)]">
      <Quiz dataCollection="ds-answers" questionCollection="ds-questions" />
    </div>
  );
};

export default DataSciencePage;
