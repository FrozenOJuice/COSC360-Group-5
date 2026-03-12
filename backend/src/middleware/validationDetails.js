export function mapIssuesToDetails(issues, fallbackField) {
    return issues.flatMap((issue) => {
        if (issue.code === "unrecognized_keys" && Array.isArray(issue.keys)) {
            return issue.keys.map((key) => ({
                field: key,
                message: "Unknown field",
            }));
        }

        return [{
            field: issue.path.length ? issue.path.join(".") : fallbackField,
            message: issue.message,
        }];
    });
}
