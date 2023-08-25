import React from 'react'

const Input = (props) => {
  return (
    <div className=' w-full flex flex-col gap-1'>
        <p className=' text-left ml-1'>{props.placeholder}</p>
        <input 
        type={props.type} 
        className=' px-3 py-2 rounded-md outline-none caret-[#00fa00] font-[200]' 
        
        placeholder={props.placeholder} 
        onChange={props.onChange}
        value={props.value}
        required
        


        />
    </div>
  )
}

export default Input