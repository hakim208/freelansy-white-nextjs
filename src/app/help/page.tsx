import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import React from 'react'

const Help = () => {
  return (
    <ProtectedRoute>
      <div className='pt-[100px] '>
        Help
      </div>
    </ProtectedRoute>
  )
}

export default Help
