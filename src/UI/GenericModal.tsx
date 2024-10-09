import { ReactElement, useEffect } from "react";
import { parseFileName } from "../components/StorageImagesList";

interface GenericModalProps {
  onClose?: () => void;
  imageUrl: string;
  imageName: string;
  className?: string;
}


function GenericModal({ onClose, imageName, imageUrl, className = "" }: GenericModalProps): ReactElement {
  useEffect(() => {
    console.log("MODAL PROPS: ", imageUrl);
  }, [])
  return (
    <>
      <div className={"backdrop"} onClick={onClose} />
      <dialog open className={`modal ${className}`}>
        <img src={imageUrl as string ?? 'beans url'} alt="Image Not Available" />
        <div className="modal-dialogue">
        <h3 className="modal-header">{parseFileName(imageName)}</h3>
          
        <form action="dialog">
          <button>Close</button>
        </form>
        </div>
      </dialog>
    </>
  );
}

export default GenericModal;