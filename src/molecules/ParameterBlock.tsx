import { SchedulePhase } from '@peapodtech/types';
import { FC } from 'react';
import InputBlock from './InputBlock';
import PhaseBlock from './PhaseBlock';

/**
 * these are the types of functions the peapod can use to control its environment
 */
export enum PhaseTypes {
	PIECEWISE = 'piecewise',
	PERIODIC = 'periodic'
}

export type ValidFields = 'end' | 'type' | 'targets';

/**
 * these are the expected props that can be passed into the object
 */
type ParameterBlockProps = {
	phases: SchedulePhase[];
	parameter: string;
	updateParameter(oldParameter: string, newParameter: string): void;
	updatePhase(index: number, field: ValidFields, value: any): void;
};

const ParameterBlock: FC<ParameterBlockProps> = props => {
	return (
		<tr key={props.parameter}>
			<td>
				<InputBlock
					label={props.parameter}
					onBlur={name => {
						// testing if the new name is undefined or an empty string
						if (!!name) props.updateParameter(props.parameter, name);
						else console.log('not renaming to empty string');
					}}
					value={props.parameter}
				/>
			</td>
			<td>
				<ol start={1}>
					{props.phases.map((phase, index) => {
						return (
							<li key={index}>
								<PhaseBlock
									type={phase.type}
									end={phase.end}
									targets={phase.targets}
									onUpdate={(field: ValidFields, value: any) => {
										props.updatePhase(index, field, value);
									}}
								/>
							</li>
						);
					})}
				</ol>
			</td>
		</tr>
	);
};

export default ParameterBlock;
