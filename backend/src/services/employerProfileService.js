import {
    clearEmployerProfileLogo,
    createEmployerProfile,
    findEmployerProfileByUserId,
    setEmployerProfileLogo,
    updateEmployerProfile,
} from "../repositories/employerProfileRepository.js";
import { appError } from "../utils/appError.js";
import {
    assertCanReadProfile,
    getProfileOwnerId,
    getProfileVisibility,
} from "./profileAccess.js";

function normalizeEmployerProfile(profile) {
    const ownerId = getProfileOwnerId(profile);

    return {
        id: profile.id ?? String(profile._id),
        userId: ownerId,
        visibility: getProfileVisibility(profile),
        companyName: typeof profile.companyName === "string" ? profile.companyName : "",
        companyDescription: typeof profile.companyDescription === "string" ? profile.companyDescription : "",
        website: typeof profile.website === "string" ? profile.website : "",
        logo: profile.hasUploadedLogo && ownerId
            ? `/api/employer-profile/${ownerId}/logo`
            : "/default-profile.png",
        location: typeof profile.location === "string" ? profile.location : "",
        contactEmail: typeof profile.contactEmail === "string" ? profile.contactEmail : "",
        contactPhone: typeof profile.contactPhone === "string" ? profile.contactPhone : "",
    };
}

export async function createInitialEmployerProfile(user, options = {}) {
    return createEmployerProfile({
        userId: user._id ?? user.id,
        companyName: user.name,
        contactEmail: user.email,
        visibility: "private",
    }, options);
}

export async function getCurrentEmployerProfile(userId) {
    const profile = await findEmployerProfileByUserId(userId);
    if (!profile) {
        throw appError("NOT_FOUND", "Employer profile not found");
    }

    return normalizeEmployerProfile(profile);
}

export async function updateCurrentEmployerProfile(userId, profileData) {
    const safeProfileData = { ...(profileData || {}) };
    delete safeProfileData.userId;
    delete safeProfileData._id;

    const existingProfile = await findEmployerProfileByUserId(userId);
    if (!existingProfile) {
        throw appError("NOT_FOUND", "Employer profile not found");
    }

    const profile = await updateEmployerProfile(existingProfile._id, safeProfileData);
    return normalizeEmployerProfile(profile);
}

export async function setCurrentEmployerProfileLogo(userId, file) {
    const existingProfile = await findEmployerProfileByUserId(userId);
    if (!existingProfile) {
        throw appError("NOT_FOUND", "Employer profile not found");
    }

    const profile = await setEmployerProfileLogo(existingProfile._id, {
        buffer: file.buffer,
        contentType: file.mimetype,
    });

    return normalizeEmployerProfile(profile);
}

export async function removeCurrentEmployerProfileLogo(userId) {
    const existingProfile = await findEmployerProfileByUserId(userId);
    if (!existingProfile) {
        throw appError("NOT_FOUND", "Employer profile not found");
    }

    const profile = await clearEmployerProfileLogo(existingProfile._id);
    return normalizeEmployerProfile(profile);
}

function resolveEmployerLogoPayload(profile) {
    if (!profile?.logoData || !profile?.logoContentType) {
        throw appError("NOT_FOUND", "Employer logo not found");
    }

    return {
        data: profile.logoData,
        contentType: profile.logoContentType,
    };
}

export async function getCurrentEmployerProfileLogo(userId) {
    const profile = await findEmployerProfileByUserId(userId, { includeImageData: true });
    if (!profile) {
        throw appError("NOT_FOUND", "Employer profile not found");
    }

    return resolveEmployerLogoPayload(profile);
}

export async function getVisibleEmployerProfile(targetUserId, viewer) {
    const profile = await findEmployerProfileByUserId(targetUserId);
    if (!profile) {
        throw appError("NOT_FOUND", "Employer profile not found");
    }

    assertCanReadProfile(profile, viewer);
    return normalizeEmployerProfile(profile);
}

export async function getEmployerProfileLogo(targetUserId, viewer) {
    const profile = await findEmployerProfileByUserId(targetUserId, { includeImageData: true });
    if (!profile) {
        throw appError("NOT_FOUND", "Employer profile not found");
    }

    assertCanReadProfile(profile, viewer);
    return resolveEmployerLogoPayload(profile);
}
