
import { config as dotenvConfig } from 'dotenv';


dotenvConfig();

const _config = {
    MONGO_URI: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
};

export default Object.freeze(_config);
