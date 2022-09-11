import { FC } from 'react';
import { toLabel } from '../utils';

interface InputBlockProps {
	label: string;
	onBlur(value: any): void;
	value?: any;
	readonly?: boolean;
}

const ensureValue = (value: string, callback: Function) => {
	if (value !== '') {
		callback(value);
	}
};

const InputBlock: FC<InputBlockProps> = props => (
	<div>
		<label htmlFor={props.label}>{toLabel(props.label)}</label>
		<input
			readOnly={props.readonly}
			type="text"
			name={props.label}
			id={props.label}
			onBlur={event => {
				// trigger callback if there is input
				ensureValue(event.target.value, props.onBlur);
			}}
			defaultValue={props.value}
		/>
	</div>
);

export default InputBlock;
