import { LoadingSize } from '../types'

interface ILoading {
  size?: LoadingSize
}

const Loading: React.FC<ILoading> = ({ size = LoadingSize.medium }) => {
  const loadingSize = () => {
    switch(size) {
      case LoadingSize.small:
        return 'w-6 h-6 border-[3px]'
      case LoadingSize.medium:
        return 'w-8 h-8 border-[4px]'
      case LoadingSize.large:
        return 'w-10 h-10 border-[4px]'
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className={`animate-spin inline-block ${loadingSize()} border-current border-t-transparent text-sky-600 rounded-full`} role="status" aria-label="loading">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
    
  )
}

export default Loading