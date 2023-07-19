import { useSelector } from 'react-redux'

import { getAllIncomes, getLoadingStatus } from 'src/store/AccountsDetails/incomes/AccountDetailsIncomesSlice'

import AccountIncomeForm from './AccountIncomeForm';

import NotFound from 'src/shared/components/NotFound/NotFound';
import Loading from 'src/shared/components/Loading/Loading';
import BaseTable from 'src/shared/components/Table/BaseTable';

import ListElement from 'src/shared/components/List/ListElement';
import ListElementMobile from 'src/shared/components/List/ListElementMobile';
import ListElementAction from 'src/shared/components/List/ListElementAction';

import { useAccountIncome } from 'src/features/AccountDetails/hooks/useAccountIncome';

import { useScreen } from 'src/shared/hooks/useScreen'
import { useModal } from 'src/shared/components/Modals/hooks/useModal';

import { LoadingPosition } from 'src/shared/components/Loading/types';
import { AccountDetailsIncomeSchemaType } from 'src/features/AccountDetails/validators/AccountDetailsIncomes';

interface IAccountIncomesList {
  account_id: number
}

const AccountIncomesList: React.FC<IAccountIncomesList> = ({ account_id }) => {
  const income = useSelector(getAllIncomes);
  const loading = useSelector(getLoadingStatus);

  const { isMobileScreen } = useScreen()
  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } = useModal();

  const { handleDeleteIncome } = useAccountIncome({
    onClose: handleDeleteOpen
  });

  return (
    <div className="h-full my-4">
      <div className="mt-4 h-full">
        {
          loading ? (
            <Loading position={LoadingPosition.start} />
          ) : income.length !== 0 ? (
            isMobileScreen() ? (
              <div className="flex gap-2 flex-col">
                {income.map((element) => (
                  <ListElementMobile
                    key={element.id}
                    title={element.title}
                    amount={element.amount}
                    date={element.date}
                  >
                    <ListElementAction<AccountDetailsIncomeSchemaType>
                      element={element}
                      isDeleteModalOpen={isDeleteOpen}
                      handleDeleteModal={handleDeleteOpen}
                      isEditModalOpen={isEditOpen}
                      handleEditModal={handleEditOpen}
                      handleDeleteElement={handleDeleteIncome}
                      titleDeleteModal='Delete Income'
                      titleEditModal='EditModal'
                      contentEditModal={
                        <AccountIncomeForm
                          onClose={handleEditOpen}
                          editForm={true}
                          income={element}
                          account_id={account_id}
                        />
                      }
                    />
                  </ListElementMobile>
                  ))}
              </div>
            ) : (
              <BaseTable
                headers={['Title', 'Amount', 'Date', '']}
                headerWidth={['1/2', '100px', '130px', '60px']}
              >
                {income.map((element) => (
                  <ListElement
                    key={element.id}
                    title={element.title}
                    amount={element.amount}
                    date={element.date}
                  >
                    <ListElementAction<AccountDetailsIncomeSchemaType>
                      element={element}
                      isDeleteModalOpen={isDeleteOpen}
                      handleDeleteModal={handleDeleteOpen}
                      isEditModalOpen={isEditOpen}
                      handleEditModal={handleEditOpen}
                      handleDeleteElement={handleDeleteIncome}
                      titleDeleteModal='Delete Income'
                      titleEditModal='EditModal'
                      contentEditModal={
                        <AccountIncomeForm
                          onClose={handleEditOpen}
                          editForm={true}
                          income={element}
                          account_id={account_id}
                        />
                      }
                    />
                  </ListElement>
                ))}
              </BaseTable>
            )
          ) : (
            <NotFound text={'No Income Found'} />
          )
        }
      </div>
    </div>
  )
}

export default AccountIncomesList