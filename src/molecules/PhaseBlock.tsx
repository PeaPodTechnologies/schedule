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
				<InputBlock label="end" onBlur={updateEnd} value={props.end} />
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
			{props.targets === undefined ? (
				<></>
			) : (
				<>
					<ol start={1}>
						{props.targets.map((target, index) => {
							return (
								<li key={underscoreJoin('target', index)}>
									<TargetBlock
										timestamp={target.timestamp}
										duration={target.duration}
										type={props.type}
										value={target.value}
										update={(value, field) => {
											/// performing input validation
											if (ensureNumber(value)) {
												props.update(parseFloat(value), 'targets', index, field);
											} else {
												alert(`${value} is not a valid number for ${field}`);
											}
										}}
										delete={() => {
											props.delete('targets', index);
										}}
									/>
								</li>
							);
						})}
					</ol>
				</>
			)}
			<DeleteButton callback={props.delete} text="delete this phase" />
		</>
	);
};

export default PhaseBlock;
