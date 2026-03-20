import { useContext } from "react";
import BarChart from "../components/BarChart";
import DoughnutChart from "../components/DoughnutChart";
import AppContext from "../contexts/AppContext";

function Progressboard() {
  const { report } = useContext(AppContext);

  if (!report) {
    return (
      <div className="w-full pt-28 text-center px-4">
        <h2 className="text-2xl font-semibold">No report available</h2>
      </div>
    );
  }

  const { marks, grade } = report;

  return (
    <div className="w-full pt-24 sm:pt-28 px-4">
      <h2 className="text-2xl sm:text-4xl font-semibold mb-2 text-center">
        Your Progress Report
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm sm:text-base font-medium text-gray-500">Marks</p>
          <p className="text-xl sm:text-2xl font-bold">{marks}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm sm:text-base font-medium text-gray-500">Grade</p>
          <p className="text-xl sm:text-2xl font-bold">{grade}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm sm:text-base font-medium text-gray-500">Total Questions</p>
          <p className="text-xl sm:text-2xl font-bold">50</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-sm sm:text-base font-medium text-gray-500">Total Marks</p>
          <p className="text-xl sm:text-2xl font-bold">50</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        <div className="w-full lg:w-[65%] bg-white rounded-xl shadow p-4 sm:p-6 text-center">
          <h4 className="text-base sm:text-lg font-semibold mb-4">
            Question Attemption Analysis
          </h4>
          <div className="w-full overflow-x-auto">
            <BarChart />
          </div>
        </div>

        <div className="w-full lg:w-[35%] bg-white rounded-xl shadow p-4 sm:p-6 text-center">
          <h4 className="text-base sm:text-lg font-semibold mb-4">
            Categorical Marks Analysis
          </h4>
          <div className="flex justify-center">
            <div className="w-full max-w-[280px] sm:max-w-[320px]">
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Progressboard;