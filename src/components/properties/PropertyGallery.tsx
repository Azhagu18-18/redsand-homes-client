"use client";

import { useState } from "react";
import Image from "next/image";

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

export default function PropertyGallery({
  images,
  title,
}: PropertyGalleryProps) {
  const gallery =
    images && images.length > 0
      ? images
      : ["/images/property-placeholder.jpg"];

  const [selectedImage, setSelectedImage] = useState(gallery[0]);

  return (
    <section className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
      </div>

      {/* Thumbnail Gallery */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {gallery.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`
                relative
                aspect-[4/3]
                overflow-hidden
                rounded-xl
                border-2
                transition-all
                duration-300
                ${
                  selectedImage === image
                    ? "border-orange-500"
                    : "border-white/10 hover:border-orange-400"
                }
              `}
            >
              <Image
                src={image}
                alt={`${title} ${index + 1}`}
                fill
                className="object-cover"
                sizes="200px"
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}