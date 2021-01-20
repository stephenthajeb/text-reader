import { useState } from 'react'

export const useRange = (initialValue, min, max) => {
  const [value, setValue] = useState(initialValue)
  const onChange = (e) => {
    setValue(e.target.value)
  }
  return { value: value, onChange: onChange, min: min, max: max }
}
