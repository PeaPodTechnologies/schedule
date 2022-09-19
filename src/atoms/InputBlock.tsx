import { FC } from 'react';
import { toLabel } from '../utils';
import './InputBlock.css';

export interface InputBlockProps {
	label: string;
	onBlur(value: any): void;
	value?: any;
	readonly?: boolean;
	size?: number;
}

const ensureValue = (value: string, callback: Function) => {
	if (value !== '') {
		callback(value);
	}
};

const InputBlock: FC<InputBlockProps> = props => (
	<div className="inputBlock">
		<label htmlFor={props.label}>{toLabel(props.label)}</label>
		<input
			size={props.size ?? 20}
			readOnly={props.readonly ?? false}
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
