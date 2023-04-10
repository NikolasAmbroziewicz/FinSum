import GlobalNavigation from "../components/naviagation/GlobalNavigation"

interface IBaseNavLayout {
  children: JSX.Element
}

const BaseNavLayout: React.FC<IBaseNavLayout> = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <GlobalNavigation />
      <div className="overflow-scroll">
        {children}
      </div>
    </div>
  )
}

export default BaseNavLayout