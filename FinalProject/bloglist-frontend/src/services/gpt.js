import axios from 'axios'

const url = "https://ai.fakeopen.com/v1/chat/completions"

const headers = {
    "Authorization": "Bearer fk-loDf2CwxpKS7aslA5i666vh4xIwnMknP5HJ5SzR4rls",
    "Content-Type": "application/json"
}


const getReply = async data => {
    const config = {
        headers: headers,
    }
    const response = await axios.post(url, data, config)
    return response.data.choices[0].message.content.trim();
}

export default {getReply}