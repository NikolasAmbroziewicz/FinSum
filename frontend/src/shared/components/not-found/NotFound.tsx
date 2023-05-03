import { BiErrorCircle } from 'react-icons/bi'

interface INotFound {
  text: string
}

const NotFound: React.FC<INotFound> = ({ text }) => {
  return (
    <div className="flex flex-col w-width items-center">
      <BiErrorCircle className='text-2xl text-gray-600' />
      <span className="mt-2 text-lg text-gray-600">{text}</span>
    </div>
  )
}

export default NotFound