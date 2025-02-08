require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function testAPI() {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Hello, are you working?" }],
        });
        console.log(completion.choices[0].message.content);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testAPI(); 