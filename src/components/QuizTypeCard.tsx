import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface QuizTypeCardProps {
  category: string; 
  imgSrc: string;
  navigateTo: string;
}

export const QuizTypeCard: FC<QuizTypeCardProps> = ({
  category,
  imgSrc,
  navigateTo,
}) => {
  const navigate = useNavigate();

  return (
    <div className="m-2 justify-center flex flex-col items-center space-y-12 p-10 shadow-md rounded-sm">
        <h2 className="text-4xl font-semibold text-blue-900">{category}</h2>
      <img src={imgSrc} alt="" className="w-64" />
      
      <button
        onClick={() => navigate(navigateTo)}
        className="bg-blue-600 hover:bg-blue-800 text-white px-10 py-3 rounded-lg font-medium"
      >
        Let's go
      </button>
    </div>
  );
};
