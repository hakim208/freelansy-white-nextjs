import React from 'react'

const SkeletonCard = () => {
    return (
        <div>
            <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm animate-pulse">
                <div className="h-6 bg-gray-300 rounded mb-2 w-1/2"></div>
                <div className="h-6 bg-gray-300 rounded mb-2 w-1/3"></div>
                <div className="h-4 bg-gray-300 rounded mb-4 w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 ml-auto"></div>
            </div>
        </div>
    )
}

export default SkeletonCard
