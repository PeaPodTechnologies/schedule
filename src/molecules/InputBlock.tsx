import { FC } from 'react';
import { capitalCase } from '../utils';

interface InputBlockProps {
	label: string;
	value?: string;
	readonly?: boolean;
}

const InputBlock: FC<InputBlockProps> = props => (
	<div>
		<label htmlFor={props.label}>{capitalCase(props.label) + ': '}</label>
		<input
			readOnly={props.readonly}
			type="text"
			name={props.label}
			id={props.label}
			value={props.value}
		/>
	</div>
);

export default InputBlock;
