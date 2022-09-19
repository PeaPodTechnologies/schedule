import './CrudBlock.css';
import { FC } from 'react';
import InputBlock, { InputBlockProps } from '../atoms/InputBlock';
import CreateButton from './CreateButton';
import DeleteButton from './DeleteButton';
import SelectBlock, { SelectBlockProps } from '../atoms/SelectBlock';
import { underscoreJoin } from '../utils';
import { v4 as uuid4 } from 'uuid';

interface CrudBlockProps {
	inputs?: InputBlockProps[];
	selects?: SelectBlockProps[];
	createLabel?: string;
	// generic create function
	create?(...keys: any[]): void;
	// generic delete function
	delete(...keys: any[]): void;
}

const CrudBlock: FC<CrudBlockProps> = props => {
	return (
		<div className="crudBlock" key={uuid4()}>
			<div>
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
				{
					// creating a CreateButton component if there is data for it
					props.create === undefined ? (
						<></>
					) : (
						<CreateButton callback={props.create} text={props.createLabel} />
					)
				}
			</div>
			<div>
				<DeleteButton callback={props.delete} />
			</div>
		</div>
	);
};

export default CrudBlock;
