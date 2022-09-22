import { FC } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { toLabel } from '../utils';

interface DeleteButtonProps {
	callback(): void;
	label?: string;
}

const DeleteButton: FC<DeleteButtonProps> = props => (
	<IconButton
		onClick={() => {
			props.callback();
		}}
		aria-label={toLabel(props.label ?? '')}
	>
		<DeleteForeverIcon />
	</IconButton>
);

export default DeleteButton;
