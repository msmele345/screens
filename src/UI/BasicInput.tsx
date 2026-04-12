import { ComponentPropsWithoutRef } from "react";


interface BasicInputProps extends ComponentPropsWithoutRef<'input'> {
    id: string,
    label: string
    error?: string
}

type CoolProps = { //remove
    id: string,
    label: string
    error?: string
}

const BasicInput = ({ id, label, error, ...rest }: BasicInputProps) => {
    return (
        <div className="control no-margin">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                {...rest}
            />
            <div className="control-error">
                {error && <p>{error}</p>}
            </div>
        </div>
    )
};

export default BasicInput;


//remove
const CoolerInput = ({id, label, error, ...rest}: CoolProps) => {
    return (
        <div>
            <label htmlFor={id}>{label}</label>
            <input id={id} {...rest} />
            <div>
                { error && <p>{error}</p> }
            </div>
        </div>
    )
};