import { FC } from 'react';
import { underscoreJoin } from '../utils';

/**
 * these are the types of functions the peapod can use to control its environment
 */
export enum PhaseTypes {
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
    // updateParameter(oldParameter: string, newParameter: ParameterTypes): void;
};

const ParameterBlock: FC<ParameterBlockProps> = props => {
	// creating ids
	let paramId = underscoreJoin('select', 'parameterBlock', props.parameter);

	return (
		<tr>

			{/* WIP: adding the capability to change this parameter. ignore
                <td>
				<label htmlFor={underscoreJoin(paramId, 1)}>Parameter:</label>
				<select
					onChange={event => props.updateParameter(props.parameter, event.target.value as ParameterTypes)}
					name={underscoreJoin(paramId, 1)}
				>
					{Object.entries(ParameterTypes).map(type => {
						return <option value={type[0]}>{type[1]}</option>;
					})}
				</select>
			</td> */}
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
