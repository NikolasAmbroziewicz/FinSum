import H4 from "src/shared/components/Headers/H4"

import { Position } from 'src/shared/components/Headers/Header.types'

const CryptoCurrencyPanel = () => {
  return (
    <div className="flex justify-center bg-yellow-200">
      <H4 styles="p-2" position={Position.left}>CryptoCurrencyPanel</H4>
    </div>
  )
}

export default CryptoCurrencyPanel