import { FC } from 'react';
import DeleteButton from '../atoms/DeleteButton';
import InputBlock from '../atoms/InputBlock';
import { PhaseTypes } from './ParameterBlock';

/**
 * these are the expected props that can be passed into the object
 */
interface TargetBlockProps {
	value: number;
	timestamp?: number;
	duration?: number;
	type: PhaseTypes;
	// generic update function
	update(value: any, ...keys: any[]): void;
	// generic delete function
	delete(...keys: any[]): void;
}

const TargetBlock: FC<TargetBlockProps> = props => {
	let label: 'duration' | 'timestamp';

	// setting the proper label based on type
	switch (props.type) {
		case PhaseTypes.PIECEWISE:
			label = 'timestamp';
			break;
		case PhaseTypes.PERIODIC:
			label = 'duration';
			break;
		default:
			label = 'timestamp';
			break;
	}

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
					updateValue(value);
				}}
			/>
			<InputBlock
				label={label}
				value={props[label] ?? ''}
				onBlur={value => {
					updateTime(value);
				}}
			/>
			<DeleteButton callback={props.delete} text="delete this target" />
		</div>
	);
};

export default TargetBlock;
