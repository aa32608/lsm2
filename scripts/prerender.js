import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(toAbsolute('../dist/index.html'), 'utf-8');

// Save template for SSR usage (clean shell)
fs.writeFileSync(toAbsolute('../dist/template.html'), template);
console.log('✅ Saved dist/template.html for SSR');

(async () => {
  try {
    // 1. Fetch data
    console.log('Fetching listings for prerender...');
    const response = await fetch('https://tetovo-lms-default-rtdb.europe-west1.firebasedatabase.app/listings.json');
    const data = await response.json();
    
    // Convert object to array (Firebase returns object with keys)
    const listings = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
    // Filter visible/verified if needed, or just pass all valid ones
    const validListings = listings.filter(l => l.status === 'active' || l.status === 'verified' || !l.status); // Adjust based on your data model
    
    const initialData = {
      listings: validListings,
      publicListings: validListings
    };

    console.log(`Fetched ${validListings.length} listings.`);

    // 2. Load server entry
    const { render } = await import('../dist-server/entry-server.js');

    // 3. Render
    const url = '/'; // Prerender home page
    const { html, helmet } = render(url, {}, initialData);
    
    console.log(`Rendered HTML length: ${html.length}`);

    // 4. Inject into template
    const helmetTitle = helmet.title ? helmet.title.toString() : '';
    const helmetMeta = helmet.meta ? helmet.meta.toString() : '';
    const helmetLink = helmet.link ? helmet.link.toString() : '';
    const helmetScript = helmet.script ? helmet.script.toString() : '';

    let htmlWithHelmet = template;
    
    // Robust title replacement
    if (helmetTitle) {
      htmlWithHelmet = htmlWithHelmet.replace(/<title.*?>.*?<\/title>/s, helmetTitle);
    }
    
    htmlWithHelmet = htmlWithHelmet.replace(`</head>`, `${helmetMeta}${helmetLink}${helmetScript}</head>`);
    
    if (htmlWithHelmet.includes('<!--app-html-->')) {
        htmlWithHelmet = htmlWithHelmet.replace(`<!--app-html-->`, html);
        console.log('✅ App content injected');
    } else {
        console.warn('⚠️ <!--app-html--> placeholder not found in template!');
    }
    
    // Inject initial state for hydration
    const stateScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData).replace(/</g, '\\u003c')};</script>`;
    htmlWithHelmet = htmlWithHelmet.replace('</body>', `${stateScript}</body>`);
    
    // Remove dev scripts if present
    htmlWithHelmet = htmlWithHelmet.replace(/<script type="module" src="\/src\/main.jsx"><\/script>/g, '');

    // 5. Save
    const filePath = toAbsolute('../dist/index.html');
    fs.writeFileSync(filePath, htmlWithHelmet);
    console.log('Prerendered index.html saved.');

  } catch (e) {
    console.error('Prerender error:', e);
    process.exit(1);
  }
})();
