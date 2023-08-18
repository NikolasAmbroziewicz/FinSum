import { useState, ChangeEvent, useEffect } from 'react'

import { useCryptoSearchApi } from '../api/CryptoSearchApi'
import { SearchCryptoOptions } from '../types'

import debounce from 'lodash.debounce'

export const useSearchCrypto = () => {
  const [menuOpen, setMenuOpen] =useState(false)
  const [inputValue, setInputValue] = useState<string>('')
  const [cryptoOptions, setCryptoOptions] = useState<SearchCryptoOptions[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { search_crypto_options } = useCryptoSearchApi()

  const handleSearchCrypto = async (value: string) => {
    setLoading(true)
    const res = await search_crypto_options(value)

    if (res.length === 0 || value === '') {
      setMenuOpen(false)
    } else {
      setMenuOpen(true)
    }
    
    setLoading(false)
    setCryptoOptions(res)
  }

  const handleInput = (event: ChangeEvent) => {
    setInputValue((event.target as HTMLInputElement).value)
    debouncedChangeHandler((event.target as HTMLInputElement).value)
  }

  const debouncedChangeHandler = debounce(handleSearchCrypto, 300)

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    }
  }, [])

  return {
    cryptoOptions,
    handleInput,
    menuOpen,
    setInputValue,
    setMenuOpen,
    inputValue,
    loading
  }
}
