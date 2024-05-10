import React, { useState, useRef, useEffect } from 'react'

const Range = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [min, setMinABS] = useState(0);
  const [max, setMaxABS] = useState(0);
  const activeThumb = useRef(null);
  const rangeRef = useRef();


  useEffect( ()=> {
    async function fetchData(){
      const response = await fetch("http://demo0848443.mockable.io/getvalues")
      const data = await response.json()
      setMinABS(data.min)
      setMinValue(data.min)
      setMaxABS(data.max)
      setMaxValue(data.max)
    }
    fetchData()
    
  },[]);

  const handleMouseDown = (event, thumb) => {
    event.preventDefault()
    activeThumb.current = thumb
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const getPositionFromEvent = (event) => {
    const range = rangeRef.current
    const rect = range.getBoundingClientRect()
    const rangeWidth = range.clientWidth
    const mouseX = event.clientX - rect.left
    return ((mouseX / rangeWidth) * (max - min) + min)
  }

  const handleMouseMove = (event) => {
    let newValue = getPositionFromEvent(event)
    
    if (activeThumb.current === 'min' && newValue >= maxValue) {
      newValue = maxValue
    } else if (activeThumb.current === 'max' && newValue <= minValue) {
      newValue = minValue
    }

    if (newValue <= min)
      newValue = min
    if (newValue >= max)
      newValue = max

    if (activeThumb.current === 'min') {
      setMinValue(newValue.toFixed(2))
    } else {
      setMaxValue(newValue.toFixed(2))
    }
  }

  const handleMouseUp = () => {
    activeThumb.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const fixedInput = (event) => {
    let newValue = parseInt(event.target.value)
    if (isNaN(newValue)) return 0

    if (newValue <= min)
      return min
    if (newValue >= max)
      return max

    return newValue.toFixed(2)
  }

  const handleInputChangeMin = (event) => {
    setMinValue(fixedInput(event))
  }

  const handleInputChangeMax = (event) => {
    setMaxValue(fixedInput(event))
  }

  return (

    <div className="rangeContainer">
      <div className="range">
        <div
          className="thumb min"
          data-testid="thumb min"
          style={{ left: `${minValue}%` }}
          onMouseDown={event => handleMouseDown(event, 'min')}
        ></div>
        <div className="bar" data-testid="bar" ref={rangeRef}></div>
        <div
          className="thumb max"
          data-testid="thumb max"
          style={{ left: `${maxValue}%` }}
          onMouseDown={event => handleMouseDown(event, 'max')}
        ></div>
      </div>
      <div className='values'>
        <input
          type="number" className="min-value" data-testid="min-value" value={minValue} onChange={event => handleInputChangeMin(event)}></input>
        <input
          type="number" className="max-value" data-testid="max-value" value={maxValue} onChange={event => handleInputChangeMax(event)}></input>
      </div>
    </div>
  )
}

export default Range;
