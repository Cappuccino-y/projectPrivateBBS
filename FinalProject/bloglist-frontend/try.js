import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: token, // This is the default and can be omitted
    baseURL: "https://api.chatanywhere.tech/v1"
});

const chatCompletion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: "Hello world"}],
});

console.log(chatCompletion.data.choices[0].message.content);