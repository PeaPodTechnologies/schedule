import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { toLabel } from '../utils';

interface CreateButtonProps {
	callback(): void;
	label?: string;
}

const CreateButton: FC<CreateButtonProps> = props => (
	<IconButton
		onClick={() => {
			props.callback();
		}}
		aria-label={toLabel(props.label ?? '')}
	>
		<AddIcon />
	</IconButton>
);

export default CreateButton;
