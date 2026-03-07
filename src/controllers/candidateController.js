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

        // Auto-format phone number for Bolna API (requires E.164 e.g., +919876543210)
        let formattedPhone = data.phone.trim();
        if (!formattedPhone.startsWith('+')) {
            // Default to +91 (India) if 10 digits are provided without a country code
            const digits = formattedPhone.replace(/\D/g, '');
            if (digits.length === 10) {
                formattedPhone = '+91' + digits;
            } else {
                formattedPhone = '+' + digits;
            }
        } else {
            // Just clean up whitespace or special characters except the '+'
            formattedPhone = '+' + formattedPhone.replace(/\D/g, '');
        }
        data.phone = formattedPhone;

        // Create the candidate record
        const candidate = candidateService.createCandidate(data);

        // Trigger the Bolna outbound call automatically
        const bolnaApiKey = process.env.BOLNA_API_KEY;
        const bolnaAgentId = process.env.BOLNA_AGENT_ID;

        if (bolnaApiKey && bolnaAgentId) {
            try {
                // Dynamically import axios for the backend call
                const axios = (await import('axios')).default;

                // Bolna outbound call endpoint
                await axios.post('https://api.bolna.dev/call', {
                    agent_id: bolnaAgentId,
                    recipient_phone_number: data.phone,
                    // If your agent requires initial variables, you can pass them here via candidate_data: { name: data.name }
                }, {
                    headers: {
                        'Authorization': `Bearer ${bolnaApiKey}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log(`Successfully triggered Bolna call for candidate ${candidate.name} at ${data.phone}`);
            } catch (bolnaError) {
                const errorMessage = bolnaError?.response?.data?.message || bolnaError?.response?.data || bolnaError.message;
                console.error('Failed to trigger Bolna call:', errorMessage);

                // Return a 400 error to the frontend so the user can see exactly why Bolna blocked the call
                return res.status(400).json({
                    success: false,
                    error: `Bolna API Rejected Call: ${errorMessage}`
                });
            }
        } else {
            console.warn('BOLNA_API_KEY or BOLNA_AGENT_ID missing in .env! Application saved but AI call not triggered automatically.');
        }

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
