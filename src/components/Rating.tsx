import { FC } from "react";
import { FaStar } from "react-icons/fa";

interface RatingProps {
  quizRating: number;
  setQuizRating: React.Dispatch<React.SetStateAction<number>>;
}

export const Rating: FC<RatingProps> = ({ quizRating, setQuizRating }) => {
  const ratingArr = new Array(5).fill(null);
  return (
    <div className="flex space-x-1">
      {ratingArr.map((_, index) => {
        return (
          <button onClick={() => setQuizRating(index + 1)} key={index}>
            <FaStar
              className={`text-xl  ${
                index + 1 <= quizRating ? "text-green-600" : "text-gray-200"
              } `}
            />
          </button>
        );
      })}
    </div>
  );
};
