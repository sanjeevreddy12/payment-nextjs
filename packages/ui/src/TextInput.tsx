"use client";

export const TextInput = ({
  label,
  placeholder,
  onChange,
  value,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="pt-2">
      <label className="block mb-2 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        type="text"
        id="firstName"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        value={value} // REQUIRED
        onChange={(e) => onChange(e.target.value)} // REQUIRED
      />
    </div>
  );
};
