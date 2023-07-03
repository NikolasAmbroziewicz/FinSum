import { useNavigate } from 'react-router-dom'

import H3 from 'src/shared/components/Headers/H3';

import AccountElementAction from 'src/features/Accounts/components/AccountElementAction';

import { Position } from 'src/shared/components/Headers/Header.types';

import { AccountSchemaType } from 'src/features/Accounts/validators'

interface IAccountListElement {
  account: AccountSchemaType
}

const AccountListElement: React.FC<IAccountListElement> = ({ account }) => {
  const navigate = useNavigate()

  const handleAccountClick = (id: number | undefined) => {
    navigate(`${id}`)
  }

  return (
    <div className="flex flex-col justify-between w-[200px] h-[200px] border-slate-300 border-[1px] p-4 rounded-md bg-gray-100" onClick={() => handleAccountClick(account.id)}>
      <div className='flex justify-between items-center'>
        <H3 position={Position.left}>{account.title}</H3>
        <AccountElementAction account={account} />
      </div>
      
      <span>Currency: {account.currency}</span>
    </div>
  )
}

export default AccountListElement