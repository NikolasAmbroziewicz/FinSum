import { LoadingSize, LoadingPosition } from './types';

interface ILoading {
  size?: LoadingSize;
  position?: LoadingPosition;
}

const Loading: React.FC<ILoading> = ({
  size = LoadingSize.medium,
  position = LoadingPosition.center
}) => {
  const loadingSize = () => {
    switch (size) {
      case LoadingSize.small:
        return 'w-6 h-6 border-[3px]';
      case LoadingSize.medium:
        return 'w-8 h-8 border-[4px]';
      case LoadingSize.large:
        return 'w-10 h-10 border-[4px]';
    }
  };

  const alignPosition = () => {
    switch (position) {
      case LoadingPosition.start:
        return 'items-start';
      case LoadingPosition.center:
        return 'items-center';
      case LoadingPosition.end:
        return 'items-end';
    }
  };

  return (
    <div className={`flex h-full w-full justify-center ${alignPosition()}`}>
      <div
        className={`animate-spin inline-block ${loadingSize()} border-current border-t-transparent text-sky-600 rounded-full`}
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
