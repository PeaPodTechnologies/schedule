import { FC } from 'react';
import { ensureAll, ensureDefined, ensureDifferent } from '../utils';
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
		/// performing input validation
		if (ensureDefined(value) && ensureDifferent(value, props.type)) {
			return props.update(value, 'type');
		}
	};

	// wrapper to update the end of the phase
	const updateEnd = (value: string) => {
		/// performing input validation
		if (ensureAll(value, props.end)) {
			return props.update(parseFloat(value), 'end');
		}
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
					onBlur: updateEnd,
					value: props.end,
					size: 10,
					type: 'number',
					adornmentUnit: 'ms',
					step: 1000
				}
			]}
			createLabel="new target"
			deleteLabel="delete this phase"
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
