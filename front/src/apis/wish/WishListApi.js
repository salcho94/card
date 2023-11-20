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
        //응답 성공
        const response = await axios.get(`/api/wish/getWishList?memberId=${memberId}&cate=${cate}`);
        return response.data;
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}

export const deleteWishItem = async  (body) => {
    try {
        //응답 성공
        const response = await axios.post(`/api/wish/deleteWishItem`,body);
        return response.data;
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}


export const wishDoneItem = async  (body) => {
    try {
        //응답 성공
        const response = await axios.post(`/api/wish/wishDoneItem`,body);
        return response.data;
    } catch (error) {
        //응답 실패
        console.error(error);
    }
}


export const getWishItem = async  (wishItemId) => {
    try {
        //응답 성공
        const response = await axios.get(`/api/wish/getWishItem?wishItemId=${wishItemId}`);
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