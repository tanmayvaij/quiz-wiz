import Quiz from "../components/Quiz";

const MathematicsPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-58px)]">
      <Quiz dataCollection="maths-answers" questionCollection="maths-questions" />
    </div>
  );
};

export default MathematicsPage;
