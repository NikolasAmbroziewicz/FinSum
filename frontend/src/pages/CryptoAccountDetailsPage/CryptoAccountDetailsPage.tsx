import { useState } from 'react';

import CryptoAccountSummary from 'src/features/CryptoAccountDetails/components/CryptoAccountSummary'
import CryptoAccount from 'src/features/CryptoAccountDetails/components/CryptoAccount'

const CryptoAccountDetailsPage = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <CryptoAccountSummary />
      <CryptoAccount />
    </div>
  )
}

export default CryptoAccountDetailsPage