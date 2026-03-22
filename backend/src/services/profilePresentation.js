import { getProfileOwnerId, getProfileVisibility } from "./profileAccess.js";

export function normalizeOptionalString(value, fallback = "") {
    return typeof value === "string" ? value : fallback;
}

export function normalizeStringArray(value) {
    return Array.isArray(value) ? value : [];
}

export function createBaseProfilePayload(profile) {
    const ownerId = getProfileOwnerId(profile);

    return {
        id: profile.id ?? String(profile._id),
        userId: ownerId,
        visibility: getProfileVisibility(profile),
    };
}

export function buildProfileAssetUrl({ profile, hasUploadedAsset, assetPath, fallback = "/default-profile.png", }) {
    const ownerId = getProfileOwnerId(profile);

    if (!hasUploadedAsset || !ownerId) {
        return fallback;
    }

    return assetPath(ownerId);
}
