import { FC } from 'react';
import { toCapitalCase } from '../utils';

interface SelectBlockProps {
	label: string;
	onChange(value: string): void;
	options: { [key: string]: string };
    text: string
}

const SelectBlock: FC<SelectBlockProps> = props => (
	<div>
		<label htmlFor={props.label}>{props.text}</label>
		<select
			onChange={event => props.onChange(event.target.value)}
			name={props.label}
		>
			{Object.entries(props.options).map(([key, value]) => {
				return <option value={value}>{toCapitalCase(key)}</option>;
			})}
		</select>
	</div>
);

export default SelectBlock;
