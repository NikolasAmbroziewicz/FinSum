import IncomeForm from './IncomeForm';

import ListElementAction from 'src/shared/components/List/ListElementAction';
import { IncomeSchemaType } from 'src/features/Income/validators';

import { useIncome } from 'src/features/Income/hooks/useIncome';

import { useModal } from 'src/shared/components/Modals/hooks/useModal';

interface IIncomeListAction {
  income: IncomeSchemaType;
}

const IncomeListAction: React.FC<IIncomeListAction> = ({ income }) => {
  const { isOpen: isEditOpen, handleOpenModal: handleEditOpen } = useModal();
  const { isOpen: isDeleteOpen, handleOpenModal: handleDeleteOpen } =
    useModal();

  const { handleDeleteIncome } = useIncome({
    onClose: handleDeleteOpen
  });

  return (
    <ListElementAction<IncomeSchemaType>
      element={income}
      isDeleteModalOpen={isDeleteOpen}
      handleDeleteModal={handleDeleteOpen}
      isEditModalOpen={isEditOpen}
      handleEditModal={handleEditOpen}
      handleDeleteElement={handleDeleteIncome}
      titleDeleteModal="Delete Income"
      titleEditModal="EditModal"
      contentEditModal={
        <IncomeForm onClose={handleEditOpen} editForm={true} income={income} />
      }
    />
  );
};

export default IncomeListAction;
