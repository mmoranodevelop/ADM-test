import axios from "axios";

export const getPlanet = (url) => {
    return new Promise((resolve, reject) => {
        try {
            axios.get(url).then((res) => {
                console.log("Planet: ", JSON.stringify(res.data));
                resolve(res.data);
            })
                .catch((err) => {
                    console.log("Get Planet api error: ", err);
                    reject("Get Planet api error!");
                });
        } catch (error) {
            reject("[Catch] Get Planet api error!");
        }
    });
}
