import { asyncHandler } from "../middleware/asyncHandler.js";

export function createProfileController({
    getCurrentProfile,
    getCurrentProfileMedia,
    getProfileMedia,
    getVisibleProfile,
    removeCurrentProfileMedia,
    setCurrentProfileMedia,
    updateCurrentProfile,
}) {
    return {
        getSelfProfile: asyncHandler(async (req, res) => {
            const profile = await getCurrentProfile(req.auth?.userId);
            res.status(200).json({ success: true, data: profile });
        }),

        updateSelfProfile: asyncHandler(async (req, res) => {
            const profile = await updateCurrentProfile(req.auth?.userId, req.body);
            res.status(200).json({ success: true, data: profile });
        }),

        uploadSelfProfileMedia: asyncHandler(async (req, res) => {
            const profile = await setCurrentProfileMedia(req.auth?.userId, req.file);
            res.status(200).json({ success: true, data: profile });
        }),

        removeSelfProfileMedia: asyncHandler(async (req, res) => {
            const profile = await removeCurrentProfileMedia(req.auth?.userId);
            res.status(200).json({ success: true, data: profile });
        }),

        getSelfProfileMedia: asyncHandler(async (req, res) => {
            const media = await getCurrentProfileMedia(req.auth?.userId);
            res.set("Content-Type", media.contentType);
            res.status(200).send(media.data);
        }),

        getProfileByUserId: asyncHandler(async (req, res) => {
            const profile = await getVisibleProfile(req.params?.userId, req.auth);
            res.status(200).json({ success: true, data: profile });
        }),

        getProfileMediaByUserId: asyncHandler(async (req, res) => {
            const media = await getProfileMedia(req.params?.userId, req.auth);
            res.set("Content-Type", media.contentType);
            res.status(200).send(media.data);
        }),
    };
}
