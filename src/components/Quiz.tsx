import {
  DocumentData,
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FC, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useAuth } from "../providers/AuthProvider";
import { InfinitySpin } from "react-loader-spinner";
import { Rating } from "../components";
import { User } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import { toastConfig } from "../config/toastConfig";
import { useNavigate } from "react-router-dom";

interface QuizProps {
  question: string;
  options: string[];
  questionId: string;
  answer: string;
  questionMadeBy: string;
}

export const Quiz: FC<{
  dataCollection: string;
  questionCollection: string;
}> = ({ dataCollection, questionCollection }) => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizProps | DocumentData | null>();
  const [userResponse, setUserResponse] = useState<DocumentData>();
  const [isQuizAnswered, setIsQuizAnswered] = useState<boolean>();
  const [quizRating, setQuizRating] = useState(0);

  const date = new Date().toDateString();

  const getQuestionQuery = query(
    collection(db, questionCollection),
    where("date", "==", date)
  );

  const isQuestionAnsweredQuery = query(
    collection(db, dataCollection),
    where("date", "==", date),
    where("user", "==", (user as User)?.email)
  );

  useEffect(() => {
    Promise.all([getDocs(isQuestionAnsweredQuery), getDocs(getQuestionQuery)])
      .then(([querySnapShot1, querySnapShot2]) => {
        if (querySnapShot1.empty) {
          setIsQuizAnswered(false);
        } else {
          querySnapShot1.forEach((doc) => {
            setUserResponse(doc.data());
          });
          setIsQuizAnswered(true);
        }

        if (querySnapShot2.empty) {
          setQuiz(null);
        } else {
          querySnapShot2.forEach((doc) => {
            setQuiz(doc.data());
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [userAnswer, setUserAnswer] = useState("");

  const submitAnswer = () => {
    if (userAnswer !== "" && quizRating !== 0)
      toast.promise(
        Promise.all([
          addDoc(collection(db, dataCollection), {
            user: (user as User)?.email,
            questionId: quiz?.questionId,
            userAnswer,
            isAnswerCorrect: userAnswer === quiz?.answer,
            date,
            quizRating,
          }),
          addDoc(collection(db, user?.email!), {
            questionId: quiz?.questionId,
            question: quiz?.question,
            userAnswer,
            isAnswerCorrect: userAnswer === quiz?.answer,
            date,
            quizRating,
          }),
        ]),
        {
          pending: "Please Wait",
          success: {
            render() {
              navigate("/");
              return "Answer submitted successfully";
            },
          },
          error: {
            render({ data }: { data: { message: string } }) {
              return data?.message;
            },
          },
        },
        toastConfig
      );
    else {
      toast.error("Please rate and answer the quiz to submit it", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (quiz === undefined) {
    return <InfinitySpin width="200" color="#4fa94d" />;
  }

  if (quiz === null) {
    return <h2>No quiz for today</h2>;
  }

  return (
    <div className="max-w-[1000px] p-6">
      <p>{quiz?.question}</p>
      <div className="pt-5 space-y-4">
        {(quiz as QuizProps)?.options?.map((option) => {
          return (
            <div key={option} className="flex items-center space-x-5">
              <input
                onChange={(e) => setUserAnswer(e.target.value)}
                value={option}
                type="radio"
                name="quizAnswer"
                disabled={isQuizAnswered}
              />
              <span>{option}</span>
            </div>
          );
        })}
      </div>

      <div className="py-10">
        {isQuizAnswered ? (
          <div className="flex flex-col flex-wrap justify-center items-center rounded-lg px-6 py-4">
            <div className="flex items-center justify-center flex-col">
              <p className="font-bold pb-2">
                Your Answer: {userResponse?.userAnswer}
              </p>
              <p className="font-bold pb-2">Correct answer: {quiz?.answer}</p>
            </div>

            <span className="text-sm pt-5">
              Question By:- {quiz.questionMadeBy}
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col space-y-10">
            <div className="flex flex-col flex-wrap justify-center items-center border rounded-lg px-6 py-4">
              <div className="flex items-center justify-center flex-col">
                <p className="font-bold pb-2">
                  🙏 Please rate the above question
                </p>
                <Rating quizRating={quizRating} setQuizRating={setQuizRating} />
              </div>

              <span className="text-sm pt-5">
                Question By:- {quiz.questionMadeBy}
              </span>
            </div>
            <button
              onClick={submitAnswer}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-10 py-2"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
