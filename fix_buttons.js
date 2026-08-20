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

walkDir(targetDir, function(filePath) {
  if (filePath.endsWith('page.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file has buttons without onClick
    // Negative lookahead to ensure onClick doesn't exist anywhere before the closing >
    const buttonRegex = /<button(?![^>]*onClick)([^>]*)>/g;
    
    if (buttonRegex.test(content)) {
      // Add 'use client' if not present
      if (!content.includes("'use client'") && !content.includes('"use client"')) {
        content = "'use client';\n" + content;
      }
      
      // Replace buttons
      content = content.replace(buttonRegex, "<button onClick={() => alert('Fitur interaktif ini akan diaktifkan setelah database terhubung (Simulasi Mockup)')} $1>");
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
