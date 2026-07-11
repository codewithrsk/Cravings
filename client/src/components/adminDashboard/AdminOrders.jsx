import React from 'react'

const AdminOrders = () => {
  return (
   <>
    <div>Orders </div>
    <div className='bg-amber-50 w-fit m-7 text-2xl underline p-3'>Admin Orders</div>  
    <div className='grid grid-cols-2 gap-4 m-7'>  
     < div className='bg-amber-100 p-4 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-2'>Total Orders</h2>
        <p className='text-gray-700'>100</p>  
      </div>
      <div className='bg-amber-100 p-4 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-2'>Pending Orders</h2>
        <p className='text-gray-700'>10</p>
      </div>
    </div>
    </>
  )
}

export default AdminOrders