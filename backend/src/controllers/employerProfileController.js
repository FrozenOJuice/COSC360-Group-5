import {
    getCurrentEmployerProfile,
    getCurrentEmployerProfileLogo,
    getEmployerProfileLogo,
    getVisibleEmployerProfile,
    setCurrentEmployerProfileLogo,
    updateCurrentEmployerProfile,
} from "../services/employerProfileService.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

export const getSelfEmployerProfile = asyncHandler(async (req, res) => {
    const profile = await getCurrentEmployerProfile(req.auth?.userId);
    res.status(200).json({ success: true, data: profile });
});

export const updateSelfEmployerProfile = asyncHandler(async (req, res) => {
    const profile = await updateCurrentEmployerProfile(req.auth?.userId, req.body);
    res.status(200).json({ success: true, data: profile });
});

export const uploadSelfEmployerProfileLogo = asyncHandler(async (req, res) => {
    const profile = await setCurrentEmployerProfileLogo(req.auth?.userId, req.file);
    res.status(200).json({ success: true, data: profile });
});

export const getSelfEmployerProfileLogo = asyncHandler(async (req, res) => {
    const logo = await getCurrentEmployerProfileLogo(req.auth?.userId);
    res.set("Content-Type", logo.contentType);
    res.status(200).send(logo.data);
});

export const getEmployerProfileByUserId = asyncHandler(async (req, res) => {
    const profile = await getVisibleEmployerProfile(req.params?.userId, req.auth);
    res.status(200).json({ success: true, data: profile });
});

export const getEmployerProfileLogoByUserId = asyncHandler(async (req, res) => {
    const logo = await getEmployerProfileLogo(req.params?.userId, req.auth);
    res.set("Content-Type", logo.contentType);
    res.status(200).send(logo.data);
});
