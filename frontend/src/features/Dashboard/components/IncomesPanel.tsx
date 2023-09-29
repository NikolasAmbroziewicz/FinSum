import H4 from "src/shared/components/Headers/H4"

import { Position } from 'src/shared/components/Headers/Header.types'

const IncomesPanel = () => {
  return (
    <div className="flex justify-center bg-red-100">
      <H4 styles="p-2" position={Position.left}>Incomes Panel</H4>
    </div>
  )
}

export default IncomesPanel