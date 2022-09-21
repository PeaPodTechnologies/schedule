import { FC } from 'react';
import { Button } from '@mui/material';

interface CallbackButtonProps {
	callback(): void;
	text?: string;
    startIcon?: JSX.Element;
    endIcon?: JSX.Element;
}

const CallbackButton: FC<CallbackButtonProps> = props => (
	<div>
		<Button
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

export default CallbackButton;
