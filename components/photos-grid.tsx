'use client'
import React from 'react'
import { LayoutGrid } from './ui/layout-grid'
import firstImage from '@/public/first_image.jpg'
import secondImage from '@/public/second_image.jpg'
import thirdImage from '@/public/third_image.jpg'
import fourthImage from '@/public/fourth_image.jpg'

export function PhotosGrid() {
    return(
        <div className='h-screen relative w-full'>
            <LayoutGrid cards={cards}/>
            <div className='border-b-4 border-border mx-auto w-123'></div>
        </div>
    )
}


const cards = [
    {
    id: 1,
    content: '',
    className: 'md:col-span-2',
    thumbnail: firstImage.src,
    },
    {
    id: 2,
    content: '',
    className: 'md:col-span-1',
    thumbnail: secondImage.src,
    },
    {
    id: 3,
    content: '',
    className: 'md:col-span-1',
    thumbnail: thirdImage.src,
    },
    {
    id: 4,
    content: '',
    className: 'md:col-span-2',
    thumbnail: fourthImage.src,
    }


]