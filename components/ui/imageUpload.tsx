"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Trash } from "lucide-react";

import * as LR from "@uploadcare/blocks";
import { UploadCtxProvider } from "@uploadcare/blocks";

import { Button } from "@/components/ui/button";

LR.registerBlocks(LR);

interface ImageUploadProps {
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onRemove,
  onChange,
  value,
}) => {
  const ctxProviderRef = useRef<
    typeof UploadCtxProvider.prototype & UploadCtxProvider
  >(null);

  useEffect(() => {
    const handleUpload = (e: any) => {
      onChange(e.detail.fileInfo.cdnUrl);
    };
    ctxProviderRef.current?.addEventListener(
      "file-upload-success",
      handleUpload
    );
  }, [onChange]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
          >
            <div className="absolute z-10 top-2 right-2">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                variant="ghost"
                size="icon"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Employee image"
              src={url}
            />
          </div>
        ))}
      </div>

      <lr-config
        ctx-name="my-uploader"
        pubkey="6004d2fc99eba8f3c184"
        max-local-file-size-bytes="10000000"
        multiple={false}
        img-only="true"
        source-list="local, url, dropbox"
      />

      {/* <lr-file-uploader-regular
        css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css"
        ctx-name="my-uploader"
        class="my-config"
      /> */}
      <lr-file-uploader-minimal
        css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-minimal.min.css"
        ctx-name="my-uploader"
        class="my-config"
      />

      <lr-upload-ctx-provider ref={ctxProviderRef} ctx-name="my-uploader" />
    </div>
  );
};
