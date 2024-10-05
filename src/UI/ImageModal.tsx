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
                <img src={imageUrl ?? 'beans url'} alt="Image Not Available" />
                <h3 style={{ width: "400px" }}>{parseFileName(imageName)}</h3>
            </div>
            <form action="dialog">
              <button>Close</button>
            </form>
        </dialog>,
        (document.getElementById('modal') as Element | DocumentFragment)
    );
};

export default ImageModal;