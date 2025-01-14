import { ChangeEventHandler } from "react";

type InputProps = {
    id: string,
    value?: string
    cssClasses?: string,
    labelText: string,
    onChangeHandler?: ChangeEventHandler<HTMLInputElement> | undefined
};

const Input = (
    {
        id,
        value,
        labelText,
        cssClasses,
        onChangeHandler
    }: InputProps
) => {
    return (
        <>
            <div className="">
                <label htmlFor={id} className={cssClasses ?? ""}>{labelText}</label>
                <input value={value} id={id} onChange={onChangeHandler} />
            </div >
        </>
    )
};

export default Input;