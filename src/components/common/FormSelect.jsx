import React from 'react';

const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  required,
  error
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 
          bg-white dark:bg-gray-700 
          border border-gray-300 dark:border-gray-600 
          rounded-md 
          text-gray-900 dark:text-white 
          focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 
          hover:border-gray-400 dark:hover:border-gray-500
          transition-colors duration-200"
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormSelect; 