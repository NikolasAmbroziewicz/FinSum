import GlobalNavigation from "../components/naviagation/GlobalNavigation"

interface IBaseNavLayout {
  children: JSX.Element
}

const BaseNavLayout: React.FC<IBaseNavLayout> = ({ children }) => {
  return (
    <div>
      <GlobalNavigation />
      <div>
        {children}
      </div>
    </div>
  )
}

export default BaseNavLayout