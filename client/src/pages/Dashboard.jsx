import { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { option, setOption, email } = useContext(AppContext);
  const navigate = useNavigate();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    const loadTimeId = setTimeout(() => {
      setLoad(false);
    }, 1500);

    return () => {
      clearTimeout(loadTimeId);
    };
  }, []);

  const startExam = (level) => {
    if (setOption) {
      setOption({
        ...option,
        category: "Standard",
        level,
      });
    } else {
      option.category = "Standard";
      option.level = level;
    }

    navigate("/exam");
  };

  return (
    <div className="w-full min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* section 1 */}
        <div className="w-full">
          <div className="mt-4 lg:mt-10 shadow-lg bg-white p-6 sm:p-8 flex flex-col items-center rounded-xl ring-1 ring-slate-100">
            <h2 className="text-2xl sm:text-3xl font-semibold text-center text-slate-600 mb-3">
              Welcome!!!
            </h2>

            <img
              src="/images/Exams-bro.png"
              alt="education_image"
              className="w-48 sm:w-60 md:w-72"
            />

            <p className="text-sm sm:text-base text-center text-slate-600 mt-3">
              Hi there, want to give test? You can start it by choosing your
              difficulty level and start your exam right away. Remember, you
              will have 30 minutes.
            </p>
          </div>
        </div>

        {/* section 2 */}
        <div className="w-full">
          <h2 className="text-center text-2xl sm:text-3xl font-semibold text-slate-700 mb-6">
            Start your <span className="text-pink-500">Test Exam</span>
          </h2>

          {!load ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="flex p-4 bg-blue-100 rounded-xl cursor-pointer hover:bg-blue-300 justify-between items-center transition"
                onClick={() => startExam("beginner")}
              >
                <div className="mr-3">
                  <h4 className="font-semibold text-lg">Beginner</h4>
                  <p className="text-sm text-slate-700">for freshers</p>
                </div>
                <img
                  src="/images/beginner_madel.png"
                  alt="bronze-medal"
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div
                className="flex p-4 bg-blue-100 rounded-xl cursor-pointer hover:bg-blue-300 justify-between items-center transition"
                onClick={() => startExam("medium")}
              >
                <div className="mr-3">
                  <h4 className="font-semibold text-lg">Medium</h4>
                  <p className="text-sm text-slate-700">for regulars</p>
                </div>
                <img
                  src="/images/medium_madel.png"
                  alt="silver-medal"
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div
                className="flex p-4 bg-blue-100 rounded-xl cursor-pointer hover:bg-blue-300 justify-between items-center transition"
                onClick={() => startExam("difficult")}
              >
                <div className="mr-3">
                  <h4 className="font-semibold text-lg">Pro</h4>
                  <p className="text-sm text-slate-700">for interviews</p>
                </div>
                <img
                  src="/images/pro_madel.png"
                  alt="pro-medal"
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div className="flex p-4 bg-yellow-100 rounded-xl cursor-pointer hover:bg-yellow-300 justify-between items-center transition">
                <div className="mr-3">
                  <h4 className="font-semibold text-lg">Quiz Game</h4>
                  <p className="text-sm text-slate-700">for fun</p>
                </div>
                <img
                  src="/images/game_controller.jpg"
                  alt="game-controller"
                  className="w-12 h-12 object-cover rounded"
                />
              </div>

              <div className="flex p-4 bg-green-100 rounded-xl cursor-pointer hover:bg-green-300 justify-between items-center transition">
                <div className="mr-3">
                  <h4 className="font-semibold text-lg">Progress</h4>
                  <p className="text-sm text-slate-700">check your progress</p>
                </div>
                <img
                  src="/images/barchart.jpg"
                  alt="progress-chart"
                  className="w-12 h-12 object-cover rounded"
                />
              </div>

              <div className="flex p-4 bg-red-100 rounded-xl cursor-pointer hover:bg-red-300 justify-between items-center transition">
                <div className="mr-3">
                  <h4 className="font-semibold text-lg">Result</h4>
                  <p className="text-sm text-slate-700">see your last result</p>
                </div>
                <img
                  src="/images/result.jpg"
                  alt="result"
                  className="w-12 h-12 object-cover rounded"
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <p className="text-center text-lg animate-pulse">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;