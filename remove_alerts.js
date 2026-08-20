const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const targetDir = 'src/app/dashboard';
const searchStr = " onClick={() => alert('Fitur interaktif ini akan diaktifkan setelah database terhubung (Simulasi Mockup)')}";
const searchStr2 = " onClick={(e) => { e.preventDefault(); alert('Fitur interaktif ini akan diaktifkan setelah database terhubung (Simulasi Mockup)'); }}";

walkDir(targetDir, function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace the exact string with empty space
    content = content.replace(/ onClick=\{\(\) => alert\('Fitur interaktif ini akan diaktifkan setelah database terhubung \(Simulasi Mockup\)'\)\}/g, "");
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Removed mock alert from: ' + filePath);
    }
  }
});
