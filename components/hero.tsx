'use client'
import React from 'react'
import {motion} from 'motion/react'
import Button from './new-button'
import Link from 'next/link'






export default function Hero(){
    return (
        <div  className='h-screen relative w-full'>
            <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{backgroundImage: "url('https://i.imgur.com/4dv2uOA.png')"}}
>
                <div className='absolute inset-0 bg-black/40'></div>
            </div>
            <div className='relative h-full flex flex-col justify-center items-center'>
            <motion.h1
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1}}
            className='text-background text-6xl font-bold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-12'>
                Gjovana&apos;s Luxury Villas
            </motion.h1>
            <motion.p
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 1.5}}
            className='text-background text-2xl text-center top-1/2 mt-82 mb-10'>
                Exclusive villas with charming views <br/>
                The villa of you dreams <br/>
                Priority dates tailored for you <br/>
                Make your dream getaway a reality
            </motion.p>
            <Link href='/properties'>
            <Button/>
            </Link>
            </div>
        </div>
    )

}