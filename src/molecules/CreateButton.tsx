import { FC } from 'react';
import { toCapitalCase } from '../utils';
import CallbackButton from '../atoms/CallbackButton';

interface CreateButtonProps {
	callback(): void;
	text?: string;
}

const CreateButton: FC<CreateButtonProps> = props => (
	<CallbackButton text={toCapitalCase(props.text ?? 'create')} callback={props.callback} />
);

export default CreateButton;
