import { type ReactNode } from 'react';

interface ScreenshotFrameProps {
  src?: string;
  alt: string;
  label: string;
  children?: ReactNode;
  aspectRatio?: string;
}

export const ScreenshotFrame = ({ src, alt, label, aspectRatio = "aspect-[16/10]" }: ScreenshotFrameProps) => {
  return (
    <div className={`w-full ${aspectRatio} bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col group relative`}>
      {/* Browser Chrome */}
      <div className="h-10 border-b border-slate-100 flex items-center px-4 bg-slate-50 justify-between shrink-0">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{label}</div>
        <div className="w-10" />
      </div>
      
      {/* Image Content */}
      <div className="flex-1 bg-white relative overflow-hidden">
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-contain" />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-slate-100/50">
            <div className="w-16 h-16 rounded-full bg-slate-200 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-500 mb-2">Screenshot Placeholder</p>
            <p className="text-xs text-slate-400 max-w-xs">{alt}</p>
          </div>
        )}
      </div>

      {/* Hover Instruction */}
      <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/5 transition-colors pointer-events-none" />
    </div>
  );
};
