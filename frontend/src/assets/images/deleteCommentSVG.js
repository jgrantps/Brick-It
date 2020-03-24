import React from 'react'

const DeleteComment = ({
    fill="#212121",
    xmlns="http://www.w3.org/2000/svg", 
    viewBox="0 0 59 59",
    dataOriginal="212121",
   //  classname= "active-path",
    height="20",
    // viewBox="0 0 24 24",
    width="20",
    id,
    onClick

}) => (
   <svg
   id = {id}
   onClick={onClick}
   xmlns = {xmlns}
   viewBox= {viewBox}
   height={height} 
//    viewBox={viewBox} 
   width={width}
   className="pointer-events-none"
>
<path d="M29.5 51a1 1 0 001-1V17a1 1 0 10-2 0v33a1 1 0 001 1zM19.5 51a1 1 0 001-1V17a1 1 0 10-2 0v33a1 1 0 001 1zM39.5 51a1 1 0 001-1V17a1 1 0 10-2 0v33a1 1 0 001 1z"
fill={fill} 
data-original={dataOriginal}
className= "trashcan" 
/>
<path d="M52.5 6H38.456c-.11-1.25-.495-3.358-1.813-4.711C35.809.434 34.751 0 33.499 0H23.5c-1.252 0-2.31.434-3.144 1.289C19.038 2.642 18.653 4.75 18.543 6H6.5a1 1 0 100 2h2.041l1.915 46.021C10.493 55.743 11.565 59 15.364 59h28.272c3.799 0 4.871-3.257 4.907-4.958L50.459 8H52.5a1 1 0 100-2zM21.792 2.681C22.24 2.223 22.799 2 23.5 2h9.999c.701 0 1.26.223 1.708.681.805.823 1.128 2.271 1.24 3.319H20.553c.112-1.048.435-2.496 1.239-3.319zm24.752 51.298C46.538 54.288 46.4 57 43.636 57H15.364c-2.734 0-2.898-2.717-2.909-3.042L10.542 8h37.915l-1.913 45.979z"
fill={fill} 
data-original={dataOriginal} 
className= "active-path"
/>
</svg>
)

export default DeleteComment