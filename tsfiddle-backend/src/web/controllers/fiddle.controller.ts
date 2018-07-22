import { Endpoint } from "../endpoints";
import { getFiddle, createFiddle } from "../../services/fiddle.service";
import { standardErrorHandler } from "../error-handler";

export function registerFiddleCRUD(app) {
  app.get(`${Endpoint.FIDDLE}/:id`, async (req: any, res) => {
    try {
      res.send(await getFiddle(req.params.id));
    } catch (err) {
      standardErrorHandler(err, res);
    }
  });
  app.post(Endpoint.FIDDLE, async (req: any, res) => {
    try {
      res.send(await createFiddle(req.body.content))
    } catch (err) {
      standardErrorHandler(err, res);
    }
  });
}
