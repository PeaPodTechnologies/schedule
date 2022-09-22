import './CrudBlock.css';
import { FC } from 'react';
import InputBlock, { InputBlockProps } from '../atoms/InputBlock';
import CreateButton from './CreateButton';
import DeleteButton from './DeleteButton';
import SelectBlock, { SelectBlockProps } from '../atoms/SelectBlock';
import { underscoreJoin } from '../utils';
import { v4 as uuid4 } from 'uuid';
import { Stack } from '@mui/material';

interface CrudBlockProps {
	inputs?: InputBlockProps[];
	selects?: SelectBlockProps[];
	createLabel?: string;
	deleteLabel?: string;
	// generic create function
	create?(...keys: any[]): void;
	// generic delete function
	delete(...keys: any[]): void;
}

const CrudBlock: FC<CrudBlockProps> = props => {
	return (
		<div className="crudBlock" key={uuid4()}>
			<Stack direction="column">
				{
					// creating a SelectBlock component if there is data for it
					props.selects === undefined ? (
						<></>
					) : (
						props.selects.map((select, index) => {
							return <SelectBlock {...select} key={underscoreJoin('select', index)} />;
						})
					)
				}
				{
					// creating an InputBlock component if there is data for it
					props.inputs === undefined ? (
						<></>
					) : (
						props.inputs.map((input, index) => {
							return <InputBlock {...input} key={underscoreJoin('input', index)} />;
						})
					)
				}
			</Stack>
			<Stack direction="column">
				{
					// creating a CreateButton component if there is data for it
					props.create === undefined ? (
						<></>
					) : (
						<CreateButton callback={props.create} label={props.createLabel} />
					)
				}
				<DeleteButton callback={props.delete} />
			</Stack>
		</div>
	);
};

export default CrudBlock;
