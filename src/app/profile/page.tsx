import ProtectedRoute from '@/components/protectedRoute/protectedRoute'
import React from 'react'

const Profile = () => {
    return (
        <ProtectedRoute>
            <div className='pt-[100px] w-[80%] m-auto '>
                Profile
            </div>
        </ProtectedRoute>
    )
}

export default Profile
