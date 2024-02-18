import React from 'react';

type OptionType = {
  label: string;
  value: string | number;
};
type Props = {
  className?: string;
  value: string | number;
  setValue: (v: string | number) => void;
  defaultLabel?: string;
  defaultValue?: string | number;
  options: OptionType[];
};

const Select = ({
  value,
  setValue,
  defaultValue,
  defaultLabel,
  options,
  className = '',
}: Props) => {
  return (
    <select
      className={`border max-w-[200px] rounded-md dark:bg-light-dark dark:text-gray-100 py-1 px-3 overflow-ellipsis ${className}`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      {defaultLabel && <option value={defaultValue}>{defaultLabel}</option>}
      {options.map(({ label, value }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  );
};

export default Select;
