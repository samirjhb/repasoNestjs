import 'dotenv/config'
import * as joi from 'joi';

interface EnvVars {
    PORT: number;
}

const envSchema = joi.object({
    PORT: joi.number().required().default(3001),
}).unknown(true);

const { error, value } = envSchema.validate(process.env);


if (error) {
    throw new Error(`Config Validation errror: ${error.message}`);
}

const envVars:EnvVars = value

export const envs = {
    port: envVars.PORT,
}