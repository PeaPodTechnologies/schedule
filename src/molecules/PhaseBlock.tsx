import { FC } from 'react';
import { ensureNumber, underscoreJoin } from '../utils';
import InputBlock from '../atoms/InputBlock';
import TargetBlock from './TargetBlock';
import DeleteButton from './DeleteButton';
import CreateButton from './CreateButton';
import { PhaseTypes } from '../atoms/types';
import SelectBlock from '../atoms/SelectBlock';

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
		<>
			<div>
				<SelectBlock label="type" onChange={updateType} text="Phase Type" options={PhaseTypes} />
				<InputBlock label="end" onBlur={value => {
                    /// performing input validation
					if (ensureNumber(value)) {
						updateEnd(parseFloat(value));
					} else {
						alert(`${value} is not a valid number for value`);
					}
                }} value={props.end} />
				<CreateButton
					callback={() => {
						props.create(
							{
								value: 0,
								timestamp: 0,
								duration: 0
							},
							'targets'
						);
					}}
					text="create new target"
				/>
			</div>
			<DeleteButton callback={props.delete} text="delete this phase" />
		</>
	);
};

export default PhaseBlock;
