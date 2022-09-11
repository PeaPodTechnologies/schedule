import { FC, useState } from 'react';
import './ScheduleBuilder.css';
import InputBlock from '../atoms/InputBlock';
import AddParameter from '../molecules/AddParameter';
import ParameterBlock from '../molecules/ParameterBlock';
import { v4 as uuid } from 'uuid';
import { PhaseTypes } from '../atoms/types';
import { PEAPODAPI_REVISION, EnvironmentSchedule, SchedulePhase } from '@peapodtech/types';

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
							update={(value, ...keys) => {
								if (value === "name") {
                                    console.log(`> rename ${parameter} to ${keys[0]}`)
                                } else {
                                    console.log(
                                        `update ${parameter}${keys
                                            .map(key => {
                                                return `[${key}]`;
                                            })
                                            .join('')} = ${value}`
                                    );
                                }
							}}
							create={(payload, ...keys) => {
								console.log(
									`create ${parameter}${keys
										.map(key => {
											return `[${key}]`;
										})
										.join('')}[+1] = ${JSON.stringify(payload)}`
								);
							}}
							delete={(...keys) => {
								console.log(
									`delete ${parameter}${keys
										.map(key => {
											return `[${key}]`;
										})
										.join('')}`
								);
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
