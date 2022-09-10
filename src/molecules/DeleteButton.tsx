import { FC } from 'react';
import { toCapitalCase } from '../utils';
import CallbackButton from '../atoms/CallbackButton';

interface DeleteButtonProps {
	callback(): void;
	text?: string;
}

const DeleteButton: FC<DeleteButtonProps> = props => (
	<CallbackButton text={toCapitalCase(props.text ?? 'delete')} callback={props.callback} />
);

export default DeleteButton;
