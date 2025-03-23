import React from 'react'

export const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-700 text-yellow-400 py-2'>
      <div className="logo">
        <span className='font-bold text-x1 mx-8 font-rubikVinyl text-3xl'>Task</span>
      </div>
      <ul className='flex gap-7 mx-9 font-rubikVinyl text-xl'>
        <li className='cursor-pointer hover:font-bold'>home</li>
        <li className='cursor-pointer hover:font-bold'>your tasks</li>
      </ul>
         </nav>
  )
}
