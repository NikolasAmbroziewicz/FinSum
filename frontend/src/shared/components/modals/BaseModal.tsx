import H2 from "src/shared/components/headers/H2"

import { Position } from 'src/shared/components/headers/Header.types'

import { AiOutlineClose } from 'react-icons/ai'


interface IBaseModal {
    isOpen: boolean
    onClose: () => void,
    title: string,
    content: string | JSX.Element,
    action?: JSX.Element
}

const BaseModal: React.FC<IBaseModal> = ({ isOpen, onClose, title, content, action }) => {
    return (
        <>
        {
            isOpen && (
                <div className={`${isOpen ? 'fixed': 'none'} inset-0 z-100 p-4 overflow-x-hidden overflow-y-auto bg-sky-500/[.2]`}>
                <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white max-w-[600px] rounded-md">
                    <div className="flex justify-between p-4 border-b-[1px]">
                        <H2 position={Position.left}>
                            {title}
                        </H2>
                        <button onClick={onClose}>
                            <AiOutlineClose className="text-gray-600 text-xl hover:text-black"/>
                        </button>
                    </div>
                    <div className="flex justify-center p-4">
                        {content}
                    </div>
                    {
                        action && (
                            <div className="flex justify-between p-4 border-t-[1px]">
                                {action}
                            </div>
                        )
                    }
                </div>
            </div>
            )
        }
        </>
    )
}

export default BaseModal