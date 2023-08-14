import H2 from 'src/shared/components/Headers/H2';

import { Position } from 'src/shared/components/Headers/Header.types';

import { AiOutlineClose } from 'react-icons/ai';

interface IBaseModal {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | JSX.Element;
  action?: JSX.Element;
  dataTest?: string;
}

const BaseModal: React.FC<IBaseModal> = ({
  isOpen,
  onClose,
  title,
  content,
  action,
  dataTest = 'baseModal'
}) => {
  return (
    <>
      {isOpen && (
        <div
          data-test={dataTest}
          className={`${
            isOpen ? 'fixed' : 'none'
          } inset-0 z-100 overflow-x-hidden overflow-y-auto bg-sky-500/[.2] z-[2]`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="fixed bg-white smplus:max-w-[600px] rounded-md 
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        sm:w-[calc(100%_-_1rem)]
                        smplus:top-1/3 smplus:left-1/2 smplus:-translate-x-1/2 smplus:-translate-y-1/2"
          >
            <div className="flex justify-between p-4 border-b-[1px]">
              <H2 position={Position.left}>{title}</H2>
              <button onClick={(e) => {
                e.stopPropagation()
                onClose()
                }}>
                <AiOutlineClose className="text-gray-600 text-xl hover:text-black" />
              </button>
            </div>
            <div className="flex justify-center p-4">{content}</div>
            {action && (
              <div className="flex justify-between p-4 border-t-[1px]">
                {action}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default BaseModal;
