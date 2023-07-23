import { useSelector } from 'react-redux';

import {
  getAllAccounts,
  getLoadingStatus
} from 'src/store/Accounts/AccountsSlice';

import H2 from 'src/shared/components/Headers/H1';
import NotFound from 'src/shared/components/NotFound/NotFound';
import Loading from 'src/shared/components/Loading/Loading';

import AccountListElement from 'src/features/Accounts/components/AccountListElement';

import { Position } from 'src/shared/components/Headers/Header.types';
import { LoadingPosition } from 'src/shared/components/Loading/types';

import { useScreen } from 'src/shared/hooks/useScreen';

const AccountsList = () => {
  const accounts = useSelector(getAllAccounts);
  const loading = useSelector(getLoadingStatus);

  const { isMobileScreen } = useScreen();

  return (
    <div className="flex flex-col h-full gap-6 mt-4">
      <H2 position={Position.left}>Your Accounts</H2>
      <div
        className={`flex flex-row flex-wrap ${
          isMobileScreen() || (accounts.length === 0 && 'justify-center')
        }  gap-6 cursor-pointer`}
      >
        {loading ? (
          <Loading position={LoadingPosition.start} />
        ) : accounts.length !== 0 ? (
          accounts.map((account) => (
            <AccountListElement key={account.id} account={account} />
          ))
        ) : (
          <NotFound text={'No Accounts Found'} />
        )}
      </div>
    </div>
  );
};

export default AccountsList;
