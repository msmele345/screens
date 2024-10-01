import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom';
import { parseFileName } from '../components/StorageImagesList';

interface ModalProps {
    imageUrl: string;
    imageName: string;
    className?: string;
    onCloseHandler?: Dispatch<SetStateAction<boolean>>;
}

const ImageModal = ({ imageUrl, imageName, className }: ModalProps) => {

    const dialogRef = useRef<HTMLDialogElement | any>();

    return createPortal(
        <dialog ref={dialogRef} className={`modal ${className}`}>
            <div  className=''>
                <img src={imageUrl?? 'beans url'} alt="Image Not Available" />
                <h3 style={{ width: "90%" }}>{parseFileName(imageName)}</h3>
            </div>
        </dialog>,
        (document.getElementById('modal') as Element | DocumentFragment)
    );
};

export default ImageModal;


/* 
 or with on close
function Modal({ children, onClose }) {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;



*/