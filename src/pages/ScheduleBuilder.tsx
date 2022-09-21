import { FC, useState } from 'react';
import './ScheduleBuilder.css';
import InputBlock from '../atoms/InputBlock';
import ParameterBlock from '../molecules/ParameterBlock';
import { v4 as uuid } from 'uuid';
import { mapPhaseToTarget, PhaseTypes } from '../types';
import { PEAPODAPI_REVISION, EnvironmentSchedule, SchedulePhase } from '@peapodtech/types';
import CallbackButton from '../atoms/CallbackButton';
import DownloadIcon from '@mui/icons-material/Download';
import { ensureNumber } from '../utils';

/**
 * the props for the schedulebuilder
 */
type ScheduleBuilderProps = {};

/**
 * these are the props for the download schedule button
 */
type DownloadScheduleProps = {
	state: string | boolean;
	callback(): void;
};

/**
 * this function validates an environment schedule
 * @param schedule the environment schedule to validate
 * @returns true if valid, string with error message otherwise
 */
const validateSchedule = (schedule: EnvironmentSchedule): boolean | string => {
	/// validating the top level of the schedule

	// checking the id
	if (schedule.id === undefined || typeof schedule.id !== 'string') {
		return 'the schedule is missing an id';
	}
	// checking the name
	if (schedule.name === undefined || typeof schedule.name !== 'string') {
		return 'the schedule is missing a name';
	}
	// checking the revision
	if (!ensureNumber(schedule.revision)) {
		return 'the schedule is missing a revision number';
	}

	/// validating the parameters
	if (Object.keys(schedule.parameters).length === 0) {
		return 'the schedule is missing parameters';
	} else {
		Object.keys(schedule.parameters).forEach(parameter => {
			// making a reference to the current object
			let context = schedule.parameters[parameter];

			/// validating each parameter
			if (context.length === 0) {
				return `parameter ${parameter} is missing a phase`;
			} else {
				/// validating each phase
				context.forEach((phase, phaseIndex) => {
					// checking the end
					if (!ensureNumber(phase.end) || phase.end < 0) {
						return `the 'end' of phase ${phaseIndex} of parameter ${parameter} is invalid`;
					}
					// checking the type
					if (phase.type === undefined || !Object.keys(PhaseTypes).includes(phase.type)) {
						return `the 'type' of phase ${phaseIndex} of parameter ${parameter} is invalid`;
					}
					// checking the targets
					if (phase.targets.length === 0) {
						return `phase ${phaseIndex} of parameter ${parameter} is missing targets`;
					} else {
						(
							phase.targets as {
								value: number;
								timestamp?: number;
								duration?: number;
							}[]
						).forEach((target, targetIndex) => {
							// checking the value
							if (!ensureNumber(target.value) || target.value < 0) {
								return `the 'value' target ${targetIndex} of phase ${phaseIndex} of parameter ${parameter} is invalid`;
							}
							// checking the duration/timestamp
							if (target.duration === undefined && target.timestamp === undefined) {
								return `target ${targetIndex} of phase ${phaseIndex} of parameter ${parameter} must have a timestamp or a duration`;
							}
						});
					}
				});
			}
		});
	}

	return true;
};

/**
 * this component generates a callback button based off of the result of `validateSchedule()`
 * this sadly cannot be inlined due to the conditional props
 * @param props the props to pass in
 * @returns a button with conditional props
 */
const DownloadSchedule: FC<DownloadScheduleProps> = props => {
	let conditionalProps: any = {};

	if (typeof props.state === 'string') {
		conditionalProps.text = props.state;
		conditionalProps.disabled = true;
	} else {
		conditionalProps.text = 'download schedule';
		conditionalProps.endIcon = <DownloadIcon />;
	}

	return <CallbackButton callback={props.callback} {...conditionalProps} />;
};

/**
 * this object's purpose is to contain/manage it's parameter blocks. those parameter blocks will modify a parameter
 * to the user's desire.
 *
 * it will have an export function that will turn all of the parameter blocks into a proper schedule format
 */
