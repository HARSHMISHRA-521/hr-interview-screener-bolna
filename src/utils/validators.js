import { z } from 'zod';

/**
 * Zod schema for validating candidate application payloads
 */
export const applySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long').max(100),
    email: z.string().email('Invalid email address format'),
    phone: z.string()
        .min(10, 'Phone must be at least 10 characters long')
        .max(15, 'Phone must not exceed 15 characters')
        // Regex ensures it starts with + (optional) followed by digits
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format. Must include country code, e.g., +1234567890')
});
