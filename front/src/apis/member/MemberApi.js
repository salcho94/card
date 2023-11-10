import axios from 'axios'

export const duplicateCheck = async  (nickName) => {
    try {
        //응답 성공
        const response = await axios.get(process.env.REACT_APP_URL + `/api/member/duplicate?nickName=${nickName}`);
        return response
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}


export const submit = async  (body) => {
    try {
        //응답 성공
        const response = await axios.post(process.env.REACT_APP_URL + `/api/member/signup`,body);
        return response
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}

export const loginSubmit = async  (body) => {
    try {
        //응답 성공
        const response = await axios.post(process.env.REACT_APP_URL + `/api/member/signin`,body);
        return response
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}