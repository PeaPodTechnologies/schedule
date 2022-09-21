import { FC } from 'react';
import { mapPhaseToTarget, PhaseTargets, PhaseTypes } from '../types';
import { ensureNumber } from '../utils';
import CrudBlock from './CrudBlock';

/**
 * these are the expected props that can be passed into the object
 */
interface TargetBlockProps {
	value: number;
	timestamp?: number;
	duration?: number;
	type: PhaseTypes;
	// generic update function
	update(payload: any, ...keys: any[]): void;
	// generic delete function
	delete(...keys: any[]): void;
}

const TargetBlock: FC<TargetBlockProps> = props => {
	// setting the proper label based on type
	let label: PhaseTargets = mapPhaseToTarget(props.type).toLowerCase() as PhaseTargets;

	// wrapper to value the type of the target
	const updateValue = (value: number) => {
		return props.update(value, 'value');
	};

	// wrapper to update the time (duration/timestamp) of the phase
	const updateTime = (time: number) => {
		return props.update(time, label);
	};

	// rendering
	return (
		<CrudBlock
			inputs={[
				{
					label: 'value',
					value: props.value,
					onBlur: value => {
						/// performing input validation
						if (ensureNumber(value)) {
							updateValue(parseFloat(value));
						} else {
							alert(`${value} is not a valid number for value`);
						}
					},
					size: 10,
					type: 'number',
					adornmentUnit: 'unit',
					step: 0.1
				},
				{
					label: label,
					value: props[label] ?? 0,
					onBlur: value => {
						/// performing input validation
						if (ensureNumber(value)) {
							updateTime(parseFloat(value));
						} else {
							alert(`${value} is not a valid number for ${label}`);
						}
					},
					size: 10,
					type: 'number',
					adornmentUnit: 'ms',
					step: 1000
				}
			]}
			delete={props.delete}
		/>
	);
};

export default TargetBlock;
