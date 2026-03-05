import { randomInt } from 'crypto';

/**
 * @typedef {Object} Candidate
 * @property {string} id - Unique identifier
 * @property {string} name - Candidate full name
 * @property {string} email - Candidate email
 * @property {string} phone - Candidate phone number
 * @property {'PENDING' | 'INTERVIEWED' | 'REJECTED' | 'HIRED'} status - Interview status
 * @property {Object|null} interviewData - Extracted data from Bolna call
 * @property {string} createdAt - ISO Timestamp
 */

/** @type {Candidate[]} */
const candidatesData = [];

/**
 * Database service to manage candidate records (In-memory for simplicity)
 */
export const candidateService = {
    /**
     * Create a new candidate record
     * @param {Object} data - Candidate details
     * @param {string} data.name - Name
     * @param {string} data.email - Email
     * @param {string} data.phone - Phone
     * @returns {Candidate} The created candidate
     */
    createCandidate: (data) => {
        const newCandidate = {
            id: randomInt(100000, 999999).toString(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            status: 'PENDING',
            interviewData: null,
            createdAt: new Date().toISOString()
        };
        candidatesData.push(newCandidate);
        return newCandidate;
    },

    /**
     * Get all candidates
     * @returns {Candidate[]} Array of all candidates
     */
    getAllCandidates: () => {
        // Return latest first
        return [...candidatesData].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },

    /**
     * Find a candidate by phone number
     * Useful for webhook lookups since Bolna often uses phone as primary identifier
     * @param {string} phone - The phone number
     * @returns {Candidate|undefined}
     */
    findByPhone: (phone) => {
        // Strip out non-numeric characters for comparison just in case
        const cleanPhone = phone.replace(/[^0-9+]/g, '');
        return candidatesData.find(c => c.phone.replace(/[^0-9+]/g, '') === cleanPhone);
    },

    /**
     * Find a candidate by ID
     * @param {string} id - The candidate ID
     * @returns {Candidate|undefined}
     */
    findById: (id) => {
        return candidatesData.find(c => c.id === id);
    },

    /**
     * Update candidate status and append interview data
     * @param {string} id - Candidate ID
     * @param {'PENDING' | 'INTERVIEWED' | 'REJECTED' | 'HIRED'} status - New status
     * @param {Object} interviewData - Extracted JSON data from Bolna
     * @returns {Candidate} Updated candidate
     * @throws {Error} If candidate not found
     */
    updateInterviewResult: (id, status, interviewData) => {
        const index = candidatesData.findIndex(c => c.id === id);
        if (index === -1) {
            throw new Error(`Candidate with ID ${id} not found.`);
        }

        candidatesData[index] = {
            ...candidatesData[index],
            status,
            interviewData
        };

        return candidatesData[index];
    }
};
