import React, { useState, useRef, useEffect } from 'react'

const Range2 = () => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [values, setValues] = useState([]);
  const activeThumb = useRef(null);
  const rangeRef = useRef();


  useEffect( ()=> {
    async function fetchData(){
      const response = await fetch("http://demo0848443.mockable.io/rangeValues")
      const data = await response.json()
      setMaxValue(data.rangeValues.length - 1)
      setValues(data.rangeValues)

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
    const gap = 100/(values.length -1)

    return ( ((mouseX / rangeWidth) * 100)/gap)
  }

  const handleMouseMove = (event) => {
    let newValue = getPositionFromEvent(event)

    if (activeThumb.current === 'min') {
        if (newValue > maxValue)
            newValue = maxValue
        setMinValue(Math.floor(newValue))
    } else {
        if (newValue < minValue)
            newValue = minValue
        setMaxValue(Math.floor(newValue))
    }
  }

  const handleMouseUp = () => {
    activeThumb.current = null
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (

    <div className="rangeContainer">
      <div className="range">
        <div
          className="thumb min"
          style={{ left: `${(minValue * (100/ (values.length -1 )))-1}%` }}
          onMouseDown={event => handleMouseDown(event, 'min')}
        ></div>
        <div className="bar" ref={rangeRef}></div>
        <div
          className="thumb max"
          style={{ left: `${Math.min((maxValue * (100/ (values.length -1 )))+1, 100)}%` }}
          onMouseDown={event => handleMouseDown(event, 'max')}
        ></div>
      </div>
      <div className='values'>
        <p className="min-value">{values[minValue]}</p>
        <p className="max-value">{values[maxValue]}</p>
      </div>
    </div>
  )
}

export default Range2;
