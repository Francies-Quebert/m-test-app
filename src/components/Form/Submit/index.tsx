type SubmitButtonProps = {
  label: string;
};

const SubmitButton = ({ label }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-300"
    >
      {label}
    </button>
  );
};

export default SubmitButton;
