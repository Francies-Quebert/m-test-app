import Select from "../../Form/Select";
import useExpensesContext from "../../../hooks/useExpensesContext";
import { Category, Intervals } from "../../../types";
import { categoriesData, intervalData } from "../../../mockData/data";
import { today } from "../../../utils";

const DataFilter = () => {
  const {
    category,
    setCategory,
    endDate,
    setEndDate,
    interval,
    setInterval,
    startDate,
    setStartDate,
  } = useExpensesContext();

  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full lg:w-1/6">
        <label
          htmlFor="end-date"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date
        </label>
        <input
          type="date"
          id="end-date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          max={endDate}
        />
      </div>
      <div className="w-full lg:w-1/6">
        <label
          htmlFor="end-date"
          className="block text-sm font-medium text-gray-700"
        >
          End Date
        </label>
        <input
          type="date"
          id="end-date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          max={today}
        />
      </div>

      <div className="w-full lg:w-1/4">
        <Select
          label="Category"
          dataList={categoriesData}
          value={category}
          onChange={(value) => setCategory(value as Category)}
        />
      </div>
      <div className="w-full lg:w-1/4">
        <Select
          label="Interval"
          dataList={intervalData}
          value={interval}
          onChange={(value) => setInterval(value as Intervals)}
        />
      </div>
    </div>
  );
};

export default DataFilter;
