import fs from 'fs';
fetch('https://girassolagricola.com.br/')
  .then(res => res.text())
  .then(text => {
    fs.writeFileSync('page.html', text);
    console.log('done');
  });
