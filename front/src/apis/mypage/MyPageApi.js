import axios from 'axios'


export const updateTarget = async  (body) => {
    try {
        //응답 성공
        const response = await axios.post(`/api/member/updateTarget`,body);
        return response
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}