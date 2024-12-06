type ImageModalProps = {
  id: string;
}

export function ImageModal({ id }: ImageModalProps) {
  return (
    <div 
      id={id} 
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 hidden"
      onclick="this.classList.add('hidden')"
    >
      <div 
        class="max-w-[95vw] h-[95vh] p-2 flex items-center justify-center relative" 
        onclick="event.stopPropagation()"
      >
        <button
          class="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75"
          onclick="this.closest('#imageModal').classList.add('hidden')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img 
          id="modalImage"
          src="" 
          alt="Selected work" 
          class="max-w-full max-h-full object-contain rounded-lg"
        />
        <div id="modalCaption" class="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
          <span id="modalCaptionText"></span>
          <a
            id="modalCaptionLink"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:text-blue-300 hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        <div id="modalCaption2" class="absolute bottom-16 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md flex items-center gap-2">
          <span id="modalCaptionText2"></span>
          <a
            id="modalCaptionLink2"
            href=""
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:text-blue-300 hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
