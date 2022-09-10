import { FC } from 'react';
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
	// a generic function which we will expand on within the component
	onUpdate(field: 'duration' | 'timestamp' | 'value', value: number): void;
	// callback to delete the target from the object
	delete(): void;
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
		return props.onUpdate('value', value);
	};

	// wrapper to update the time (duration/timestamp) of the phase
	const updateTime = (time: number) => {
		return props.onUpdate(label, time);
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
			<div>
				<button onClick={props.delete}>Delete this target</button>
			</div>
		</div>
	);
};

export default TargetBlock;
