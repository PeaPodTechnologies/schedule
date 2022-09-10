import { FC } from 'react';
import { capitalCase } from '../utils';

interface DeleteButtonProps {
	callback(): void;
	text?: string;
}

const DeleteButton: FC<DeleteButtonProps> = props => (
	<div>
		<button
			onClick={() => {
				props.callback();
			}}
		>
			{capitalCase(props.text ?? 'delete')}
		</button>
	</div>
);

export default DeleteButton;