const ScheduleBuilder: FC<ScheduleBuilderProps> = _ => {
	const [schedule, setSchedule] = useState<EnvironmentSchedule>({
		// the initial state of the object
		id: 'peapod-schedule-' + uuid(),
		name: undefined,
		revision: PEAPODAPI_REVISION,
		parameters: {}
	});

	// function turns the schedule into a JSON string which can be downloaded
	const downloadSchedule = () => {
		/// removing the keys from each target which aren't necessary

		// creating new object
		let downloadable = { ...schedule };

		// removing excess keys
		Object.keys(downloadable.parameters).forEach(parameter => {
			// getting the parameter context
			let context = downloadable.parameters[parameter];

			// getting the targets of the context
			if (context.length > 0) {
				context.forEach((phase, phaseIndex) => {
					let type = phase.type;
					if (phase.targets.length > 0) {
						phase.targets.forEach((target, targetIndex) => {
							Object.keys(target).forEach(key => {
								if (key === 'value') return;
								if (mapPhaseToTarget(type) !== key) {
									console.log(
										`delete ${parameter}[${phaseIndex}][targets][${targetIndex}][${key}]`
									);
									delete (context[phaseIndex].targets as any)[targetIndex][key];
								}
							});
						});
					}
				});
			}
		});

		// BLOB-ify
		const blob = new Blob([JSON.stringify(downloadable, null, 2)], { type: 'application/json' });

		// Give it a URL
		const href = URL.createObjectURL(blob);

		// Create a download button, click it, remove it, and clean up
		const a = document.createElement('a');
		a.href = href;
		a.download = `${downloadable.id}.json`;
		document.body.appendChild(a);

		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(href);
	};

	// render function
	return (
		<div className="ScheduleBuilder">
			<div className="container">
				<div>
					{/* NO input for ID, autogenerated */}
					<InputBlock
						value={schedule.id}
						label="id"
						onBlur={newId => {
							setSchedule(old => {
								let newSchedule = { ...old };

								// updating the id of the schedule
								newSchedule.id = newId;

								// returning the new state
								return newSchedule;
							});
						}}
						readonly={true}
					></InputBlock>

					<InputBlock
						value={schedule.name ?? ''}
						label="name"
						onBlur={newName => {
							setSchedule(old => {
								let newSchedule = { ...old };

								// updating the name of the schedule
								newSchedule.name = newName;

								// returning the new state
								return newSchedule;
							});
						}}
					></InputBlock>

					{/* NO input, uses latest */}
					<InputBlock readonly={true} value={schedule.revision} label="revision"></InputBlock>
				</div>
			</div>

			{/* the purpose of this is to add a new entry into the parameterblock array */}
			<CallbackButton
				text="create a parameter"
				callback={() => {
					// generating a new id for each parameter until it is user defined
					let parameterEntry = uuid();
					setSchedule(old => {
						// getting all of the current parameters
						let newParameters = { ...old.parameters };

						// inserting the new parameter object into the global state
						newParameters[parameterEntry] = [
							{
								type: PhaseTypes.PIECEWISE,
								end: 0,
								targets: [
									{
										value: 0,
										timestamp: 0
									}
								]
							}
						];

						// logging
						console.log(
							`create ${parameterEntry}: ${JSON.stringify(newParameters[parameterEntry])}`
						);
						return { ...old, parameters: newParameters };
					});
				}}
			/>

			<DownloadSchedule state={validateSchedule(schedule)} callback={downloadSchedule} />

			<CallbackButton
				text="view schedule"
				callback={() => {
					console.log(schedule);
				}}
			/>

			<table>
				<tbody>
					{Object.entries(schedule.parameters).map(([parameter, phases]) => (
						// creating visual representations of each parameter
						<ParameterBlock
							key={parameter}
							parameter={parameter}
							phases={phases}
							update={(payload, ...keys) => {
								if (payload === 'name') {
									console.log(`rename ${parameter} to ${keys[0]}`);
								} else {
									console.log(
										`update ${parameter}${keys
											.map(key => {
												return `[${key}]`;
											})
											.join('')} = ${payload}`
									);
								}

								setSchedule(old => {
									// getting all of the current parameters
									let newParameters = { ...old.parameters };

									/// removing the object from the global state

									if (payload === 'name') {
										// getting the name from the keys
										let name = keys[0];

										// detecting name collisions
										if (Object.keys(newParameters).includes(name)) {
											alert(
												`Cannot rename ${parameter} to ${name} because ${name} already exists.`
											);
											return old;
										}

										// changing a parameter's name
										newParameters = Object.fromEntries(
											// the goal of this is to update the object's key **in place**
											// this prevents the parameters moving around on screen
											Object.entries(newParameters).map(([key, value]) => {
												return key === parameter ? [name, value] : [key, value];
											})
										);
									} else {
										// navigating to the right context
										let context: any = newParameters[parameter];

										// getting the index of the thing we want to remove
										let key: number = keys.pop();

										// walking the object
										keys.forEach(key => {
											context = context[key];
										});

										// updating the value of the object
										context[key] = payload;
									}

									// returning the new global state
									return { ...old, parameters: newParameters };
								});
							}}
							create={(payload, ...keys) => {
								console.log(
									`create ${parameter}${keys
										.map(key => {
											return `[${key}]`;
										})
										.join('')}[+1] = ${JSON.stringify(payload)}`
								);
								setSchedule(old => {
									// getting all of the current parameters
									let newParameters = { ...old.parameters };

									/// inserting the new parameter object into the global state

									// navigating to the right context
									let context: any = newParameters[parameter];

									keys.forEach(key => {
										context = context[key];
									});

									// adding the payload
									(context as SchedulePhase[]).push(payload);

									// returning the new global state
									return { ...old, parameters: newParameters };
								});
							}}
							delete={(...keys) => {
								console.log(
									`delete ${parameter}${keys
										.map(key => {
											return `[${key}]`;
										})
										.join('')}`
								);

								setSchedule(old => {
									// getting all of the current parameters
									let newParameters = { ...old.parameters };

									/// removing the object from the global state

									if (keys.length === 0) {
										// we are removing a parameter
										delete newParameters[parameter];
									} else {
										// navigating to the right context
										let context: any = newParameters[parameter];

										// getting the index of the thing we want to remove
										let index: number = keys.pop();

										// walking the object
										keys.forEach(key => {
											context = context[key];
										});

										// removing the target object
										(context as SchedulePhase[]).splice(index, 1);
									}

									// returning the new global state
									return { ...old, parameters: newParameters };
								});
							}}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ScheduleBuilder;
