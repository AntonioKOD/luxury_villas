'use client'
import { usePathname } from "next/navigation"
import { getProperty } from "@/actions";
import { useEffect, useState } from "react";
import { JsonObject, TypeWithID } from "payload";
import Image from "next/image";
import Loader from "@/components/loader";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface Image {
    url: string
    alt: string
}


export default function Images(){
        const pathname = usePathname();
        const id = pathname.split('/')[2];
        const [property, setProperty] = useState<JsonObject & TypeWithID | null>(null)
       
        useEffect(() => {
            if (!id) return

            if (typeof id === 'string') {
                getProperty(id).then((property) => setProperty(property))
            }
        }, [id])
        if (!property) {
            return <div className="h-full w-full fixed"><Loader/></div>
        }
        
        
    return(
        <div>
            <Link href={`/properties/${id}`} className="text-black text-2xl text-center top-1/2 flex gap-2 mt-6 -mb-12 mx-3">
                <ArrowLeft className="mt-1"/> Go back
            </Link>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 py-20">
      {property.images.map(
        (item: { category: string; image: { url: string; alt: string } }) => (
          <div
            key={item.image.url}
            className="relative rounded overflow-hidden shadow-md"
          >
            {/* Category label on the top left */}
            <div className="absolute top-0 left-0 m-2 bg-foreground bg-opacity-50 px-3 py-1 rounded text-background capitalize">
              {item.category}
            </div>
            {/* Image */}
            <Image
              src={item.image.url}
              alt={item.image.alt}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )
      )}
    </div>
    </div>
    )
}