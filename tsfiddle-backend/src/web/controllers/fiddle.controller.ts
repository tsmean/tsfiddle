import { Endpoint } from "../endpoints";
import { StatusCode } from "../status-codes";
import { getFiddle, createFiddle } from "../../services/fiddle.service";

export function registerFiddleCRUD(app) {
  app.get(`${Endpoint.FIDDLE}/:id`, async (req: any, res) => {
    try {
      res.send(await getFiddle(req.params.id))
    } catch (err) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err);
    }
  });
  app.post(Endpoint.FIDDLE, async (req: any, res) => {
    try {
      res.send(await createFiddle(req.body.content))
    } catch (err) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err);
    }
  });
}
