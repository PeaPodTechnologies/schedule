import { FC } from 'react';
import { v4 as uuid } from 'uuid';
import { toCapitalCase, toLabel } from '../utils';

export interface SelectBlockProps {
	label: string;
	onChange(value: string): void;
	options: { [key: string]: string };
	selected: string;
}

const SelectBlock: FC<SelectBlockProps> = props => {
	return (
		<div>
			<label htmlFor={props.label}>{toLabel(props.label)}</label>
			<select
				value={props.selected}
				onChange={event => props.onChange(event.target.value)}
				name={props.label}
			>
				{Object.entries(props.options).map(([key, value]) => {
					return (
						// need to choose the one that's selected
						<option key={uuid()} value={value}>
							{toCapitalCase(key)}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default SelectBlock;
