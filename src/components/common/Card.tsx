import { DetailedHTMLProps, HTMLAttributes } from 'react';

type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  title: string;
};

export const SubTitle = ({ title }: { title: string }) => (
  <div className="py-2 text-black  dark:text-white">
    <b>{title}</b>
  </div>
);
const Card = ({ title, children, ...rest }: Props) => {
  return (
    <div
      className="bg-white rounded-lg dark:bg-light-dark shadow-card mb-4 overflow-hidden"
      {...rest}
    >
      <div className="border-b border-gray-200 border-dashed dark:border-gray-700 p-5 text-black uppercase dark:text-white">
        <b>{title}</b>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
};

export default Card;
