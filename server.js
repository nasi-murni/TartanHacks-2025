const express = require('express');
const app = express();
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static('public'));

app.post('/api/get-sleep-schedule', async (req, res) => {
    try {
        // Log to verify environment variable
        console.log('API Key loaded:', process.env.GEMINI_API_KEY ? 'Yes' : 'No');
        
        const {
            departureCity,
            departureTimezone,
            departureTime,
            arrivalCity,
            arrivalTimezone,
            flightDuration
        } = req.body;

        const prompt = `I'm flying from ${departureCity} (${departureTimezone}) to ${arrivalCity} (${arrivalTimezone}). 
            My flight departs at ${departureTime} and the flight duration is ${flightDuration} hours. 
            Please provide a detailed sleep schedule recommendation to minimize jet lag, including when to sleep before, 
            during, and after the flight. Format the response as bullet points with these sections:
            - Before Flight
            - During Flight
            - After Arrival
            Use • for bullet points and keep each point clear and concise.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
        });

        res.json({ recommendation: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 