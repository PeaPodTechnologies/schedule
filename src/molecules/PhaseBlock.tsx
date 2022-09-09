import { FC } from 'react';
import InputBlock from './InputBlock';
import { ValidFields } from "./ParameterBlock"

/**
 * these are the expected props that can be passed into the object
 */
interface PhaseBlockProps {
	type: string;
    end: number;
    targets?: {
        value: number;
        timestamp?: number;
        duration?: number
    }[]
    // a generic function which we will expand on within the component
    onUpdate(field: ValidFields, value: any): void
}

const PhaseBlock: FC<PhaseBlockProps> = props => {
    const updateType = (value: string) => {
        return props.onUpdate("type", value);
    }

    const updateEnd = (value: number) => {
        return props.onUpdate("end", value);
    }

	return <div>
        <InputBlock label="type" onBlur={updateType} value={props.type} />

        <InputBlock label="end" onBlur={updateEnd} value={props.end} />
    </div>;
};

export default PhaseBlock;
