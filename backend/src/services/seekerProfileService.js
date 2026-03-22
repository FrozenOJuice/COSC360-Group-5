import {
    clearSeekerProfilePicture,
    createSeekerProfile,
    findSeekerProfileByUserId,
    setSeekerProfilePicture,
    updateSeekerProfile,
} from "../repositories/seekerProfileRepository.js";
import { buildProfileAssetUrl, createBaseProfilePayload, normalizeOptionalString, normalizeStringArray, } from "./profilePresentation.js";
import { createProfileService } from "./profileServiceFactory.js";

function normalizeSeekerProfile(profile) {
    return {
        ...createBaseProfilePayload(profile),
        bio: normalizeOptionalString(profile.bio),
        jobExperience: normalizeStringArray(profile.jobExperience),
        education: normalizeStringArray(profile.education),
        currentPosition: normalizeOptionalString(profile.currentPosition),
        profilePicture: buildProfileAssetUrl({
            profile,
            hasUploadedAsset: profile.hasUploadedProfilePicture,
            assetPath: (ownerId) => `/api/seeker-profile/${ownerId}/picture`,
        }),
        phone: normalizeOptionalString(profile.phone),
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

const seekerProfileService = createProfileService({
    clearProfileMedia: clearSeekerProfilePicture,
    findProfileByUserId: findSeekerProfileByUserId,
    mediaContentTypeField: "profilePictureContentType",
    mediaDataField: "profilePictureData",
    mediaNotFoundMessage: "Profile picture not found",
    normalizeProfile: normalizeSeekerProfile,
    profileNotFoundMessage: "Profile not found",
    setProfileMedia: setSeekerProfilePicture,
    updateProfile: updateSeekerProfile,
});

export const {
    getCurrentProfile: getCurrentSeekerProfile,
    updateCurrentProfile: updateCurrentSeekerProfile,
    setCurrentProfileMedia: setCurrentSeekerProfilePicture,
    removeCurrentProfileMedia: removeCurrentSeekerProfilePicture,
    getCurrentProfileMedia: getCurrentSeekerProfilePicture,
    getVisibleProfile: getVisibleSeekerProfile,
    getProfileMedia: getSeekerProfilePicture,
} = seekerProfileService;
