import { FC } from 'react';
import { capitalCase } from '../utils';

interface InputBlockProps {
	label: string;
}

const InputBlock: FC<InputBlockProps> = props => (
	<div>
		<label htmlFor={props.label}>{capitalCase(props.label) + ': '}</label>
		<input type="text" name={props.label} id={props.label} />
	</div>
);

export default InputBlock;
