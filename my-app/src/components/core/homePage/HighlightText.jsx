import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span
    className="   pl-2
    font-bold
    bg-gradient-to-t
    from-caribbeangreen-5
    to-blue-200
    bg-clip-text
    text-transparent
    drop-shadow-[0_0_100px_#47A5C5]"
  >
    {text}
  </span>
  )
}

export default HighlightText;