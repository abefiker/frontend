'use client';

import { useState } from 'react';
import { useEdgeStore } from '@/app/lib/edgestore';
import { FileState } from '@/app/components/MultiImageDropzone';

export function useImageUploader() {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const { edgestore } = useEdgeStore();

  function updateFileProgress(key: string, progress: FileState['progress']) {
    setFileStates((prevStates) => {
      const newStates = structuredClone(prevStates);
      const fileState = newStates.find((state) => state.key === key);
      if (fileState) {
        fileState.progress = progress;
      }
      return newStates;
    });
  }

  async function handleFileUpload(addedFiles: FileState[]) {
    setFileStates((prev) => [...prev, ...addedFiles]);

    const uploadedImages = await Promise.all(
      addedFiles.map(async (fileState) => {
        try {
          const res = await edgestore.myPublicImages.upload({
            file: fileState.file,
            onProgressChange: async (progress: number) => {
              updateFileProgress(fileState.key, progress);
              if (progress === 100) {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                updateFileProgress(fileState.key, 'COMPLETE');
              }
            },
          });

          return res.url;
        } catch (err) {
          updateFileProgress(fileState.key, 'ERROR');
          return null;
        }
      })
    );

    // Filter out null values (failed uploads)
    const validUrls = uploadedImages.filter((url): url is string => url !== null);
    setUploadedUrls((prev) => [...prev, ...validUrls]);
    // No need to return anything here
  }
  return { fileStates, handleFileUpload, uploadedUrls };
}
