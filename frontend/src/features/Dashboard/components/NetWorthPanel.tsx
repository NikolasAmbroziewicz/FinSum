import H4 from "src/shared/components/Headers/H4"

import { Position } from 'src/shared/components/Headers/Header.types'

const NetWorthPanel = () => {
  return (
    <div className="flex justify-center bg-blue-200">
      <H4 styles="p-2" position={Position.left}>Net Worth</H4>
    </div>
  )
}

export default NetWorthPanel