import { useNavigate } from 'react-router-dom';

import H3 from 'src/shared/components/Headers/H3';

import ListElementAction from 'src/shared/components/List/ListElementAction';
import AccountsForm from 'src/features/Accounts/components/AccountsForm';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';
import { useAccount } from 'src/features/Accounts/hooks/useAccounts';

import { Position } from 'src/shared/components/Headers/Header.types';

import { AccountSchemaType } from 'src/features/Accounts/validators';

interface IAccountListElement {
  account: AccountSchemaType;
}

const AccountListElement: React.FC<IAccountListElement> = ({ account }) => {
  const navigate = useNavigate();
  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } =
    useModal();

  const { handleDeleteAccounts } = useAccount({
    onClose: handleDeleteOpen
  });

  const handleAccountClick = (id: number | undefined) => {
    navigate(`${id}`);
  };

  return (
    <div
      className="flex flex-col justify-between w-[200px] h-[200px] border-slate-300 border-[1px] p-4 rounded-md bg-gray-100"
      onClick={() => handleAccountClick(account.id)}
    >
      <div className="flex justify-between items-center">
        <H3 position={Position.left}>{account.title}</H3>
        <ListElementAction<AccountSchemaType>
          element={account}
          isDeleteModalOpen={isDeleteOpen}
          handleDeleteModal={handleDeleteOpen}
          isEditModalOpen={isEditOpen}
          handleEditModal={handleEditOpen}
          handleDeleteElement={handleDeleteAccounts}
          titleDeleteModal="Delete Account"
          titleEditModal="Edit Account"
          contentDeleteModal='Do you want to Delete this Account?'
          contentEditModal={
            <AccountsForm
              onClose={handleEditOpen}
              editForm={true}
              account={account}
            />
          }
        />
      </div>

      <span>Currency: {account.currency}</span>
    </div>
  );
};

export default AccountListElement;
