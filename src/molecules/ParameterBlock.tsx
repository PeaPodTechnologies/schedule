import { FC } from 'react';
import { underscoreJoin } from '../utils';

/**
 * these are the types of functions the peapod can use to control its environment
 */
enum PhaseTypes {
	PIECEWISE = 'piecewise',
	PERIODIC = 'periodic'
}

/**
 * these are the expected props that can be passed into the object
 */
type ParameterBlockProps = {
	type?: PhaseTypes;
	parameter: string;
	updateType(type: PhaseTypes): void;
};

const ParameterBlock: FC<ParameterBlockProps> = props => {
	// creating ids
	let paramId = underscoreJoin('select', 'parameterBlock', props.parameter);

	return (
		<tr>
			{/* Dropdown for number of phases, used to generate PhaseBlocks (ToBeDeveloped) */}
			<td>
				<label htmlFor={underscoreJoin(paramId, 2)}>Phase Type:</label>
				<select
					onChange={event => props.updateType(event.target.value as PhaseTypes)}
					name={underscoreJoin(paramId, 2)}
				>
					{Object.entries(PhaseTypes).map(type => {
						return <option value={type[0]}>{type[1]}</option>;
					})}
				</select>
			</td>
		</tr>
	);
};

export default ParameterBlock;