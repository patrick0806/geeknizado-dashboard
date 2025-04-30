/* import React, { useRef } from "react";
import { Label } from "@/components/ui/label";

interface ProductImagesFormProps {
  images: File[];
  setImages: (files: File[]) => void;
}

export function ImagesUploader({ images, setImages }: ProductImagesFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    setImages([...images, ...files]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    setImages([...images, ...files]);
  };

  const moveImage = (from: number, to: number) => {
    const arr = [...images];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    setImages(arr);
  };

  const removeImage = (idx: number) => {
    setImages(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <Label>Imagens do Produto</Label>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed rounded p-4 text-center cursor-pointer  mb-2"
        onClick={() => inputRef.current?.click()}
      >
        Arraste e solte as imagens aqui ou clique para selecionar
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      {images.length > 0 && (
        <ul className="flex flex-row gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <li key={idx.toString()} className="relative group">
              <img
                src={URL.createObjectURL(img)}
                alt="preview"
                className="w-24 h-24 object-cover rounded shadow"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 group-hover:opacity-100"
              >
                &times;
              </button>
              <div className="flex justify-between mt-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveImage(idx, idx - 1)}
                  className="text-xs px-2 py-1 bg-gray-50 rounded text-black disabled:opacity-50"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={idx === images.length - 1}
                  onClick={() => moveImage(idx, idx + 1)}
                  className="text-xs px-2 py-1 bg-gray-50 text-black rounded disabled:opacity-50"
                >
                  ↓
                </button>
              </div>
              <div className="absolute bottom-1 left-1 text-xs bg-black bg-opacity-60 text-white px-2 py-0.5 rounded">
                {idx + 1}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
 */

import { Label } from "@/components/ui/label";
import { UnifiedImage } from "./ImageForm";
import { useRef } from "react";

interface ImagesUploaderProps {
  images: UnifiedImage[];
  setImages: (images: UnifiedImage[]) => void;
}

export function ImagesUploader({ images, setImages }: ImagesUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    const newImages: UnifiedImage[] = files.map((file, i) => ({
      file,
      type: "new",
      position: images.length + i + 1,
    }));
    setImages([...images, ...newImages]);
  };

  const removeImage = (idx: number) => {
    const updated = [...images];
    updated.splice(idx, 1);
    setImages(updated.map((img, i) => ({ ...img, position: i })));
  };

  const moveImage = (from: number, to: number) => {
    const arr = [...images];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    setImages(arr.map((img, i) => ({ ...img, position: i + 1 })));
  };

  return (
    <div className="space-y-4">
      <Label>Imagens do Produto</Label>
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed rounded p-4 text-center cursor-pointer mb-2"
      >
        Arraste e solte as imagens aqui ou clique para selecionar
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {images.length > 0 && (
        <ul className="flex gap-2 overflow-x-auto">
          {images.map((img, idx) => (
            <li
              key={img.id ?? img.file?.name ?? idx}
              className="relative group"
            >
              <img
                src={img.url ?? URL.createObjectURL(img.file!)}
                alt="preview"
                className="w-24 h-24 object-cover rounded shadow"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                &times;
              </button>
              <div className="flex justify-between mt-1">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => moveImage(idx, idx - 1)}
                  className="text-sm px-2 py-1 bg-gray-50 text-black rounded disabled:opacity-50"
                >
                  ↑
                </button>
                <button
                  type="button"
                  disabled={idx === images.length - 1}
                  onClick={() => moveImage(idx, idx + 1)}
                  className="text-sm px-2 py-1 bg-gray-50 text-black rounded disabled:opacity-50"
                >
                  ↓
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
