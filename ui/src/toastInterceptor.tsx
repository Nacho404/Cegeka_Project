import axios, { AxiosResponse } from 'axios'
import { toast } from "react-toastify";

export function intercept() {
  axios.interceptors.response.use(function (response: AxiosResponse) {
    switch (response.config.method) {
      case 'post': {
        let controller = response.config.url!.split('/').at(-1) 
        if(controller !== 'register' && controller !== 'login' && controller !== "logout"){
          toast.success('Elementul a fost adaugat');
          return response;
        }
        return response;
      }
      case 'put': {
        toast.success('Elementul a fost actualizat');
        return response;
      }

      case 'delete': {
        toast.success('Elementul a fost sters');
        return response;
      }
      default: {
        return response;
      }
    }

  }, function (error) {
    switch (error.response.status) {
      case 404: {
        toast.error('Eroare: Elementul nu mai exista');
        return Promise.reject(error);

      }
      case 400: {
        toast.error('Eroare: Cerere invalida');
        return Promise.reject(error);

      }
      case 401:{
        toast.error('Eroare: Parola sau email incorecte')
        return Promise.reject(error);

      }
      case 409 : {
        toast.error('Eroare: Elementul pe care doriti sa-l stergeti dispune de asocieri in alte nomenclatoare. Stergeti asocierile!');
        return Promise.reject(error);

      }
      default: {
        toast.error('Eroare');
        return Promise.reject(error);
      }
    }
  });
}