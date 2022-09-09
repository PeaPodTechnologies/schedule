import { FC } from 'react';
import InputBlock from './InputBlock';

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
                <td>
				<InputBlock
					label={props.parameter}
					onBlur={name => {
                        // testing if the new name is undefined or an empty string
                        if (!!name) props.updateParameter(props.parameter, name);
                        else console.log("not renaming to empty string")
					}}
                    value={props.parameter}
				/>
			</td>
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
