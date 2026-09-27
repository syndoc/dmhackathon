import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, AlertCircle, Sparkles, Layers, ShieldCheck, Play } from 'lucide-react';
import { UploadedImage } from '../types';

interface LandingUploadProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  onRunXRay: () => void;
  onLoadSample: () => void;
}

export const LandingUpload: React.FC<LandingUploadProps> = ({
  images,
  onImagesChange,
  onRunXRay,
  onLoadSample,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMsg(null);

    const validFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) {
      setErrorMsg('Please upload valid image files (PNG, JPG, WebP, etc.).');
      return;
    }

    const newImages: UploadedImage[] = [...images];
    let processed = 0;

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        newImages.push({
          id: `upload-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          dataUrl: dataUrl,
          size: file.size,
        });
        processed++;
        if (processed === validFiles.length) {
          // Cap at 6 images if user adds too many
          const capped = newImages.slice(0, 6);
          onImagesChange(capped);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onImagesChange(images.filter((img) => img.id !== id));
  };

  const isReadyToRun = images.length >= 2;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      {/* Hero Header */}
      <div className="text-center mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono-tech tracking-wider uppercase mb-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Multimodal Team Topology Intelligence</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight text-white">
          SOCIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500">X-RAY</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto">
          See the connections hiding inside your meetings.
        </p>

        <p className="text-xs md:text-sm text-slate-400 font-normal max-w-xl mx-auto">
          Upload 2–4 screenshots from Google Meet, Zoom, or Teams. Social X-Ray reconstructs observable speaking turns, collaboration vectors, and interaction topology.
        </p>
      </div>

      {/* Main Upload Dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`relative group rounded-3xl border-2 border-dashed p-8 md:p-12 text-center transition-all duration-300 cursor-pointer overflow-hidden ${
          isDragging
            ? 'border-cyan-400 bg-cyan-950/30 shadow-[0_0_30px_rgba(6,182,212,0.3)]'
            : 'border-slate-800 hover:border-cyan-500/50 bg-slate-900/40 hover:bg-slate-900/60 shadow-[0_0_20px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Subtle decorative grid effect inside dropzone */}
        <div className="absolute inset-0 xray-grid opacity-30 pointer-events-none" />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Center Scanner Reticle Icon */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center rounded-2xl bg-cyan-950/60 border border-cyan-500/30 group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
          <Upload className="w-9 h-9 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
        </div>

        <h3 className="text-xl font-display font-semibold text-white mb-2">
          Drop 2–4 meeting screenshots here
        </h3>
        <p className="text-sm text-slate-400 mb-4 max-w-md mx-auto">
          Select multiple sequential frames to capture conversation flow, active speaker halos, and visual reactions.
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-mono-tech text-cyan-300 group-hover:border-cyan-500/40 transition-colors">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Click to browse images or drag files directly</span>
        </div>
      </div>

      {/* Error Feedback */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-xl bg-red-950/40 border border-red-500/40 flex items-center gap-3 text-red-300 text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Thumbnails of Uploaded Images */}
      {images.length > 0 && (
        <div className="mt-8 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-tech text-slate-400 px-1">
            <span className="text-cyan-300 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              {images.length} SCREENSHOT{images.length > 1 ? 'S' : ''} STAGED ({images.length < 2 ? 'Need at least 2' : images.length <= 4 ? 'Optimal range' : 'Ready'})
            </span>
            <button
              onClick={() => onImagesChange([])}
              className="text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="group relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-slate-900/60 aspect-video shadow-lg"
              >
                <img
                  src={img.dataUrl}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                
                {/* Image Badge */}
                <div className="absolute bottom-2 left-2 text-[10px] font-mono-tech text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/30">
                  IMAGE 0{index + 1}
                </div>

                {/* Remove Button */}
                <button
                  onClick={(e) => removeImage(img.id, e)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center opacity-80 hover:opacity-100 transition-all cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {images.length < 4 && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-2xl border-2 border-dashed border-slate-800 hover:border-cyan-500/40 bg-slate-900/20 hover:bg-slate-900/40 flex flex-col items-center justify-center p-4 text-slate-500 hover:text-cyan-300 transition-all cursor-pointer aspect-video"
              >
                <Upload className="w-5 h-5 mb-1" />
                <span className="text-[11px] font-mono-tech">+ Add Screenshot</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Primary Action Area: Run X-Ray & Sample Meeting Option */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={onRunXRay}
          disabled={!isReadyToRun}
          className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-display font-bold text-base tracking-wide flex items-center justify-center gap-3 transition-all duration-300 cursor-pointer shadow-xl ${
            isReadyToRun
              ? 'bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-600 text-slate-950 hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] hover:scale-[1.02] active:scale-[0.98]'
              : 'bg-slate-800 text-slate-500 border border-slate-700/60 cursor-not-allowed opacity-60'
          }`}
        >
          <span className="text-xl">🔬</span>
          <span>RUN SOCIAL X-RAY</span>
          {isReadyToRun && (
            <span className="px-2 py-0.5 text-xs rounded bg-slate-950/20 text-slate-900 font-mono-tech">
              {images.length} SCREENSHOTS
            </span>
          )}
        </button>

        <button
          onClick={onLoadSample}
          className="w-full sm:w-auto px-6 py-4 rounded-2xl font-display font-medium text-sm text-cyan-300 bg-slate-900/70 hover:bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer shadow-md"
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Demo with Sample Meeting (4 Screenshots)</span>
        </button>
      </div>

      {/* Safety & Framing Notice */}
      <div className="mt-12 text-center border-t border-slate-900 pt-6">
        <p className="text-xs text-slate-400 max-w-lg mx-auto flex items-center justify-center gap-1.5 font-light">
          <ShieldCheck className="w-4 h-4 text-cyan-400/80 shrink-0" />
          <span>
            Social X-Ray models observable meeting dynamics (speaking turns, handoffs, and aligned reactions). It does not determine actual personal feelings.
          </span>
        </p>
      </div>
    </div>
  );
};
