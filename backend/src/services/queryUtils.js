export function toPositiveInt(value, fallback) {
    const parsed = Number.parseInt(value, 10);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function normalizeTextSearch(value, options = {}) {
    const search = typeof value === "string" ? value.trim() : "";
    const maxLength = Number.isInteger(options.maxLength) && options.maxLength > 0
        ? options.maxLength
        : 80;
    return search.slice(0, maxLength);
}

export function buildSearchRegex(normalizedSearch) {
    if (!normalizedSearch) return null;
    const escaped = normalizedSearch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(escaped, "i");
}
