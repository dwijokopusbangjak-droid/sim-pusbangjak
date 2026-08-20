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
const targetStr = " onClick={() => alert('Fitur interaktif ini akan diaktifkan setelah database terhubung (Simulasi Mockup)')} ";

walkDir(targetDir, function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find <button ... type="submit" ... >
    // Because the string might be split across lines, let's use a regex that matches the button with type="submit"
    // Actually, simple regex to find buttons that have the targetStr AND type="submit"
    const regex = /<button\s+onClick=\{\(\) => alert\('Fitur interaktif ini akan diaktifkan setelah database terhubung \(Simulasi Mockup\)'\)\}\s+([^>]*type="submit"[^>]*)>/g;
    
    if (regex.test(content)) {
      content = content.replace(regex, "<button $1>");
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed submit button in: ' + filePath);
    }
    
    // Check if there are buttons where type="submit" is on the next line
    const regexMulti = /<button\s+onClick=\{\(\) => alert\('Fitur interaktif ini akan diaktifkan setelah database terhubung \(Simulasi Mockup\)'\)\}\s+([\s\S]*?type="submit"[\s\S]*?)>/g;
    if (regexMulti.test(content)) {
      content = content.replace(regexMulti, "<button $1>");
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed multiline submit button in: ' + filePath);
    }
  }
});
