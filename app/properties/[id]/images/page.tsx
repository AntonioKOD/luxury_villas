// app/properties/[id]/images/page.tsx
import { getPropertyById } from "@/actions";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PropertyImage {
  category: string;
  image: { url: string; alt: string };
}

interface Property {
  images: PropertyImage[];
}

interface RawImageItem {
  category?: string;
  image?: { url?: string; alt?: string };
}

export default async function ImagesPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const rawProperty = await getPropertyById(id);
  const property: Property | null = rawProperty && Array.isArray(rawProperty.images)
    ? {
        ...rawProperty,
        images: (rawProperty.images as RawImageItem[]).map((image) => ({
          category: image.category || "unknown",
          image: {
            url: image.image?.url || "",
            alt: image.image?.alt || "No description",
          },
        })),
      }
    : null;

  if (!property) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Property not found.</p>
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
        {property.images.map((item: PropertyImage) => (
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
            unoptimized
              src={item.image.url}
              alt={item.image.alt}
              width={400}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}