export const optHtml = (otp) => {
    return `
    <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">  
    <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Online Batch.</h2>
    <p>Congratulations! You're almost set to start using your account. Just click the button below to validate your email address.</p>
    <h3 style="color: blue;">${otp}</h3>
    <p>Cheers,<br />Online Batch Team</p>
    </div>
    `
}