import React from 'react'
import { useRange } from '../customHook'
import './Slider.css'

const Slider = ({ changeRate, rangeController }) => {
  // https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
  const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  }

  const onChangeHandler = (e) => {
    rangeController.onChange(e)
    // Change Rate
    changeRate()
    labelEffect()
  }

  const labelEffect = () => {
    const label = document.getElementById('range-label')
    const descLabel = document.getElementById('label-desc')
    if (label) {
      label.style.left = `${rangeController.value * (100 / 10) - 40 / 2}px`
      scale(rangeController.value, 0.25, 10, 1, -1)
    }
    label.style.visibility = 'visible'
    descLabel.style.visibility = 'hidden'
    setTimeout(() => {
      label.style.visibility = 'hidden'
      descLabel.style.visibility = 'visible'
    }, 800)
  }

  return (
    <div className="range-container">
      <input
        type="range"
        min="0.1"
        max="10"
        step="0.1"
        value={rangeController.value}
        onChange={(e) => onChangeHandler(e)}
      />
      <label id="range-label" htmlFor="range">
        {rangeController.value}
      </label>
      <label id="label-desc" htmlFor="range">
        speed
      </label>
    </div>
  )
}

export default Slider
