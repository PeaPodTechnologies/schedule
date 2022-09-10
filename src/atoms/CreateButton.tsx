import { FC } from 'react';
import { capitalCase } from '../utils';

interface CreateButtonProps {
	callback(): void;
	text?: string;
}

const CreateButton: FC<CreateButtonProps> = props => (
	<div>
		<button
			onClick={() => {
				props.callback();
			}}
		>
			{capitalCase(props.text ?? 'Create')}
		</button>
	</div>
);

export default CreateButton;
