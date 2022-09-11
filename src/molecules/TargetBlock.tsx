import { FC } from 'react';
import DeleteButton from './DeleteButton';
import InputBlock from '../atoms/InputBlock';
import { mapPhaseToTarget, PhaseTargets, PhaseTypes } from '../atoms/types';
import { ensureNumber } from '../utils';

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
		<div>
			<InputBlock
				label="value"
				value={props.value}
				onBlur={value => {
					/// performing input validation
					if (ensureNumber(value)) {
						updateValue(parseFloat(value));
					} else {
						alert(`${value} is not a valid number for value`);
					}
				}}
			/>
			<InputBlock
				label={label}
				value={props[label] ?? ''}
				onBlur={value => {
					/// performing input validation
					if (ensureNumber(value)) {
						updateTime(parseFloat(value));
					} else {
						alert(`${value} is not a valid number for ${label}`);
					}
				}}
			/>
			<DeleteButton callback={props.delete} text="delete this target" />
		</div>
	);
};

export default TargetBlock;
