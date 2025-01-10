type ImageModalProps = {
  id: string;
}

export function ImageModal({ id }: ImageModalProps) {
  return (
    <div 
      id={id} 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden"
      data-action="close-modal"
    >
      <button
        className="fixed left-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 z-[60]"
        data-action="prev-image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="fixed right-4 top-1/2 -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 z-[60]"
        data-action="next-image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      <div 
        className="max-w-[95vw] h-[95vh] p-2 flex items-center justify-center relative" 
        data-action="modal-content"
      >
        <button
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          data-action="close-modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <img 
          id="modalImage"
          src="" 
          alt="Selected work" 
          className="max-w-full max-h-full object-contain rounded-lg"
        />
        <div id="modalCaption" className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
          <span id="modalCaptionText"></span>
          <a
            id="modalCaptionLink"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <div id="modalCaption2" className="absolute bottom-16 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
          <span id="modalCaptionText2"></span>
          <a
            id="modalCaptionLink2"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
