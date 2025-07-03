import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import React from 'react'

const CreateOrder = () => {
  return (
    <ProtectedRoute>
      <div className='pt-[100px]'>
        create-order
      </div>
    </ProtectedRoute>
  )
}

export default CreateOrder
