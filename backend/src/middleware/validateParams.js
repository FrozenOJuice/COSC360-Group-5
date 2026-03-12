import { appError } from "../utils/appError.js";
import { mapIssuesToDetails } from "./validationDetails.js";

export function validateParams(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.params);

        if (!result.success) {
            return next(appError(
                "INVALID_REQUEST",
                "Invalid route parameters",
                mapIssuesToDetails(result.error.issues, "params")
            ));
        }

        req.params = result.data;
        next();
    };
}
