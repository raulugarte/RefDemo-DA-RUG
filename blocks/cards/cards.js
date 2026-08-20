/*
import { patternDecorate } from '../../scripts/blockTemplate.js';

export default async function decorate(block) {
  patternDecorate(block);
}
*/

import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    // last cell is the dedicated variant slot - always drop it, whether or not it's filled
    if (row.children.length > 1) {
      const styleCell = row.lastElementChild;
      const style = styleCell.querySelector('p')?.textContent;
      if (style) li.className = style;
      styleCell.remove();
    }

    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      const hasPicture = div.querySelector('picture');
      if (div.children.length === 1 && hasPicture) {
        div.className = 'cards-card-image';
      } else if (div.textContent.trim() || hasPicture) {
        div.className = 'cards-card-body';
      } else {
        // empty placeholder cell (e.g. unused image column) - drop instead of rendering a blank box
        div.remove();
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
