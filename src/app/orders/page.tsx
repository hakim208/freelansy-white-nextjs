import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import React from 'react'

const Orders = () => {
  return (
    <ProtectedRoute>
      <div className='pt-[100px] '>
        Orders
      </div>
    </ProtectedRoute>
  )
}

export default Orders
