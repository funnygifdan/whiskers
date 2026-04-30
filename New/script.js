
let selectors = {};
let fileLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

document.getElementById('fileInput').addEventListener('change', function (e) {
  selectors = {};
  const files = Array.from(e.target.files);
  Promise.all(files.map(file => file.text().then(text => ({ name: file.name, content: text }))))
    .then(results => {
      results.forEach(({ name, content }, fileIndex) => {
        const fileLetter = fileLetters[fileIndex];
        const cleaned = content
          .replace(/\/\*[^]*?\*\//g, m => m.replace(/([^{]*\{[^}]*\})/g, '$1')) // Extract styles inside comments
          .replace(/\/\*[^]*?\*\//g, '') // Remove remaining full comments
          .replace(/\n+/g, '\n')
          .trim();

        const matches = [...cleaned.matchAll(/([^{]+)\{([^}]+)\}/g)];
        let position = 1;
        for (const match of matches) {
          const selector = match[1].trim();
          const props = match[2].trim().split(';').map(p => p.trim()).filter(p => p);
          const blockId = `${position}${fileLetter}`;
          if (!selectors[selector]) selectors[selector] = [];
          selectors[selector].push({ file: name, props, blockId });
          position++;
        }
      });
      renderSelectors();
    });
});

function renderSelectors() {
  const container = document.getElementById('output');
  container.innerHTML = '';
  for (const selector in selectors) {
    const entries = selectors[selector];
    entries.forEach((entry, i) => {
      const block = document.createElement('div');
      block.className = 'selector-block';

      const indexLabel = document.createElement('div');
      indexLabel.className = 'selector-index';
      indexLabel.textContent = entry.blockId;
      block.appendChild(indexLabel);

      const idLabel = document.createElement('div');
      idLabel.className = 'id-label';
      idLabel.textContent = `Block: ${entry.blockId}`;
      block.appendChild(idLabel);

      const selectorHeader = document.createElement('div');
      selectorHeader.className = 'selector-name';
      selectorHeader.textContent = selector;
      selectorHeader.onclick = () => {
        const blockLines = block.querySelectorAll(`.style-line[data-selector='${selector}']`);
        const anySelected = [...blockLines]
          .some(el => el.classList.contains('selected'));
        const shouldSelect = !anySelected;
        blockLines.forEach(el => el.classList.toggle('selected', shouldSelect));
        const foundBox = block.querySelector(`.id-box[data-selector='${selector}']`);
        if (foundBox) foundBox.classList.toggle('highlight-id', shouldSelect);
        updateOutput();
      };
      block.appendChild(selectorHeader);

      const foundBox = document.createElement('div');
      foundBox.className = 'id-box';
      foundBox.dataset.selector = selector;
      foundBox.textContent = "Found In: " + entries.map(e => e.blockId).join(', ');
      block.appendChild(foundBox);

      const fileTag = document.createElement('div');
      fileTag.className = 'file-name';
      fileTag.textContent = entry.file;
      block.appendChild(fileTag);

      const statusTag = document.createElement('div');
      statusTag.className = 'dup-status ' + (entries.length > 1 ? 'dup' : 'unique');
      statusTag.textContent = entries.length > 1 ? 'Found duplicates' : 'No known duplications';
      block.appendChild(statusTag);

      entry.props.forEach(prop => {
        const line = document.createElement('div');
        line.className = 'style-line';
        line.textContent = prop;
        line.dataset.selector = selector;
        line.dataset.prop = prop;
        line.onclick = () => {
          const selected = !line.classList.contains('selected');
          document.querySelectorAll(`.style-line[data-selector='${selector}'][data-prop='${prop}']`)
            .forEach(el => el.classList.toggle('selected', selected));
          document.querySelectorAll(`.id-box[data-selector='${selector}']`)
            .forEach(box => box.classList.toggle('highlight-id', selected));
          updateOutput();
        };
        block.appendChild(line);
      });

      container.appendChild(block);
    });
  }
}

function updateOutput() {
  const lines = {};
  document.querySelectorAll('.style-line.selected').forEach(line => {
    const sel = line.dataset.selector;
    if (!lines[sel]) lines[sel] = [];
    lines[sel].push("  " + line.dataset.prop + ";");
  });

  const out = Object.entries(lines).map(([sel, props]) =>
    sel + " {\n" + props.join("\n") + "\n}"
  ).join("\n\n");

  document.getElementById('selectedOutput').textContent = out;
}

function organizeStyles() {
  alert('Coming soon: organize grouped selectors by similarity across files!');
}
