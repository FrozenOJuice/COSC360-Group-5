import { createProfileController } from "./profileControllerFactory.js";
import {
    getCurrentSeekerProfile,
    getCurrentSeekerProfilePicture,
    removeCurrentSeekerProfilePicture,
    getSeekerProfilePicture,
    getVisibleSeekerProfile,
    setCurrentSeekerProfilePicture,
    updateCurrentSeekerProfile,
} from "../services/seekerProfileService.js";

const seekerProfileController = createProfileController({
    getCurrentProfile: getCurrentSeekerProfile,
    getCurrentProfileMedia: getCurrentSeekerProfilePicture,
    getProfileMedia: getSeekerProfilePicture,
    getVisibleProfile: getVisibleSeekerProfile,
    removeCurrentProfileMedia: removeCurrentSeekerProfilePicture,
    setCurrentProfileMedia: setCurrentSeekerProfilePicture,
    updateCurrentProfile: updateCurrentSeekerProfile,
});

export const {
    getSelfProfile: getSelfSeekerProfile,
    updateSelfProfile: updateSelfSeekerProfile,
    uploadSelfProfileMedia: uploadSelfSeekerProfilePicture,
    removeSelfProfileMedia: removeSelfSeekerProfilePicture,
    getSelfProfileMedia: getSelfSeekerProfilePicture,
    getProfileByUserId: getSeekerProfileByUserId,
    getProfileMediaByUserId: getSeekerProfilePictureByUserId,
} = seekerProfileController;
