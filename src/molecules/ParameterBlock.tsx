import { FC } from 'react';

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
	return (
		<tr>
			{/* Dropdown for number of phases, used to generate PhaseBlocks (ToBeDeveloped) */}
			<td>
				<label htmlFor={'select' + props.parameter}>Type:</label>
				<select
					onChange={event => props.updateType(event.target.value as PhaseTypes)}
					name={'select-' + props.parameter}
				>
					{Object.entries(PhaseTypes).map(type => {
						return <option value={type[1]}>{type[0]}</option>;
					})}
				</select>
			</td>
		</tr>
	);
};

export default ParameterBlock;
