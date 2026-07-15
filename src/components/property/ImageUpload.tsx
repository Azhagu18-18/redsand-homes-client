"use client";

import { useRef, useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import {
  HiOutlinePhoto,
  HiOutlineCloudArrowUp,
  HiOutlineXMark,
  HiOutlineStar,
} from "react-icons/hi2";

const MAX_IMAGES = 20;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

interface ImageItem {
  file: File;
  preview: string;
}

export default function ImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<ImageItem[]>([]);

  const [featuredImage, setFeaturedImage] = useState<number>(0);

  const [dragging, setDragging] = useState(false);

  const validateFiles = (files: File[]) => {
    const validFiles: File[] = [];

    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`${file.name} is not a supported image.`);
        continue;
      }

      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} exceeds 5MB.`);
        continue;
      }

      validFiles.push(file);
    }

    return validFiles;
  };

  const addImages = (files: File[]) => {
    const validFiles = validateFiles(files);

    const remaining = MAX_IMAGES - images.length;

    const selected = validFiles.slice(0, remaining);

    const mapped = selected.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...mapped]);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    addImages(Array.from(e.target.files));

    e.target.value = "";
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setDragging(false);

    addImages(Array.from(e.dataTransfer.files));
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);

    const updated = [...images];

    updated.splice(index, 1);

    setImages(updated);

    if (featuredImage >= updated.length) {
      setFeaturedImage(0);
    }
  };
    return (
    <div className="space-y-6">

      <div>

        <h2 className="flex items-center gap-2 text-2xl font-bold text-white">

          <HiOutlinePhoto className="text-orange-400" />

          Property Images

        </h2>

        <p className="mt-2 text-sm text-gray-400">

          Upload high-quality images.
          Maximum 20 images.
          JPG, PNG & WEBP only.

        </p>

      </div>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`
          cursor-pointer
          rounded-3xl
          border-2
          border-dashed
          p-12
          transition-all
          duration-300
          ${
            dragging
              ? "border-orange-500 bg-orange-500/10"
              : "border-white/10 bg-black/30 hover:border-orange-500/60"
          }
        `}
      >

        <div className="flex flex-col items-center justify-center">

          <HiOutlineCloudArrowUp className="mb-5 h-16 w-16 text-orange-400" />

          <h3 className="text-xl font-semibold text-white">

            Drag & Drop Images

          </h3>

          <p className="mt-2 text-center text-gray-400">

            or click anywhere to browse files

          </p>

          <div className="mt-6 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white">

            Choose Images

          </div>

        </div>

      </div>

      <input
        ref={inputRef}
        multiple
        hidden
        type="file"
        accept="image/*"
        onChange={handleInput}
      />
            {/* Image Count */}

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-400">
          {images.length} / {MAX_IMAGES} images selected
        </p>

        {images.length > 0 && (
          <p className="text-sm text-orange-400">
            Click ⭐ to set Featured Image
          </p>
        )}

      </div>

      {/* Preview Grid */}

      {images.length > 0 && (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {images.map((image, index) => (

            <div
              key={image.preview}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111]"
            >

              {/* Preview */}

              <div className="relative aspect-[4/3]">

                <Image
                  src={image.preview}
                  alt={`Property ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover transition duration-300 group-hover:scale-105"
                />

              </div>

              {/* Featured Badge */}

              {featuredImage === index && (

                <div className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">

                  Featured

                </div>

              )}

              {/* Actions */}

              <div className="absolute right-3 top-3 flex gap-2">

                <button
                  type="button"
                  onClick={() => setFeaturedImage(index)}
                  className={`
                    rounded-full
                    p-2
                    backdrop-blur-md
                    transition
                    ${
                      featuredImage === index
                        ? "bg-orange-500 text-white"
                        : "bg-black/60 text-white hover:bg-orange-500"
                    }
                  `}
                >
                  <HiOutlineStar className="h-5 w-5" />
                </button>

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="rounded-full bg-red-500 p-2 text-white transition hover:bg-red-600"
                >
                  <HiOutlineXMark className="h-5 w-5" />
                </button>

              </div>

              {/* Footer */}

              <div className="border-t border-white/10 p-4">

                <p
                  className="truncate text-sm font-medium text-white"
                  title={image.file.name}
                >
                  {image.file.name}
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  {(image.file.size / 1024 / 1024).toFixed(2)} MB
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}