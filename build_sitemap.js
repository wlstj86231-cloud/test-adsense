const fs = require('fs');
const path = require('path');

const projectDir = __dirname;
let urls = [];
const baseUrl = 'https://occultworldcup.com';

function formatDate(date) {
    return date.toISOString().split('T')[0];
}

function priorityFor(relPath) {
    if (relPath === 'index.html') return '1.0';
    if (relPath === 'review-readiness.html' || relPath === 'about.html' || relPath === 'contact.html') return '0.8';
    if (relPath === 'field-notes/index.html') return '0.9';
    if (relPath.startsWith('field-notes/')) return '0.75';
    if (relPath.startsWith('mysteries/')) return '0.8';
    return '0.7';
}

function changefreqFor(relPath) {
    if (relPath === 'index.html' || relPath === 'review-readiness.html') return 'weekly';
    if (relPath.startsWith('field-notes/')) return 'monthly';
    if (relPath.startsWith('mysteries/') || relPath.startsWith('blog/')) return 'monthly';
    return 'monthly';
}

function walkDir(dir) {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            if (!filePath.includes('.vscode') && !filePath.includes('.idx') && !filePath.includes('.git') && !filePath.includes('node_modules')) {
                walkDir(filePath);
            }
        } else if (file.endsWith('.html')) {
            const relPath = path.relative(projectDir, filePath).replace(/\\/g, '/');
            const lastmod = formatDate(stat.mtime);
            const priority = priorityFor(relPath);
            const changefreq = changefreqFor(relPath);
            if (relPath === 'index.html') {
                urls.push(`<url><loc>${baseUrl}/</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);
            } else {
                urls.push(`<url><loc>${baseUrl}/${relPath}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`);
            }
        }
    });
}
walkDir(projectDir);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.join('\n  ')}
</urlset>`;

fs.writeFileSync(path.join(projectDir, 'sitemap.xml'), sitemap);
console.log('Sitemap built with ' + urls.length + ' URLs.');
