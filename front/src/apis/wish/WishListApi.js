import axios from 'axios'


export const getWishCode = async  () => {
    try {
        //응답 성공
        const response = await axios.get(`/api/wish/getCode`);
        return response.data;
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}
export const getWishList = async  (memberId,cate) => {
    try {
        console.log(memberId);
        //응답 성공
        const response = await axios.get(`/api/wish/getWishList?memberId=${memberId}&cate=${cate}`);
        return response.data;
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}

export const wishSubmit = async  (body) => {
    try {
        let axiosConfig = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }
        //응답 성공
        const response = await axios.post("/api/wish/insertWish",body,axiosConfig);
        return response
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}