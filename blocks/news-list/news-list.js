/*
 * News List Block
 * Date badge + headline list, e.g. for a press/news feed
 */

export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.className = 'news-list-item';
    const [dateCell, textCell] = [...row.children];
    dateCell.className = 'news-list-date';
    textCell.className = 'news-list-text';
  });
}
