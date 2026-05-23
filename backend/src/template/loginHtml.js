export const loginHtml = () => {
    return `
<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">  
<h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to Online Batch.</h2>
<p>Congratulations! You're almost set to start using your account. Just click the button below to validate your email address.</p>
<a href="http://localhost:3000/api/auth/login" style="background-color: blue; color: white; padding: 10px 20px; text-decoration: none; display: inline-block;">Login</a>
<p>Cheers,<br />Online Batch Team</p>
</div>
`
}