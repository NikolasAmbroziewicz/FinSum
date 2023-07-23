import H1 from 'src/shared/components/Headers/H1';

import Calendar from 'src/shared/components/Calendar/Calendar';

import { Position } from 'src/shared/components/Headers/Header.types';

interface IPageHeader {
  children?: JSX.Element;
  startDate?: Date;
  setStartDate?: (date: Date) => void;
  title: string;
}

const PageHeader: React.FC<IPageHeader> = ({
  children,
  startDate,
  setStartDate,
  title
}) => {
  return (
    <>
      <div className="flex">
        <H1 styles="my-4" position={Position.left}>
          {title}
        </H1>
        {startDate && setStartDate && (
          <>
            <p className="m-auto mr-2 text-gray-600">Year:</p>
            <Calendar startDate={startDate} setStartDate={setStartDate} />
          </>
        )}
      </div>
      <div className="flex justify-end">{children}</div>
    </>
  );
};

export default PageHeader;
