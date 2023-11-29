import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function FlashMessage({ message, type}) {
    useEffect(() => {
        if (message) {
          Swal.fire({
            text: message,
            showConfirmButton: false,
            icon: type,
            timer: 1500,
          });
        }
      }, [message, type]);
    
      return null;
}