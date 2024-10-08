import React from 'react'

const Colors = ({ colors , deleteColor}) => {
  return (
    <div>
      {colors.length > 0 && <h1 className='capitalize my-2'>Colors List</h1>}
      {colors.length > 0 && (
        <div className='flex flex-wrap -mx-1'>
          {colors.map((color) => (
            <div key={color.id} className='p-1'>
              <div className='w-[30px] h-[30px] rounded-full cursor-pointer' style={{ background: color.color }} onClick={() => deleteColor(color)}></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default Colors