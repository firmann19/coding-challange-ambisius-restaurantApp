"use client"

import { useRouter } from 'next/navigation'
import React, { FC } from 'react'

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({ }) => {
    const router = useRouter()

    return (
        <div className='pb-3 mb-8 border-b border-border flex flex-row items-center justify-between'>
            <div>
                <div>Company</div>
                <div className='font-semibold'>FoodParadise</div>
            </div>
        </div>
    )
}

export default Header