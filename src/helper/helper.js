export function validateName(name) {
    name = name.trim();
    if (!name || name.length === 0 || name.length < 2 || name.length > 25 || typeof name !== 'string'){
        throw new Error('Name is not valid')
    }
}

export const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.toLowerCase());
};

export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return passwordRegex.test(password);
};

export const validateRole = (role) => {
    const validRoles = ['admin', 'user'];
    return validRoles.includes(role.toLowerCase());
};