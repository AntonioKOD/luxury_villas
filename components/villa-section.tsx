/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { getProperties } from '@/actions';
import { JsonObject, TypeWithID } from 'payload';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

// Helper function to extract plain text from rich text JSON
function extractPlainText(richTextContent: any): string {
  let plainText = '';

  function traverse(node: any) {
    if (node.text) {
      plainText += node.text + ' ';
    }
    if (node.children && Array.isArray(node.children)) {
      node.children.forEach(traverse);
    }
  }

  if (richTextContent?.root) {
    traverse(richTextContent.root);
  }

  return plainText.trim();
}

// Helper function to limit the number of words in a string
function limitWords(text: string, wordLimit: number): string {
  const words = text.split(/\s+/);
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return text;
}

export default function Villas() {
  const [properties, setProperties] = useState<(JsonObject & TypeWithID)[]>([]);

  useEffect(() => {
    getProperties().then((properties) => setProperties(properties));
  }, []);

  return (
    <div className="relative max-w-full  py-12">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-center text-gray-800 mb-12"
        >
          Two Unique Villas, One Unforgettable Island
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {properties.map((property) => (
            <Card key={property.id} className="max-w-full overflow-hidden shadow-lg my-4 rounded-lg bg-white">
              {property.images && property.images.length > 0 && (
                <CardHeader className="relative w-full h-48">
                  <Image
                    unoptimized
                    src={property.images[0].image.url}
                    alt={property.name}
                    layout="fill"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </CardHeader>
              )}
              <CardContent className="p-6">
                <CardTitle className="text-3xl text-gray-900 font-semibold">
                  {property.name}
                </CardTitle>
                <p className="mt-4 text-gray-700 text-lg">
                  {limitWords(extractPlainText(property.description), 50)}
                </p>
              </CardContent>
              <CardFooter className="p-4 bg-gray-100 flex justify-end">
                <Link href={`/properties/${property.id}`}>
                  <button className="px-6 py-2 bg-card-foreground text-background rounded transition-colors duration-300 hover:bg-primary">
                    View More Details
                  </button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}