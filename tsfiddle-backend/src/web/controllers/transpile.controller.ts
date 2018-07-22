import { transpileTypescript } from '../../services/transpile.service';

export function registerTranspileTypescript(app) {
  app.post('/api/compile', async (req: any, res) => {
    try {
      res.send(await transpileTypescript(req.body.input))
    } catch (err) {
      res.status(500).send(err);
    }
  });
}
