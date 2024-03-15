import React, { PropsWithChildren } from 'react';

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

const Chip = (props: Props) => {
  return (
    <div
      className="bg-brand py-1.5 px-3 rounded-lg text-white cursor-pointer"
      {...props}
    />
  );
};

export default Chip;
