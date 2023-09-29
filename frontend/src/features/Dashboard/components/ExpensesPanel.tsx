import H4 from "src/shared/components/Headers/H4"

import { Position } from 'src/shared/components/Headers/Header.types'

const ExpenesePanel = () => {
  return (
    <div className="flex justify-center bg-green-100 w-full">
      <H4 styles="p-2" position={Position.left}>Expenses Panel</H4>
    </div>
  )
}

export default ExpenesePanel