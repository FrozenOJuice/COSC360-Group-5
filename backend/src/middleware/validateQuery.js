import { appError } from "../utils/appError.js";
import { mapIssuesToDetails } from "./validationDetails.js";

export function validateQuery(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            return next(appError(
                "INVALID_REQUEST",
                "Invalid query parameters",
                mapIssuesToDetails(result.error.issues, "query")
            ));
        }

        req.validatedQuery = result.data;
        next();
    };
}
