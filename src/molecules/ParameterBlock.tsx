import { SchedulePhase } from '@peapodtech/types';
import { FC } from 'react';
import { underscoreJoin } from '../utils';
import InputBlock from '../atoms/InputBlock';
import PhaseBlock from './PhaseBlock';
import DeleteButton from './DeleteButton';
import CreateButton from './CreateButton';
import { PhaseTypes } from '../atoms/types';

export type ValidFields = 'end' | 'type' | 'targets';

/**
 * these are the expected props that can be passed into the object
 */
type ParameterBlockProps = {
	phases: SchedulePhase[];
	parameter: string;
	// generic delete function
	delete(...keys: any[]): void;
	// generic update function
	update(value: any, ...keys: any[]): void;
	// generic create function
	create(payload: any, ...keys: any[]): void;
};

const ParameterBlock: FC<ParameterBlockProps> = props => {
	return (
		<tr key={props.parameter}>
			<td>
				<InputBlock
					label="Parameter Name"
					onBlur={name => {
						props.update('name', name);
					}}
					value={props.parameter}
				/>
				<CreateButton
					callback={() => {
						props.create(
							{
								type: PhaseTypes.PIECEWISE,
								end: 0,
								targets: []
							}
						);
					}}
					text="create a new phase"
				/>
				<DeleteButton callback={props.delete} />
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
											update={(value, ...keys) => {
												props.update(value, index, ...keys);
											}}
											delete={(...keys) => {
												if (keys.length > 0) {
													// if there are keys, we are deleting a target
													props.delete(index, ...keys);
												} else {
													// if there are no keys, we are deleting a phase
													props.delete(index);
												}
											}}
											create={(payload, ...keys) => {
												props.create(payload, index, ...keys);
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
