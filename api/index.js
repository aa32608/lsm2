import { createServer } from '../server.js'

export default async function handler(req, res) {
  const app = await createServer()
  app(req, res)
}
