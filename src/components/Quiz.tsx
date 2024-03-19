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
import Rating from "./Rating";

interface QuizProps {
  question: string;
  options: string[];
  questionId: string;
  answer: string;
  questionMadeBy: string;
}

const Quiz: FC<{ dataCollection: string; questionCollection: string }> = ({
  dataCollection,
  questionCollection,
}) => {
  const { user } = useAuth();

  const [quiz, setQuiz] = useState<QuizProps | DocumentData>();
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
    where("user", "==", user?.email)
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

        querySnapShot2.forEach((doc) => {
          setQuiz(doc.data());
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [userAnswer, setUserAnswer] = useState("");

  const submitAnswer = () => {
    if (userAnswer !== "" && quizRating !== 0)
      addDoc(collection(db, dataCollection), {
        user: user?.email,
        questionId: quiz?.questionId,
        userAnswer,
        isAnswerCorrect: userAnswer === quiz?.answer,
        date,
        quizRating,
      })
        .then(() => {
          alert("Answer submitted");
          location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    else {
      alert("Answer the quiz and rate it to submit");
    }
  };

  if (!quiz) {
    return <InfinitySpin width="200" color="#4fa94d" />;
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
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span>Your Answer: {userResponse?.userAnswer}</span>
              <span>Correct answer: {quiz?.answer}</span>
            </div>
            <span>Question By:- {quiz.questionMadeBy}</span>
          </div>
        ) : (
          <div className="flex items-center justify-center flex-col space-y-10">
            <div className="flex items-center space-x-20">
              <Rating quizRating={quizRating} setQuizRating={setQuizRating} />
              <span>Question By:- {quiz.questionMadeBy}</span>
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

export default Quiz;
