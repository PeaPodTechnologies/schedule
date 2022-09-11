import { SchedulePhase } from '@peapodtech/types';
import { FC } from 'react';
import { ensureNumber, underscoreJoin } from '../utils';
import InputBlock from '../atoms/InputBlock';
import PhaseBlock from './PhaseBlock';
import DeleteButton from './DeleteButton';
import CreateButton from './CreateButton';
import { PhaseTypes } from '../atoms/types';
import TargetBlock from './TargetBlock';

export type ValidFields = 'end' | 'type' | 'targets';

/**
 * these are the expected props that can be passed into the object
 */
type ParameterBlockProps = {
	phases: SchedulePhase[];
	parameter: string;
	// generic create function
	create(payload: any, ...keys: any[]): void;
	// generic update function
	update(payload: any, ...keys: any[]): void;
	// generic delete function
	delete(...keys: any[]): void;
};

const ParameterBlock: FC<ParameterBlockProps> = props => {
	return (
		<>
			<tr key={props.parameter} id={props.parameter}>
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
							props.create({
								type: PhaseTypes.PIECEWISE,
								end: 0,
								targets: [
									{
										value: 0,
										timestamp: 0,
										duration: 0
									}
								]
							});
						}}
						text="create a new phase"
					/>
					<DeleteButton callback={props.delete} />
				</td>
			</tr>
			{
				// conditional rendering
				props.phases === undefined ? (
					<></>
				) : (
					props.phases.map((phase, phaseIndex) => {
                        let phaseId = underscoreJoin(props.parameter, 'phase', phaseIndex);
						return (
							<tr key={phaseId} id={phaseId}>
								<td></td>
								<td>
									<PhaseBlock
										// passing in props
										type={phase.type as PhaseTypes}
										end={phase.end}
										targets={phase.targets}
										update={(value, ...keys) => {
											props.update(value, phaseIndex, ...keys);
										}}
										delete={(...keys) => {
											if (keys.length > 0) {
												// if there are keys, we are deleting a target
												props.delete(phaseIndex, ...keys);
											} else {
												// if there are no keys, we are deleting a phase
												props.delete(phaseIndex);
											}
										}}
										create={(payload, ...keys) => {
											props.create(payload, phaseIndex, ...keys);
										}}
									/>
								</td>
								<td>
									{
										// conditional rendering
										phase.targets === undefined ? (
											<></>
										) : (
											<ol start={1}>
												{(
													phase.targets as {
														value: number;
														timestamp?: number;
														duration?: number;
													}[]
												).map((target, targetIndex) => {
													let targetId = underscoreJoin('phase', phaseIndex, 'target', targetIndex);
													return (
														<li key={targetId} id={targetId}>
															<TargetBlock
																timestamp={target.timestamp}
																duration={target.duration}
																type={phase.type as PhaseTypes}
																value={target.value}
																update={(value, field) => {
																	/// performing input validation
																	if (ensureNumber(value)) {
																		props.update(
																			parseFloat(value),
																			phaseIndex,
																			'targets',
																			targetIndex,
																			field
																		);
																	} else {
																		alert(`${value} is not a valid number for ${field}`);
																	}
																}}
																delete={() => {
																	props.delete(phaseIndex, 'targets', targetIndex);
																}}
															/>
														</li>
													);
												})}
											</ol>
										)
									}
								</td>
							</tr>
						);
					})
				)
			}
		</>
	);
};

export default ParameterBlock;
