type Props = {
  children: string | JSX.Element | JSX.Element[];
  title?: string;
}

export function Layout({ children, title = 'My Portfolio & Blog' }: Props) {
  return (
    <html lang="ja">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="My portfolio and blog site" />
        <link href="/static/styles/globals.css" rel="stylesheet" />
        <title>{title}</title>
      </head>
      <body class="bg-white dark:bg-gray-900">
        <header class="border-b border-transparent absolute top-0 left-0 right-0 z-10">
          <nav class="container mx-auto px-4 py-6">
            <ul class="flex gap-6 text-white">
              <li><a href="/" class="hover:text-blue-300 transition-colors">Home</a></li>
              <li><a href="/blog" class="hover:text-blue-300 transition-colors">Blog</a></li>
              <li><a href="/works" class="hover:text-blue-300 transition-colors">Works</a></li>
            </ul>
          </nav>
        </header>

        <main class="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer class="border-t">
          <div class="container mx-auto px-4 py-4 text-center text-gray-600">
            © 2024 nike
          </div>
        </footer>

        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', () => {
              const galleryItems = document.querySelectorAll('.gallery-item');
              const modal = document.getElementById('imageModal');
              const modalImage = document.getElementById('modalImage');
              const modalCaptionText = document.getElementById('modalCaptionText');
              const modalCaptionLink = document.getElementById('modalCaptionLink');
              const modalCaptionText2 = document.getElementById('modalCaptionText2');
              const modalCaptionLink2 = document.getElementById('modalCaptionLink2');

              galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                  const src = item.getAttribute('data-src');
                  const caption = item.getAttribute('data-caption');
                  const url = item.getAttribute('data-url');
                  const caption2area = document.getElementById('modalCaption2');
                  const caption2 = item.getAttribute('data-caption2');
                  const url2 = item.getAttribute('data-url2');

                  if (modal && modalImage && modalCaptionText && modalCaptionLink) {
                    modalImage.setAttribute('src', src);
                    modalCaptionText.textContent = caption;
                    
                    if (url) {
                      modalCaptionLink.setAttribute('href', url);
                      modalCaptionLink.classList.remove('hidden');
                    } else {
                      modalCaptionLink.classList.add('hidden');
                    }
                    if (caption2) {
                      modalCaptionText2.textContent = caption2;
                      if (url2) {
                        modalCaptionLink2.setAttribute('href', url2);
                        modalCaptionLink2.classList.remove('hidden');
                        caption2area.classList.remove('hidden');
                      } else {
                        caption2area.classList.add('hidden');
                      }
                    } else {
                      caption2area.classList.add('hidden');
                    }
                    
                    modal.classList.remove('hidden');
                  }
                });
              });
            });
          `
        }} />
      </body>
    </html>
  )
}
