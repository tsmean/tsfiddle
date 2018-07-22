import { ErrorObject, ErrorCode } from "../error.codes";
import { StatusCode } from "./status-codes";

export function standardErrorHandler(err, res) {
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