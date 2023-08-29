import React from 'react'

const Input = (props) => {
  return (
    <div className='flex flex-col w-full gap-1 '>
        <p className='ml-1 text-left '>{props.placeholder}</p>
        <input 
        type={props.type} 
        className=' px-3 py-2 rounded-md w-full outline-none caret-[#00fa00] font-[200]' 
        
        placeholder={props.placeholder} 
        onChange={props.onChange}
        value={props.value}
        required
        


        />
    </div>
  )
}

export default Input