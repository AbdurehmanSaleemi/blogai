import { Configuration, OpenAIApi } from "openai";
const config = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_KEY
});
const openai = new OpenAIApi(config);

export default openai;