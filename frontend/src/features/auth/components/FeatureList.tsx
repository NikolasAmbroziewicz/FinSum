import { FiArrowRightCircle } from 'react-icons/fi';

const FeatureList = () => {
  const dataMarketing = [
    'Stock',
    'Bonds',
    "ETF's",
    'Cyrptocurrency',
    'Free Cash'
  ];

  return (
    <div className="mb-7 mt-7">
      <ul>
        {dataMarketing.map((element) => (
          <div className="flex w-100 items-center" key={element}>
            <FiArrowRightCircle className="mr-3 text-stone-50" />
            <li className="text-stone-50" key={element}>
              {element}
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default FeatureList;
