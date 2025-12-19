import { subscribeToQueue } from "../broker/rabbit.js";
import sendEmail from "../utils/email.js";



function startListener() {
    subscribeToQueue("USER_REGISTERED", async (msg) => {

        const {email,role, fullname:{firstname, lastname}} = msg;

        const template = `
        <h1>Welcome to Spotify</h1>
        <h3>Hi ${firstname} ${lastname}</h3>
        <p>Your account has been created with the role of ${role}.</p>
        <p>We are excited to have you on board. Enjoy your music journey with Spotify!</p>
        <br/>
        <p>Best Regards,</p>
        <p>Spotify Team</p>
        `;

        await sendEmail( email, "Welcome to Spotify","thank you for registering with spotify", template);
    })
}

export default startListener;