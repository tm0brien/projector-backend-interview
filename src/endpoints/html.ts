import fs from 'fs'
import { Request, Response } from 'express'

const html = (app, path) => (req: Request, res: Response) => {
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(500)
        } else {
            res.set('Content-Type', 'text/html')
            res.write(data.toString('utf8'))
        }
        res.end()
    })
}

export default html
