import { FC } from 'react';
import { Button } from '@mui/material';

interface CallbackButtonProps {
	callback(): void;
	text?: string;
	startIcon?: JSX.Element;
	endIcon?: JSX.Element;
	disabled?: boolean;
}

const CallbackButton: FC<CallbackButtonProps> = props => {
	return (
		<div>
			<Button
				disabled={props.disabled}
				variant="outlined"
				onClick={() => {
					props.callback();
				}}
				startIcon={props.startIcon}
				endIcon={props.endIcon}
			>
				{props.text}
			</Button>
		</div>
	);
};

export default CallbackButton;
