/*
 * Key Figures Block
 * Compact static stat box (label/value rows) - no live data source
 */

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.className = 'key-figures-list';

  [...block.children].forEach((row, index) => {
    const [labelCell, valueCell] = [...row.children];

    const li = document.createElement('li');
    li.className = 'key-figures-item';
    if (index === 0) li.classList.add('key-figures-highlight');

    const dt = document.createElement('span');
    dt.className = 'key-figures-label';
    dt.append(...labelCell.childNodes);

    const dd = document.createElement('span');
    dd.className = 'key-figures-value';
    dd.append(...valueCell.childNodes);

    li.append(dt, dd);
    ul.append(li);
  });

  block.textContent = '';
  block.append(ul);
}
