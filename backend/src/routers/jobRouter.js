import express from "express";
import {
    createJob,
    deleteJob,
    getEmployerJobs,
    getJobById,
    getJobOptions,
    getJobs,
    updateJob,
} from "../controllers/jobController.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { requireRole } from "../middleware/requireRole.js";
import { validateBody } from "../middleware/validateBody.js";
import { validateParams } from "../middleware/validateParams.js";
import { validateQuery } from "../middleware/validateQuery.js";
import {
    createJobSchema,
    jobParamsSchema,
    listJobsQuerySchema,
    updateJobSchema,
} from "../validators/jobSchemas.js";

const jobRouter = express.Router();

jobRouter.get("/", validateQuery(listJobsQuerySchema), getJobs);
jobRouter.get("/options", getJobOptions);
jobRouter.get("/me", requireAuth, requireRole("employer"), validateQuery(listJobsQuerySchema), getEmployerJobs);
jobRouter.post("/", requireAuth, requireRole("employer"), validateBody(createJobSchema), createJob);
jobRouter.get("/:id", validateParams(jobParamsSchema), getJobById);
jobRouter.patch(
    "/:id",
    requireAuth,
    requireRole("employer"),
    validateParams(jobParamsSchema),
    validateBody(updateJobSchema),
    updateJob
);
jobRouter.delete(
    "/:id",
    requireAuth,
    requireRole("employer"),
    validateParams(jobParamsSchema),
    deleteJob
);

export default jobRouter;
