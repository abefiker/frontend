'use client';

import { useState } from "react";
import { useEdgeStore } from "../lib/edgestore";
import Link from "next/link";

export default function Upload() {
    const [file, setFile] = useState<File>();
    const [urls, setUrls] = useState<{ url: string; thumbnailUrl: string | null }>();
    const { edgestore } = useEdgeStore();
    const [progress, setProgress] = useState(0); // ✅ Fixed typo: "progess" → "progress"

    return (
        <div className="flex flex-col items-center m-6 gap-2">
            <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
            
            {/* Progress Bar */}
            <div className="h-[6px] w-44 border rounded overflow-hidden">
                <div
                    className="h-full bg-white transition-all duration-150"
                    style={{ width: `${progress}%` }} // ✅ Corrected progress state
                ></div>
            </div>

            <button
                type="button"
                className="bg-white text-black rounded px-2 hover:opacity-80"
                onClick={async () => {
                    if (file) {
                        const res = await edgestore.myPublicImages.upload({
                            file,
                            onProgressChange: (percentage) => { // ✅ Update progress dynamically
                                setProgress(percentage);
                            }
                        });
                        setUrls({ url: res.url, thumbnailUrl: res.thumbnailUrl });
                        setProgress(100); // ✅ Set to 100% on completion
                    }
                }}
            >
                Upload
            </button>

            {urls?.url && <Link href={urls.url} target="_blank">URL</Link>}
            {urls?.thumbnailUrl && <Link href={urls.thumbnailUrl} target="_blank">THUMBNAIL</Link>}
        </div>
    );
}
