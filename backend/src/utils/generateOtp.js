import otpGenerator from 'otp-generator';

export const generateOtp = () => {
    return otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
}