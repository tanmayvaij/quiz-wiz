import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap items-center justify-center min-h-[calc(100vh-58px)]">
      <div className="min-w-[400px] justify-center flex flex-col items-center space-y-10">
        <h2 className="text-3xl">Mathmatics</h2>
        <button
          onClick={() => navigate("/maths-quiz")}
          className="bg-blue-800 text-white px-10 py-2 rounded-md"
        >
          Let's go
        </button>
      </div>
      <div className="min-w-[400px] justify-center flex flex-col items-center space-y-10">
        <h2 className="text-3xl">Data Science</h2>
        <button
          onClick={() => navigate("data-science-quiz")}
          className="bg-blue-800 text-white px-10 py-2 rounded-md"
        >
          Let's go
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
