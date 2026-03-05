import { candidateService } from '../services/candidateService.js';

/**
 * Handle incoming webhooks from Bolna AI
 * @param {import('express').Request} req - Express request
 * @param {import('express').Response} res - Express response
 * @param {import('express').NextFunction} next - Express next function
 */
export const bolnaWebhookHandler = async (req, res, next) => {
    try {
        console.log('Received webhook from Bolna:', JSON.stringify(req.body, null, 2));

        // Bolna sends various payloads depending on event type.
        // We are primarily interested in "call_completed" or when extraction data is sent.

        const payload = req.body;

        // Ensure this is a valid webhook payload from Bolna
        if (!payload) {
            return res.status(400).json({ success: false, error: 'Empty payload' });
        }

        // Example Bolna Payload Structure we might expect for extraction:
        // {
        //   "event": "call_analyzed",
        //   "data": {
        //      "call_id": "call_123",
        //      "recipient_phone_number": "+1234567890",
        //      "extracted_data": { 
        //           "years_of_experience": "5",
        //           "notice_period": "30 days",
        //           "salary_expectation": "$100k"
        //       }
        //   }
        // }
        //
        // Note: Actual Bolna payload structure may vary. The logic below is adaptable.

        // Safely extract the phone number from the payload depending on Bolna's event shape
        const phone = payload.call?.to || payload.data?.recipient_phone_number || payload.to;

        if (!phone) {
            console.warn('Webhook received but could not identify phone number. Skipping DB update.');
            return res.status(200).send('OK');
        }

        // Look up the candidate based on the phone number
        const candidate = candidateService.findByPhone(phone);

        if (!candidate) {
            console.warn(`Webhook received for phone ${phone} but no candidate found in DB.`);
            return res.status(200).send('OK');
        }

        // Extract the structured JSON data we care about
        const extractedData = payload.data?.extracted_data || payload.extraction_data || payload.data;

        // If the call was successful and we got data
        if (extractedData) {
            candidateService.updateInterviewResult(candidate.id, 'INTERVIEWED', extractedData);
            console.log(`Successfully updated candidate ${candidate.name} with interview results.`);
        }

        // Always return 200 OK so Bolna knows we received it
        res.status(200).send('OK');

    } catch (error) {
        // Even if there's an error on our end, we probably still want to return 200 to the webhook provider 
        // so they don't keep retrying and spamming our server, but we will log it.
        console.error('Webhook processing error:', error);
        next(error);
    }
};
