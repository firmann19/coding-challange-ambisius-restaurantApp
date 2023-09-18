"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation';
import React, { FC } from 'react'
import { AiOutlineHome ,AiOutlineShop, AiOutlineSnippets } from "react-icons/ai";
import { BsBasket ,BsDoorOpen } from "react-icons/bs";

interface SidebarProps {

}

const Sidebar: FC<SidebarProps> = ({ }) => {
    const router = useRouter()

    const navMenu = () => router.push('/menu')


    return (
        <div className='pb-12 min-h-screen'>
            <div className='space-y-4 py-4'>
                <div className='px-3 py-2'>
                    <h2 className='mb-2 px-4 text-lg font-semibold'>
                        Dashboard
                    </h2>
                    <div className='space-y-3'>
                        <Button variant={"ghost"} className='w-full justify-start rounded-none  hover:text-primary'>
                            <AiOutlineHome className="mr-2 text-lg" />
                            Home
                        </Button>
                        <Button variant={"ghost"} onClick={navMenu} className='w-full justify-start rounded-none hover:text-primary'>
                            <AiOutlineShop className="mr-2 text-lg" />
                            Menu
                        </Button>
                        <Button variant={"ghost"} className='w-full justify-start rounded-none hover:text-primary'>
                            <AiOutlineSnippets className="mr-2 text-lg" />
                            Order
                        </Button>
                        <Button variant={"ghost"} className='w-full justify-start rounded-none hover:text-primary'>
                            <BsDoorOpen className="mr-2 text-lg" />
                            Dapur
                        </Button>
                        <Button variant={"ghost"} className='w-full justify-start rounded-none hover:text-primary'>
                            <BsBasket className="mr-2 text-lg" />
                            Kasir
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar