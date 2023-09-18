"use client"

import React, { FC } from 'react'
import { ArrowLeftIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface PostMenuPageProps {

}

const PostMenuPage: FC<PostMenuPageProps> = ({ }) => {
    return (
        <div>
            <div className='inline-flex items-center gap-2 cursor-pointer hover:text-primary'>
                <ArrowLeftIcon className='w-7 h-7' />
                <span className='text-2xl font-semibold'>Post a Menu</span>
            </div>

            <div className='my-5'>
                <div className='text-lg font-semibold'>Basic Information</div>
                <div className='text-gray-400'>List out your top perks and benefits</div>
            </div>

            <Separator />
        </div>
    )
}

export default PostMenuPage