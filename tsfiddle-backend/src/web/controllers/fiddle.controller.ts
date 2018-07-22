import { Endpoint } from "../endpoints";
import { StatusCode } from "../status-codes";
import { getFiddle, createFiddle } from "../../services/fiddle.service";
import { ErrorObject, ErrorCode } from "../../error.codes";

export function registerFiddleCRUD(app) {
  app.get(`${Endpoint.FIDDLE}/:id`, async (req: any, res) => {
    try {
      res.send(await getFiddle(req.params.id));
    } catch (err) {
      if (err instanceof ErrorObject) {
        if (err.error === ErrorCode.NOT_FOUND) {
          res.status(StatusCode.NOT_FOUND).send(err);
        } else {
          res.status(StatusCode.INTERNAL_SERVER_ERROR).send(err);
        }
      } else {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send(new ErrorObject(ErrorCode.GENERIC))
      }
    }
  });
  app.post(Endpoint.FIDDLE, async (req: any, res) => {
    try {
      res.send(await createFiddle(req.body.content))
    } catch (err) {
      res.status(StatusCode.INTERNAL_SERVER_ERROR).send();
    }
  });
}
