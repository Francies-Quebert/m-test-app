type SelectProps = {
  value: string;
  label: string;
  onChange: (value: string) => void;
  dataList: { label: string; value: string }[];
};

const Select = ({ label, value, onChange, dataList }: SelectProps) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700">
        {label}:
      </label>
      <div className="relative mt-1">
        <select
          id="selectable-aa"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {dataList.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.707a1 1 0 011.414 0L10 11.293l3.293-3.586a1 1 0 111.414 1.414l-4 4.293a1 1 0 01-1.414 0l-4-4.293a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Select;
