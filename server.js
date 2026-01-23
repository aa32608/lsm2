import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function createServer() {
  const app = express()

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  // Use vite's connect instance as middleware. If you use your own
  // express router (express.Router()), you should use router.use
  app.use(vite.middlewares)

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      // 1. Read index.html
      let template = fs.readFileSync(
        path.resolve(__dirname, 'index.html'),
        'utf-8'
      )

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template)

      // 3. Load the server entry. ssrLoadModule automatically transforms
      //    ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')

      // 4. render the app HTML. This assumes entry-server.jsx's exported
      //     `render` function calls ReactDOMServer.renderToString()
      const context = {}
      // TODO: Fetch data here based on URL (e.g. from Firebase Admin or API) and pass as initialData
      const initialData = { listings: [], publicListings: [] };
      
      const { html, helmet } = render(url, context, initialData)

      // 5. Inject the app-rendered HTML into the template.
      const helmetTitle = helmet.title ? helmet.title.toString() : ''
      const helmetMeta = helmet.meta ? helmet.meta.toString() : ''
      const helmetLink = helmet.link ? helmet.link.toString() : ''
      const helmetScript = helmet.script ? helmet.script.toString() : ''

      // Replace default title if helmet has one, otherwise keep default
      let htmlWithHelmet = template
      
      if (helmetTitle) {
        htmlWithHelmet = htmlWithHelmet.replace(/<title>.*?<\/title>/, helmetTitle)
      }
      
      // Inject other helmet tags before </head>
      htmlWithHelmet = htmlWithHelmet.replace(`</head>`, `${helmetMeta}${helmetLink}${helmetScript}</head>`)
      
      // Inject app HTML
      htmlWithHelmet = htmlWithHelmet.replace(`<!--app-html-->`, html)

      // 6. Send the rendered HTML back.
      res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithHelmet)
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back
      // to your actual source code.
      vite.ssrFixStacktrace(e)
      next(e)
    }
  })

  const PORT = process.env.PORT || 5173;
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`)
  })
}

createServer()
