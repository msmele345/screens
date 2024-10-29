import { forwardRef, useImperativeHandle, useRef } from "react";
import { GenericModalProps } from "../UI/GenericModal";
import { parseFileName } from "./StorageImagesList";

const RefModal = forwardRef((props: GenericModalProps, ref: any) => {

    const inputRef = useRef<HTMLDialogElement>(null);
    
    //pass ref from parent component. Call open() ref.current.open from parent to control 
    useImperativeHandle(ref, () => {
      return {
        open(){ 
            inputRef?.current?.showModal();
        }

      }
    });
  
    return (
        <>
          <div className={"backdrop"} onClick={props.onClose} />
          <dialog open className={`modal ${props.className}`}>
            <img src={props.imageUrl as string ?? 'beans url'} alt="Image Not Available" />
            <div className="modal-dialogue">
            <h3 className="modal-header">{parseFileName(props.imageName)}</h3>
              
            </div>
          </dialog>
        </>
      );
  });
  
  export default RefModal;