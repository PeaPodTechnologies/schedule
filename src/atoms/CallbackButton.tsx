import { FC } from 'react';

interface CallbackButtonProps {
	callback(): void;
	text?: string;
}

const CallbackButton: FC<CallbackButtonProps> = props => (
	<div>
		<button
			onClick={() => {
				props.callback();
			}}
		>
			{props.text}
		</button>
	</div>
);

export default CallbackButton;
