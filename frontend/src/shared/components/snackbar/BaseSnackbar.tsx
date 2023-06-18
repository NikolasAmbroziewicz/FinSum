import { useEffect } from 'react'

import H4 from "../headers/H4";

import { useScreen } from "src/shared/hooks/useScreen"

import { Position } from "../headers/Header.types";
import { SnackbarType } from './type'

import { AiOutlineClose } from 'react-icons/ai';

interface IBaseSnackbar {
  message: string,
  onClick: () => void,
  type: SnackbarType
}

const BaseSnackbar: React.FC<IBaseSnackbar> = ({ message, onClick, type }) => {
  const { isMobileScreen } = useScreen()

  useEffect(() => {
    setTimeout(() => {
      onClick()
    }, 2000) 
  }, []) 

  const snackbar = () => {
    return isMobileScreen() ?  'right-0 bottom-0 w-[calc(100vw_-_2rem)] m-4 p-4': 'right-7 bottom-7 py-4 px-6'
  }

  const snackbarColor = (type: SnackbarType) => {
    switch(type) {
      case SnackbarType.danger:
        return 'border-red-600 bg-red-100'
      case SnackbarType.neutral:
        return 'border-sky-600 bg-sky-100'
      case SnackbarType.success:
        return 'border-teal-600 bg-teal-100'
    }
  }

  return (
    <div className={`absolute flex justify-end items-center ${snackbar()} ${snackbarColor(type)}  border-[2px] rounded text-sm`}>
      <H4 position={Position.left} styles="w-full">{message}</H4>
      <button onClick={onClick}>
        <AiOutlineClose className="cursor-pointer ml-3 text-xl"/>
      </button>
    </div>
  )
}

export default BaseSnackbar