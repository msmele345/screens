import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

type InputProps = {
    type: HTMLInputTypeAttribute,
    id: string,
    cssClasses?: string,
    labelText: string,
    onChangeHandler?: ChangeEventHandler<HTMLInputElement> | undefined
};

const Input = (
    { 
      id, 
      type, 
      labelText, 
      cssClasses,
      onChangeHandler 
   }: InputProps 
) => {
    return (
        <>
            <label htmlFor={id} className={cssClasses ?? ""}>{labelText}</label>
            <input type={type} id={id} onChange={onChangeHandler} />
        </>
    )
};

export default Input;