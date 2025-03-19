'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface ImageUploadPreviewProps {
  value: { file: File; preview: string }[];
  onChange: (files: { file: File; preview: string }[]) => void;
  maxFiles?: number;
}

export function ImageUploadPreview({
  value = [],
  onChange,
  maxFiles = 5,
}: ImageUploadPreviewProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      const combinedFiles = [...value, ...newFiles].slice(0, maxFiles);
      onChange(combinedFiles);
    },
    [value, onChange, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: maxFiles - value.length,
    disabled: value.length >= maxFiles,
  });

  const removeImage = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const reorderImages = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(value);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange(items);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-primary bg-primary/10'
            : 'border-muted-foreground/25 hover:border-primary'
        )}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Solte as imagens aqui...</p>
        ) : (
          <p>
            Arraste e solte imagens aqui, ou clique para selecionar
            {value.length > 0 && ` (${maxFiles - value.length} restantes)`}
          </p>
        )}
      </div>

      {value.length > 0 && (
        <DragDropContext onDragEnd={reorderImages}>
          <Droppable droppableId="images" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              >
                {value.map((item, index) => (
                  <Draggable
                    key={item.preview}
                    draggableId={item.preview}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="group relative aspect-square"
                      >
                        <img
                          src={item.preview}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full rounded-lg object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute -right-2 -top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {index === 0 && (
                          <span className="absolute left-2 top-2 rounded-md bg-primary/80 px-2 py-1 text-xs font-medium text-primary-foreground">
                            Miniatura
                          </span>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
