import { candidateService } from '../services/candidateService.js';
import { applySchema } from '../utils/validators.js';

/**
 * Handle new candidate application
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const applyForJob = async (req, res, next) => {
    try {
        // Validate request body
        const parsed = applySchema.safeParse(req.body);

        if (!parsed.success) {
            // Bad request - validation failed
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: parsed.error.format()
            });
        }

        const data = parsed.data;

        // Check if candidate already applied (optional but good for UX)
        const existing = candidateService.findByPhone(data.phone);
        if (existing && existing.status === 'PENDING') {
            return res.status(409).json({
                success: false,
                error: 'Candidate has already applied and is pending an interview.'
            });
        }

        // Create the candidate record
        const candidate = candidateService.createCandidate(data);

        // TODO: Future enhancement - Trigger Bolna outbound call API right here.
        // For now, we will test by triggering the call manually via Bolna dashboard.

        res.status(201).json({
            success: true,
            message: 'Application submitted successfully. Candidate is queued for the AI interview.',
            data: candidate
        });

    } catch (error) {
        next(error);
    }
};

/**
 * Handle listing all candidates
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const getCandidates = async (req, res, next) => {
    try {
        const candidates = candidateService.getAllCandidates();

        res.status(200).json({
            success: true,
            data: candidates
        });
    } catch (error) {
        next(error);
    }
};
