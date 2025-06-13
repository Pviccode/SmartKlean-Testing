// Email regex pattern
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Name validation regex (allows letters, spaces, and common name characters)
export const NAME_REGEX = /^[a-zA-Z\s'-]{2,50}$/;

// Password regex pattern
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Normalize or transform both Zod and express-validator errors into a common structure
export function normalizeErrors(error) {
    const errorResult = {};

    // Zod format
    if (error && typeof error === 'object') {
        for (const key in error) {
            if (Array.isArray(error[key])) {
                errorResult[key] = error[key][0]  // Take the first error message
            }
        }
    }

    // Express-validator format
    if (Array.isArray(error)) {
        error.forEach( err => {
            if (err.param && err.msg) {
                errorResult[err.param] = err.msg;
            }
        });
    }

    return errorResult;
};

// Format date
export const formatDate = (dateParam) => {
    const date = new Date(dateParam);
    const formattedDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`;
    return formattedDate;
};
