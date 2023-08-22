import { useState } from 'react'

import BaseInput from 'src/shared/components/Input/base/BaseInput'
import Loading from 'src/shared/components/Loading/Loading'

import { useSearchCrypto } from '../hooks/useSearchCrypto'

import { SearchCryptoOptions } from '../types'
import { LoadingSize } from 'src/shared/components/Loading/types'

interface ISearchDropdownMenu {
  error: boolean,
  setName: (value: string) => void
  setTicker: (value: string) => void
}

const SearchCryptoDropdownMenu: React.FC<ISearchDropdownMenu> = ({ error, setName, setTicker }) => {
  const {
    cryptoOptions,
    handleInput,
    inputValue,
    menuOpen,
    setMenuOpen,
    setInputValue,
    loading
  } = useSearchCrypto()

  const handleClick = (value: SearchCryptoOptions) => {
    setInputValue(value.name)
    setName(value.name)
    setTicker(value.symbol)
    setMenuOpen(false)
  }

  return (
    <div className="relative">
      <BaseInput 
        id="search"
        value={inputValue}
        changeHandler={handleInput}
        placeholder='Crypto Currency'
        type='string'
        error={error}
      />
      {menuOpen && (
        <ul className="absolute w-full right-0 mt-2 rounded-md bg-white border-slate-300 border-[1px]" style={{ zIndex: 2 }}>
          {
            loading ? (
              <div className='p-2'>
                <Loading size={LoadingSize.small} />
              </div>
            ): (
              cryptoOptions.map((element) => (
                <li
                  key={element.id}
                  className="text-gray-700 block px-2 py-2 text-base cursor-pointer hover:bg-slate-100"
                  onClick={() => handleClick(element)}
                >
                  <div className='flex justify-between items-center'>
                    <span>{element.name}</span>
                    <div className='flex gap-2'>
                      <span className='py-1 px-2 bg-blue-100 rounded-sm'>Symbol: {element.symbol}</span>
                      <span className='py-1 px-2 bg-blue-100 rounded-sm'>Rank: {element.rank}</span>
                    </div>
                  </div>
                </li>
              ))
            )
          }
        </ul>
      )}
    </div>
  )
}

export default SearchCryptoDropdownMenu