import { type ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface ScreenshotFrameProps {
  src?: string;
  alt: string;
  label: string;
  children?: ReactNode;
  aspectRatio?: string;
  onZoomChange?: (isZoomed: boolean) => void;
}

export const ScreenshotFrame = ({
  src,
  alt,
  label,
  aspectRatio = "aspect-[16/10]",
  onZoomChange,
}: ScreenshotFrameProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    onZoomChange?.(isZoomed);
  }, [isZoomed, onZoomChange]);

  useEffect(() => {
    if (!isZoomed) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsZoomed(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isZoomed]);

  return (
    <>
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
            <button
              type="button"
              onClick={() => setIsZoomed(true)}
              className="flex h-full w-full items-center justify-center bg-white p-4 md:p-5"
              aria-label={`Open ${label} screenshot`}
            >
              <img
                src={src}
                alt={alt}
                className="block max-h-full max-w-full h-auto w-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />
            </button>
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
        {src ? (
          <div className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-slate-950/72 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            Click to zoom
          </div>
        ) : null}
      </div>

      {src && isZoomed
        ? createPortal(
            <div
              className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/88 p-4 md:p-8"
              onClick={() => setIsZoomed(false)}
              role="dialog"
              aria-modal="true"
              aria-label={`${label} enlarged screenshot`}
            >
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
                aria-label="Close image preview"
              >
                Close
              </button>
              <div
                className="flex max-h-full max-w-full items-center justify-center"
                onClick={(event) => event.stopPropagation()}
              >
                <img
                  src={src}
                  alt={alt}
                  className="block max-h-[88vh] max-w-[92vw] h-auto w-auto rounded-xl shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};
