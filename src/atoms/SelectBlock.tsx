import { MenuItem, TextField } from '@mui/material';
import { FC } from 'react';
import { v4 as uuid } from 'uuid';
import { toCapitalCase, toLabel } from '../utils';
import './SelectBlock.css';

export interface SelectBlockProps {
	label: string;
	onChange(value: string): void;
	options: { [key: string]: string };
	selected: string;
}

const SelectBlock: FC<SelectBlockProps> = props => {
	return (
		<div className="selectBlock">
			<TextField
				label={toLabel(props.label)}
				select
				value={props.selected}
				onChange={event => props.onChange(event.target.value)}
				name={props.label}
			>
				{Object.entries(props.options).map(([key, value]) => {
					return (
						// need to choose the one that's selected
						<MenuItem key={uuid()} value={value}>
							{toCapitalCase(key)}
						</MenuItem>
					);
				})}
			</TextField>
		</div>
	);
};

export default SelectBlock;
