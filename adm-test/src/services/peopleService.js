import {API_BASE_URL, GET_PEOPLE} from "./APICONSTANTS";
import axios from "axios";

export const getPeopleList = (page) => {
    return new Promise((resolve, reject) => {
        try {
            let url = API_BASE_URL + GET_PEOPLE + '?page=' + page.toString();
            axios.get(url).then((res) => {
                console.log("People list: ", JSON.stringify(res.data));
                resolve(res.data);
            })
                .catch((err) => {
                    console.log("Get people api error: ", err);
                    reject("Get people api error!");
                });
        } catch (error) {
            reject("[Catch] Get people api error!");
        }
    });
}
