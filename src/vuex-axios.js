import axios from "axios";
import { store } from "./store";


axios.interceptors.request.use((request) => {
    if (store.getters.isAuthenticated == true) {
      request.headers.common.Authorization = `Bearer ${store.getters.getToken}`;
    }
    return request;
  });
  


