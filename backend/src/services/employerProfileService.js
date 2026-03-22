import {
    clearEmployerProfileLogo,
    createEmployerProfile,
    findEmployerProfileByUserId,
    setEmployerProfileLogo,
    updateEmployerProfile,
} from "../repositories/employerProfileRepository.js";
import { buildProfileAssetUrl, createBaseProfilePayload, normalizeOptionalString, } from "./profilePresentation.js";
import { createProfileService } from "./profileServiceFactory.js";

function normalizeEmployerProfile(profile) {
    return {
        ...createBaseProfilePayload(profile),
        companyName: normalizeOptionalString(profile.companyName),
        companyDescription: normalizeOptionalString(profile.companyDescription),
        website: normalizeOptionalString(profile.website),
        logo: buildProfileAssetUrl({
            profile,
            hasUploadedAsset: profile.hasUploadedLogo,
            assetPath: (ownerId) => `/api/employer-profile/${ownerId}/logo`,
        }),
        location: normalizeOptionalString(profile.location),
        contactEmail: normalizeOptionalString(profile.contactEmail),
        contactPhone: normalizeOptionalString(profile.contactPhone),
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

const employerProfileService = createProfileService({
    clearProfileMedia: clearEmployerProfileLogo,
    findProfileByUserId: findEmployerProfileByUserId,
    mediaContentTypeField: "logoContentType",
    mediaDataField: "logoData",
    mediaNotFoundMessage: "Employer logo not found",
    normalizeProfile: normalizeEmployerProfile,
    profileNotFoundMessage: "Employer profile not found",
    setProfileMedia: setEmployerProfileLogo,
    updateProfile: updateEmployerProfile,
});

export const {
    getCurrentProfile: getCurrentEmployerProfile,
    updateCurrentProfile: updateCurrentEmployerProfile,
    setCurrentProfileMedia: setCurrentEmployerProfileLogo,
    removeCurrentProfileMedia: removeCurrentEmployerProfileLogo,
    getCurrentProfileMedia: getCurrentEmployerProfileLogo,
    getVisibleProfile: getVisibleEmployerProfile,
    getProfileMedia: getEmployerProfileLogo,
} = employerProfileService;
