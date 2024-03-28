import { QuizTypeCard } from "../components";

export const DashboardPage = () => {
  return (
    <div className="flex flex-wrap items-center justify-center min-h-[calc(100vh-58px)] py-20">
      <QuizTypeCard
        category="Mathematics"
        imgSrc="maths.jpg"
        navigateTo="/maths-quiz"
      />
      <QuizTypeCard
        category="Data Science"
        imgSrc="ds.jpg"
        navigateTo="/data-science-quiz"
      />
    </div>
  );
};
