import { FC } from 'react';
import { ensureNumber } from '../utils';
import { PhaseTypes } from '../types';
import CrudBlock from './CrudBlock';

/**
 * these are the expected props that can be passed into the object
 */
interface PhaseBlockProps {
	type: PhaseTypes;
	end: number;
	targets?: {
		value: number;
		timestamp?: number;
		duration?: number;
	}[];
	// generic create function
	create(payload: any, ...keys: any[]): void;
	// generic update function
	update(payload: any, ...keys: any[]): void;
	// generic delete function
	delete(...keys: any[]): void;
}

const PhaseBlock: FC<PhaseBlockProps> = props => {
	// wrapper to update the type of the phase
	const updateType = (value: PhaseTypes) => {
		return props.update(value, 'type');
	};

	// wrapper to update the end of the phase
	const updateEnd = (value: number) => {
		return props.update(value, 'end');
	};

	// rendering
	return (
		<CrudBlock
			selects={[
				{
					label: 'phase type',
					onChange: updateType,
					options: PhaseTypes,
					selected: props.type
				}
			]}
			inputs={[
				{
					label: 'end',
					onBlur: value => {
						/// performing input validation
						if (ensureNumber(value)) {
							updateEnd(parseFloat(value));
						} else {
							alert(`${value} is not a valid number for value`);
						}
					},
					value: props.end,
					size: 10,
                    type: "number",
                    adornmentUnit: "ms",
                    step: 1000
				}
			]}
			createLabel={'new target'}
			create={() => {
				props.create(
					{
						value: 0,
						timestamp: 0,
						duration: 0
					},
					'targets'
				);
			}}
			delete={props.delete}
		/>
	);
};

export default PhaseBlock;
