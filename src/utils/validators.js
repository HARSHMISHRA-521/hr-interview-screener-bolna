import { z } from 'zod';

/**
 * Zod schema for validating candidate application payloads
 */
export const applySchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters long').max(100),
    email: z.string().email('Invalid email address format'),
    phone: z.string()
        .min(10, 'Phone must be at least 10 characters long')
        .max(20, 'Phone must not exceed 20 characters')
        // Regex ensures it starts with + followed by digits (valid E.164 Format emitted by react-phone-number-input)
        .regex(/^\+[1-9]\d{6,14}$/, 'Invalid international phone number format')
});
