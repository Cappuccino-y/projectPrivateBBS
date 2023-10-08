import axios from 'axios'

const url = "https://ai.fakeopen.com/v1/chat/completions"
const getTokenFromTxt = async () => {
    const response = await fetch(`token.txt`);
    const token = await response.text();
    return token.trim();  // 确保去掉文本中的任何前后空格
}


const getReply = async data => {
    const token = await getTokenFromTxt();
    const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    }
    const config = {
        headers: headers,
    }
    const response = await axios.post(url, data, config)
    return response.data.choices[0].message.content.trim();
}

export default {getReply}