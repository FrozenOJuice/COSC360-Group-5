import {
    clearSeekerProfilePicture,
    createSeekerProfile,
    findSeekerProfileByUserId,
    setSeekerProfilePicture,
    updateSeekerProfile,
} from "../repositories/seekerProfileRepository.js";
import { appError } from "../utils/appError.js";
import {
    assertCanReadProfile,
    getProfileOwnerId,
    getProfileVisibility,
} from "./profileAccess.js";

function normalizeSeekerProfile(profile) {
    const ownerId = getProfileOwnerId(profile);

    return {
        id: profile.id ?? String(profile._id),
        userId: ownerId,
        visibility: getProfileVisibility(profile),
        bio: typeof profile.bio === "string" ? profile.bio : "",
        jobExperience: Array.isArray(profile.jobExperience) ? profile.jobExperience : [],
        education: Array.isArray(profile.education) ? profile.education : [],
        currentPosition: typeof profile.currentPosition === "string" ? profile.currentPosition : "",
        profilePicture: profile.hasUploadedProfilePicture && ownerId
            ? `/api/seeker-profile/${ownerId}/picture`
            : "/default-profile.png",
        phone: typeof profile.phone === "string" ? profile.phone : "",
        resumeLink: typeof profile.resumeLink === "string" && profile.resumeLink
            ? profile.resumeLink
            : "#",
    };
}

export async function createInitialSeekerProfile(userId, options = {}) {
    return createSeekerProfile({
        userId,
        visibility: "private",
    }, options);
}

export async function getCurrentSeekerProfile(userId) {
    const profile = await findSeekerProfileByUserId(userId);
    if (!profile) {
        throw appError("NOT_FOUND", "Profile not found");
    }

    return normalizeSeekerProfile(profile);
}

export async function updateCurrentSeekerProfile(userId, profileData) {
    const safeProfileData = { ...(profileData || {}) };
    delete safeProfileData.userId;
    delete safeProfileData._id;

    const existingProfile = await findSeekerProfileByUserId(userId);
    if (!existingProfile) {
        throw appError("NOT_FOUND", "Profile not found");
    }

    const profile = await updateSeekerProfile(existingProfile._id, safeProfileData);
    return normalizeSeekerProfile(profile);
}

export async function setCurrentSeekerProfilePicture(userId, file) {
    const existingProfile = await findSeekerProfileByUserId(userId);
    if (!existingProfile) {
        throw appError("NOT_FOUND", "Profile not found");
    }

    const profile = await setSeekerProfilePicture(existingProfile._id, {
        buffer: file.buffer,
        contentType: file.mimetype,
    });

    return normalizeSeekerProfile(profile);
}

export async function removeCurrentSeekerProfilePicture(userId) {
    const existingProfile = await findSeekerProfileByUserId(userId);
    if (!existingProfile) {
        throw appError("NOT_FOUND", "Profile not found");
    }

    const profile = await clearSeekerProfilePicture(existingProfile._id);
    return normalizeSeekerProfile(profile);
}

function resolveProfilePicturePayload(profile) {
    if (!profile?.profilePictureData || !profile?.profilePictureContentType) {
        throw appError("NOT_FOUND", "Profile picture not found");
    }

    return {
        data: profile.profilePictureData,
        contentType: profile.profilePictureContentType,
    };
}

export async function getCurrentSeekerProfilePicture(userId) {
    const profile = await findSeekerProfileByUserId(userId, { includeImageData: true });
    if (!profile) {
        throw appError("NOT_FOUND", "Profile not found");
    }

    return resolveProfilePicturePayload(profile);
}

export async function getVisibleSeekerProfile(targetUserId, viewer) {
    const profile = await findSeekerProfileByUserId(targetUserId);
    if (!profile) {
        throw appError("NOT_FOUND", "Profile not found");
    }

    assertCanReadProfile(profile, viewer);
    return normalizeSeekerProfile(profile);
}

export async function getSeekerProfilePicture(targetUserId, viewer) {
    const profile = await findSeekerProfileByUserId(targetUserId, { includeImageData: true });
    if (!profile) {
        throw appError("NOT_FOUND", "Profile not found");
    }

    assertCanReadProfile(profile, viewer);
    return resolveProfilePicturePayload(profile);
}
