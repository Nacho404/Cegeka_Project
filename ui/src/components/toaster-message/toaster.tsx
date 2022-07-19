import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface TProps {
    messageDisplayed:string;
    messageType:string;
}

export function ToasterMessage(props: TProps){
    const propsOfToast = {
        toastId: 1,
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    }

    if(props.messageType == "error") {
        toast.error(props.messageDisplayed, propsOfToast);
    }

    if(props.messageType == "success") {
        toast.success(props.messageDisplayed, propsOfToast);
    }

  return (
    <div>
        <ToastContainer position="bottom-left" theme='colored' />
    </div>
  );
}