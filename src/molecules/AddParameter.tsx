import { FC } from 'react';

type AddParameterProps = {
	addParameter(): void;
};

/**
 * this object's purpose is to add another entry into the ScheduleBuilder's
 * ParameterBlock array.
 * 
 * this object is stateless and has one purpose, its function is to 
 * add a new ParameterBlock into the parent object.
 * in this case, it's the ScheduleBuilder
 */
const AddParameter: FC<AddParameterProps> = props => {
	return (
		<>
			<button
				onClick={() => {
					props.addParameter();
				}}
			>
				Add a new parameter
			</button>
		</>
	);
};

export default AddParameter;
