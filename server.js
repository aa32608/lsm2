import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProduction = process.env.NODE_ENV === 'production'
const PORT = process.env.PORT || 5173

async function createServer() {
  const app = express()

  let vite
  if (!isProduction) {
    // Dev: Create Vite server
    const { createServer: createViteServer } = await import('vite')
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom'
    })
    app.use(vite.middlewares)
  } else {
    // Prod: Serve static files
    // serve assets from dist/client/assets
    app.use('/assets', express.static(path.resolve(__dirname, 'dist/assets'), {
      maxAge: '1y',
      immutable: true
    }))
    // serve other static files from dist/client
    app.use(express.static(path.resolve(__dirname, 'dist'), {
      index: false // disable default index.html serving, we handle it manually
    }))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template, render
      
      if (!isProduction) {
        // Dev: Read from source and use vite transform
        template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        // Prod: Read from built dist
        try {
          // Try template.html first (clean shell saved by prerender)
          template = fs.readFileSync(path.resolve(__dirname, 'dist/template.html'), 'utf-8')
        } catch (e) {
          // Fallback to index.html
          template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8')
        }
        
        // In prod, we don't need vite transform as it's already built
        // Import the built server entry
        render = (await import('./dist-server/entry-server.js')).render
      }

      const context = {}
      // TODO: Fetch data here based on URL if needed
      const initialData = { listings: [], publicListings: [] };
      
      const { html, helmet } = render(url, context, initialData)

      // Inject Helmet
      const helmetTitle = helmet.title ? helmet.title.toString() : ''
      const helmetMeta = helmet.meta ? helmet.meta.toString() : ''
      const helmetLink = helmet.link ? helmet.link.toString() : ''
      const helmetScript = helmet.script ? helmet.script.toString() : ''

      let htmlWithHelmet = template
      
      if (helmetTitle) {
        // Replace title safely
        htmlWithHelmet = htmlWithHelmet.replace(/<title.*?>.*?<\/title>/s, helmetTitle)
      }
      
      htmlWithHelmet = htmlWithHelmet.replace(`</head>`, `${helmetMeta}${helmetLink}${helmetScript}</head>`)
      
      // Inject App HTML
      htmlWithHelmet = htmlWithHelmet.replace(`<!--app-html-->`, html)
      
      // Inject Initial Data State for Hydration
      const dataScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}</script>`
      htmlWithHelmet = htmlWithHelmet.replace(`</body>`, `${dataScript}</body>`)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithHelmet)
    } catch (e) {
      if (!isProduction) {
        vite.ssrFixStacktrace(e)
      }
      console.error(e)
      next(e)
    }
  })

  return app
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createServer().then(app => {
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`)
    })
  })
}

export { createServer }
