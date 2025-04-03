'use client'

import useSWR from 'swr';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const fetcher = (url: string) =>
  fetch(url, { credentials: 'include' }).then(res => res.json());

export default function ImagesContent() {
  const pathname = usePathname();
  const id = pathname.split('/')[2];

  // Use SWR with suspense: true so it throws a promise while loading
  const { data: property } = useSWR(
    id ? `/api/properties/${id}` : null,
    fetcher,
    { suspense: true }
  );

  // Check if the API returned an error
  if (property?.errors) {
    return (
      <div className="text-center p-4">
        <p>Error loading property: {property.errors[0].message}</p>
      </div>
    );
  }

  // Ensure that the images array exists and is an array
  if (!property?.images || !Array.isArray(property.images)) {
    return (
      <div className="text-center p-4">
        <p>No images available.</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href={`/properties/${id}`}
        className="text-black text-2xl text-center flex gap-2 mt-6 -mb-12 mx-3"
      >
        <ArrowLeft className="mt-1" /> Go back
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
  );
}