import { FC, useState } from 'react';
import './ScheduleBuilder.css';
import InputBlock from '../molecules/InputBlock';
import AddParameter from '../molecules/AddParameter';
import ParameterBlock, { PhaseTypes } from '../molecules/ParameterBlock';
import { v4 as uuid } from 'uuid';
import { PEAPODAPI_REVISION, EnvironmentSchedule } from '@peapodtech/types';

type ScheduleBuilderProps = {};

/**
 * this object's purpose is to contain/manage it's parameter blocks. those parameter blocks will modify a parameter
 * to the user's desire.
 *
 * it will have an export function that will turn all of the parameter blocks into a proper schedule format
 */
const ScheduleBuilder: FC<ScheduleBuilderProps> = props => {
	const [schedule, setSchedule] = useState<EnvironmentSchedule>({
		// the initial state of the object
		id: 'peapod-schedule-' + uuid(),
		name: undefined,
		revision: PEAPODAPI_REVISION,
		// using a map to remember the order of entries
		parameters: {}
	});

	// WIP: converting the parameterblocks into a proper EnvironmentSchedule, ignore
	const downloadSchedule = () => {
		// BLOB-ify
		const blob = new Blob([JSON.stringify(schedule, null, 2)], { type: 'application/json' });

		// Give it a URL
		const href = URL.createObjectURL(blob);

		// Create a download button, click it, remove it, and clean up
		const a = document.createElement('a');
		a.href = href;
		a.download = `${schedule.id}.json`;
		document.body.appendChild(a);

		a.click();

		document.body.removeChild(a);
		URL.revokeObjectURL(href);
	};

	// render function
	return (
		<div className="ScheduleBuilder">
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
			></InputBlock>

			{/* add prop `onUpdate(name: string) => void` that sets schedule.name */}
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
			<InputBlock readonly={true} label="revision" onBlur={() => null}></InputBlock>

			{/* the purpose of this is to add a new entry into the parameterblock array */}
			<AddParameter
				addParameter={() => {
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
						console.log(`added param '${parameterEntry}'`, newParameters);
						return { ...old, parameters: newParameters };
					});
				}}
			/>

			<button
				onClick={() => {
					console.log(schedule.parameters);
				}}
			>
				View Params
			</button>

			<table>
				<thead></thead>
				<tbody>
					{Object.entries(schedule.parameters).map(([parameter, phases]) => (
						// creating visual representations of each parameter
						<ParameterBlock
							parameter={parameter}
							phases={phases}
							updateParameter={newParameter => {
								// retuning if we're setting something to itself
								if (parameter === newParameter) return;

								// changing the name of the parameter
								setSchedule(old => {
									console.log(`called updateParam with ${parameter}, ${newParameter}`);

									// creating new parameters from the old parameters
									let newParameters = { ...old.parameters };

									// changing the name of current param
									newParameters = Object.fromEntries(
										// the goal of this is to update the object's key **in place**
										// this prevents the parameters moving around on screen
										Object.entries(newParameters).map(([key, value]) => {
											return key === parameter ? [newParameter, value] : [key, value];
										})
									);

									// returning the new state
									return { ...old, parameters: newParameters };
								});
							}}
							updatePhase={(index, field, value) => {
								setSchedule(old => {
									console.log(`> ${parameter}[${index}][${field}] = ${value}`);

									// creating new parameters from the old parameters
									let newParameters = { ...old.parameters };

									// updating the phase's `field` to value `value`
									switch (field) {
										// using a switch to make typescript happy
										case 'end':
											newParameters[parameter][index][field] = value;
											break;
										case 'type':
											newParameters[parameter][index][field] = value;
											break;
										case 'targets':
											newParameters[parameter][index][field] = value;
											break;
									}

									// returning the new state
									return { ...old, parameters: newParameters };
								});
							}}
							updateTarget={(phaseIndex, targetIndex, field, value) => {
								console.log(`> ${parameter}[${phaseIndex}][${targetIndex}][${field}] = ${value}`);

								setSchedule(old => {
									// creating new parameters from the old parameters
									let newParameters = { ...old.parameters };

									// getting a pointer to the target
									let base = newParameters[parameter][phaseIndex].targets[targetIndex];

									// updating the target's `field` to value `value`
									switch (field) {
										// using a switch to make typescript happy
										case 'timestamp':
											// need to type cast
											(base as { value: number; timestamp: number }).timestamp = value;
											break;
										case 'duration':
											(base as { value: number; duration: number }).duration = value;
											break;
										case 'value':
											newParameters[parameter][phaseIndex].targets[targetIndex].value = value;
											break;
									}

									// returning the new state
									return { ...old, parameters: newParameters };
								});
							}}
							deletePhase={phaseIndex => {
								console.log(`-phase ${parameter}[${phaseIndex}]`);

								setSchedule(old => {
									// creating new parameters from the old parameters
									let newParameters = { ...old.parameters };

									// removing the phase from the schedule
									delete newParameters[parameter][phaseIndex];

									return { ...old, parameters: newParameters };
								});
							}}
							deleteTarget={(phaseIndex, targetIndex) => {
								console.log(`-target ${parameter}[${phaseIndex}][${targetIndex}]`);

								setSchedule(old => {
									// creating new parameters from the old parameters
									let newParameters = { ...old.parameters };

									// removing the phase from the schedule
									delete newParameters[parameter][phaseIndex].targets[targetIndex];

									return { ...old, parameters: newParameters };
								});
							}}
						/>
					))}
				</tbody>
			</table>
			{/* DOWNLOAD BUTTON: Create a component with an `onClick: (void)=>void` callback parameter set to {downloadSchedule} */}
		</div>
	);

	// need an export to json function this function will look through its children and create a schedule.json from them
};

export default ScheduleBuilder;
