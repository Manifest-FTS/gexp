import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  title: string;
  boxClassName?: string;
}>;

const TitleValue = ({ title, boxClassName, children }: Props) => {
  return (
    <div className={`flex max-md:flex-col gap-3 max-md:mb-4 ${boxClassName}`}>
      <p className="mb-1 md:mb-2 text-gray-500 dark:text-gray-300 min-w-[30%] lg:min-w-[15%]">
        {title}
      </p>
      <div className="break-words">{children}</div>
    </div>
  );
};

export default TitleValue;
