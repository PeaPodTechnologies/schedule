import { FC } from 'react';
import { capitalCase } from '../utils';

interface InputBlockProps {
	label: string;
	onBlur(value: any): void;
	value?: any;
	readonly?: boolean;
}

const sanitizeInput = (input: string) => {
	// getting the last two chars of the input
	let trailing = input.substring(input.length - 2);

	// testing if there is a semicolon at the end of the string
	if (trailing.at(0) != ':') input += ':';

	// testing if there is a space at the end of the string
	if (trailing.at(1) != ' ') input += ' ';

	// returning the output
	return capitalCase(input);
};

const InputBlock: FC<InputBlockProps> = props => (
	<div>
		<label htmlFor={props.label}>{sanitizeInput(props.label)}</label>
		<input
			readOnly={props.readonly}
			type="text"
			name={props.label}
			id={props.label}
			onBlur={event => props.onBlur(event.target.value)}
			defaultValue={props.value}
		/>
	</div>
);

export default InputBlock;
