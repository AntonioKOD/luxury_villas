import {motion} from 'motion/react'
import { PhotosGrid } from './photos-grid'

export default function ContentSection() {
    return (
        <div className="relative max-w-full">
            <div className="text-center py-10">
                <motion.h2 
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1}}
                 className='text-5xl font-bold text-foreground'>
                   Experience Kefalonia
                </motion.h2>
                <motion.p
                initial={{opacity: 0, y: 100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 1.5}}
                 className='text-center text-3xl text-foreground mt-10 flex'>
                 Welcome to our exclusive luxury villas in Kefalonia, Greece. Nestled amidst the island&apos;s 
                 breathtaking landscapes, our two distinctive villsa offer unparalleled comfort, 
                 privacy, and elegance for your Mediterranean escape.   
                </motion.p>
            </div>
            <PhotosGrid/>
        </div>  
    )
}