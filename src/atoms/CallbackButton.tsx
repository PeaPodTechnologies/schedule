import { FC } from 'react';
import { Button } from '@mui/material';

interface CallbackButtonProps {
	callback(): void;
	text?: string;
}

const CallbackButton: FC<CallbackButtonProps> = props => (
	<div>
		<Button variant="outlined"
			onClick={() => {
				props.callback();
			}}
		>
			{props.text}
		</Button>
	</div>
);

export default CallbackButton;
