/*
 * Link List Block
 * Heading + simple list of links, e.g. for audience/target-group navigation
 */

export default function decorate(block) {
  const [titleRow, ...linkRows] = [...block.children];

  if (titleRow) {
    const heading = document.createElement('p');
    heading.className = 'link-list-heading';
    heading.append(...titleRow.firstElementChild.childNodes);
    titleRow.replaceWith(heading);
  }

  const ul = document.createElement('ul');
  ul.className = 'link-list-links';
  linkRows.forEach((row) => {
    const [textCell, urlCell] = [...row.children];
    const href = urlCell?.querySelector('a')?.href || urlCell?.textContent.trim();
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = href || '#';
    a.append(...textCell.childNodes);
    li.append(a);
    ul.append(li);
    row.remove();
  });

  block.append(ul);
}
