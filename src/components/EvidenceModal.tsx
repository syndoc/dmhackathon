import React from 'react';
import { UploadedImage } from '../types';
import { X, Layers, ShieldCheck, Check } from 'lucide-react';

interface EvidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: UploadedImage[];
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({
  isOpen,
  onClose,
  images,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#090d16] border border-cyan-500/40 rounded-3xl p-6 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-display font-bold text-white">
                Source Meeting Evidence ({images.length} Screenshots)
              </h3>
              <p className="text-xs text-slate-400 font-mono-tech">
                All unique participants were matched and deduplicated across these raw inputs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Image Grid */}
        <div className="my-5 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((img, idx) => (
            <div
              key={img.id || idx}
              className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 shadow-md group"
            >
              <img
                src={img.dataUrl}
                alt={`Evidence screenshot ${idx + 1}`}
                className="w-full aspect-video object-cover"
              />
              <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono-tech">
                <span className="text-cyan-300 font-semibold">Evidence #{idx + 1}</span>
                <span className="text-slate-400 truncate max-w-[180px]">{img.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono-tech text-slate-400">
          <div className="flex items-center gap-1.5 text-cyan-300/80">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Cross-image identity matching &amp; deduplication verified</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
