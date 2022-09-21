import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { toLabel } from '../utils';
import './InputBlock.css';

export interface InputBlockProps {
	label: string;
	onBlur?(value: any): void;
	value?: any;
	readonly?: boolean;
	size?: number;
	adornmentUnit?: string | 'ms';
	type?: 'number' | 'text';
	step?: number;
}

const ensureValue = (value: string, callback: Function) => {
	if (value !== '') {
		callback(value);
	}
};

const InputBlock: FC<InputBlockProps> = props => (
	<div className="inputBlock">
		<TextField
			inputProps={{
				size: props.size ?? 30,
				readOnly: props.readonly ?? false,
				name: props.label,
				id: props.label,
				onBlur: event => {
                    if (props.onBlur !== undefined) {
                        // trigger callback if there is input
                        ensureValue(event.target.value, props.onBlur);
                    } else {
                        return
                    }
				},
				defaultValue: props.value,
				step: props.step,
				min: 0
			}}
			InputProps={
				props.type === 'number' && props.adornmentUnit !== undefined
					? {
							endAdornment: <InputAdornment position="end">{props.adornmentUnit}</InputAdornment>
					  }
					: undefined
			}
			variant="outlined"
			label={toLabel(props.label)}
			type={props.type ?? 'text'}
		/>
	</div>
);

export default InputBlock;
