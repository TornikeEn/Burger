import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-my-burger-833bb-default-rtdb.firebaseio.com/',
});

export default instance;