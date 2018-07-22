import { transpileTypescript } from '../../services/transpile.service';
import { Endpoint } from '../endpoints';

export function registerTranspileTypescript(app) {
  app.post(Endpoint.COMPILE, async (req: any, res) => {
    try {
      res.send(await transpileTypescript(req.body.input))
    } catch (err) {
      res.status(500).send(err);
    }
  });
}
