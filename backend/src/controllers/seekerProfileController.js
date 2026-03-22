import {
    getCurrentSeekerProfile,
    getCurrentSeekerProfilePicture,
    removeCurrentSeekerProfilePicture,
    getSeekerProfilePicture,
    getVisibleSeekerProfile,
    setCurrentSeekerProfilePicture,
    updateCurrentSeekerProfile,
} from "../services/seekerProfileService.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getSelfSeekerProfile = asyncHandler(async (req, res) => {
    const profile = await getCurrentSeekerProfile(req.auth?.userId);
    res.status(200).json({ success: true, data: profile });
});

export const updateSelfSeekerProfile = asyncHandler(async (req, res) => {
    const profile = await updateCurrentSeekerProfile(req.auth?.userId, req.body);
    res.status(200).json({ success: true, data: profile });
});

export const uploadSelfSeekerProfilePicture = asyncHandler(async (req, res) => {
    const profile = await setCurrentSeekerProfilePicture(req.auth?.userId, req.file);
    res.status(200).json({ success: true, data: profile });
});

export const removeSelfSeekerProfilePicture = asyncHandler(async (req, res) => {
    const profile = await removeCurrentSeekerProfilePicture(req.auth?.userId);
    res.status(200).json({ success: true, data: profile });
});

export const getSelfSeekerProfilePicture = asyncHandler(async (req, res) => {
    const picture = await getCurrentSeekerProfilePicture(req.auth?.userId);
    res.set("Content-Type", picture.contentType);
    res.status(200).send(picture.data);
});

export const getSeekerProfileByUserId = asyncHandler(async (req, res) => {
    const profile = await getVisibleSeekerProfile(req.params?.userId, req.auth);
    res.status(200).json({ success: true, data: profile });
});

export const getSeekerProfilePictureByUserId = asyncHandler(async (req, res) => {
    const picture = await getSeekerProfilePicture(req.params?.userId, req.auth);
    res.set("Content-Type", picture.contentType);
    res.status(200).send(picture.data);
});
