import { ChangeEvent, ChangeEventHandler, ReactElement, useState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";


type FormField = 'current-savings' | "expected-return" | "duration" | 'yearly-contribution';
// how to make generic object type with a string as a key

interface Row {
    [key: string]: number
}

const InvestmentForm = (): ReactElement => {

    const [formState, setFormState] = useState<Record<FormField, number>>({
        'current-savings': 0,
        'expected-return': 0,
        'duration': 0,
        'yearly-contribution': 0,
    });    


    const submitHandler = (event: any) => {
        event.preventDefault();
    };

    const resetHandler = () => {
        console.log("RESET HANDLER - input state -", formState);
    };

    type InputChangeHandler = ChangeEventHandler<HTMLInputElement> | undefined;
    
    const inputChangeHandler: InputChangeHandler = (
        event: ChangeEvent<HTMLInputElement>

    ) => {
        console.log("CHANGE HANDLER VALUE", event.target.value);
        console.log("CHANGE HANDLER VALUE", event.target.id);
        setFormState((prevState) => {
            return {
                ...prevState,
                [event.target.id]: event?.target.value as unknown    
            }
        })
    }

    return (
        <form onSubmit={submitHandler} className="form">
            <div className="input-group">
                <p>
                    <Input 
                        type="number" 
                        id="current-savings" 
                        labelText="Current Savings ($)" 
                        onChangeHandler={inputChangeHandler} 
                    />
                </p>
                <p>
                    <Input 
                        type="number" 
                        id="yearly-contribution" 
                        labelText="Yearly Savings ($)"
                        onChangeHandler={inputChangeHandler} 
                    />
                </p>
            </div>
            <div className="input-group">
                <p>
                    <Input 
                        type="number" 
                        id="expected-return" 
                        labelText="Expected Interest (%, per year)" 
                        onChangeHandler={inputChangeHandler}
                    />
                </p>
                <p>
                    <Input 
                        type="number" 
                        id="duration" 
                        labelText="Investment Duration (years)"
                        onChangeHandler={inputChangeHandler} 
                    />
                </p>
            </div>
            <p className="actions">
                <Button type="reset" cssClasses="buttonAlt" textContent="Reset" onClick={resetHandler} />
                <Button type="submit" cssClasses="button" textContent="Calculate" />
            </p>
        </form>
    )
}

export default InvestmentForm;


// class Result<Properties = Record<string, any>> {
//     constructor(
//                 public readonly properties: Record<
//                         keyof Properties,
//                         Properties[keyof Properties]
//                 >
//     ) {}
// };