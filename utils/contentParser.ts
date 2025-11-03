/**
 * Parses a string for BBCode-style image links and converts them to HTML.
 * Specifically targets: [URL=...][IMG]...[/IMG][/URL]
 * @param text The input string to parse.
 * @returns An HTML string with BBCode replaced by anchor and image tags.
 */
export const parseBBCodeToHTML = (text: string): string => {
  if (!text) return '';

  const bbCodeRegex = /\[URL=([^\]]+)\]\[IMG\]([^\]]+)\[\/IMG\]\[\/URL\]/g;
  
  return text.replace(bbCodeRegex, (match, url, imgSrc) => {
    // Add classes for styling and standard accessibility/security attributes.
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="block my-8 no-underline border-none">
              <img src="${imgSrc}" alt="Embedded content" class="w-auto h-auto max-w-full rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300" />
            </a>`;
  });
};
