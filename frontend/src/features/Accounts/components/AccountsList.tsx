import { useSelector } from 'react-redux';

import { useScreen } from 'src/shared/hooks/useScreen';

import { getAllAccounts, getLoadingStatus } from 'src/store/Accounts/AccountsSlice';

import H2 from 'src/shared/components/Headers/H1';
import NotFound from 'src/shared/components/NotFound/NotFound';
import Loading from 'src/shared/components/Loading/Loading';

import { Position } from 'src/shared/components/Headers/Header.types';
import { LoadingPosition } from 'src/shared/components/Loading/types';

const AccountsList = () => {
  const accounts = useSelector(getAllAccounts)
  const loading = useSelector(getLoadingStatus)

  const handleAccountClick = () => {
    console.log('s')
  }

  return (
    <div className="flex flex-col h-full gap-6 mt-4">
      <H2 position={Position.left}>
        Your Accounts
      </H2>
      <div className="flex flex-row flex-wrap gap-6 cursor-pointer" onClick={handleAccountClick}>
        {
          loading ? (
            <Loading position={LoadingPosition.start} />
          ) : accounts.length !== 0 ? (
            accounts.map((account) => (
              <div key={account.id} className="flex flex-col justify-between w-[200px] h-[200px] border-slate-300 border-[1px] p-4 rounded-md bg-gray-100">
                <h2 className="mb-2">Title: {account.title}</h2>
                <span>Currency: {account.currency}</span>
              </div>
            ))
          ) : (
            <NotFound text={'No Accounts Found'} />
          )}
      </div>
    </div>
  )
}

export default AccountsList