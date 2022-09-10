import { FC } from 'react';
import { underscoreJoin } from '../utils';
import InputBlock from './InputBlock';
import { PhaseTypes, ValidFields } from './ParameterBlock';
import TargetBlock from './TargetBlock';

/**
 * these are the expected props that can be passed into the object
 */
interface PhaseBlockProps {
	type: PhaseTypes;
    end: number;
    targets?: {
        value: number;
        timestamp?: number;
        duration?: number
    }[]
    // a generic function which we will expand on within the component
	onUpdate(field: ValidFields, value: any): void;
	// passing in a callback for the target to update itself
	updateTarget(targetIndex: number, field: any, value: number): void;
	// callback to delete a target from the phase
	deleteTarget(targetIndex: number): void;
}

const PhaseBlock: FC<PhaseBlockProps> = props => {
    const updateType = (value: string) => {
        return props.onUpdate("type", value);
    }

    const updateEnd = (value: number) => {
        return props.onUpdate("end", value);
    }

	// rendering
	return (
		<>
			<div>
        <InputBlock label="type" onBlur={updateType} value={props.type} />
        <InputBlock label="end" onBlur={updateEnd} value={props.end} />
			</div>
			{props.targets == undefined ? (
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
										onUpdate={(field, value) => {
											props.updateTarget(index, field, value);
										}}
										delete={() => {
											props.deleteTarget(index);
										}}
									/>
								</li>
							);
						})}
					</ol>
				</>
			)}
		</>
	);
};

export default PhaseBlock;
