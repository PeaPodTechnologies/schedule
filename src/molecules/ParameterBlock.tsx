import { SchedulePhase } from '@peapodtech/types';
import { FC } from 'react';
import { underscoreJoin } from '../utils';
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
	// the callback to change the parameter's name
	updateParameter(newParameter: string): void;
	// passing a callback to update the phase itself
	updatePhase(index: number, field: ValidFields, value: any): void;
	// passing a callback to update the target itself
	updateTarget(
		phaseIndex: number,
		targetIndex: number,
		field: 'value' | 'timestamp' | 'duration',
		value: number
	): void;
	// callback to delete a phase
	deletePhase(index: number): void;
	// callback to delete a target
	deleteTarget(phaseIndex: number, targetIndex: number): void;
};

const ParameterBlock: FC<ParameterBlockProps> = props => {
	return (
		<tr key={props.parameter}>
			<td>
				<InputBlock
					label="Parameter Name"
					onBlur={name => {
						// testing if the new name is undefined or an empty string
						if (!!name) props.updateParameter(name);
						else console.log('not renaming to empty string');
					}}
					value={props.parameter}
				/>
			</td>
			{
				// conditional rendering
				props.phases == undefined ? (
					<></>
				) : (
					<td>
						<ol start={1}>
							{props.phases.map((phase, index) => {
								return (
									<li key={underscoreJoin('phase', index)}>
										<PhaseBlock
											// passing in props
											type={phase.type as PhaseTypes}
											end={phase.end}
											targets={phase.targets}
											onUpdate={(field: ValidFields, value: any) => {
												props.updatePhase(index, field, value);
											}}
											updateTarget={(targetIndex, field, value) => {
												props.updateTarget(index, targetIndex, field, value);
											}}
											delete={() => {
												props.deletePhase(index);
											}}
											deleteTarget={targetIndex => {
												props.deleteTarget(index, targetIndex);
											}}
										/>
									</li>
								);
							})}
						</ol>
					</td>
				)
			}
		</tr>
	);
};

export default ParameterBlock;
