import { FC } from 'react';

interface InputBlockProps {
  label: string
}

const InputBlock : FC<InputBlockProps> = (props) => (
  <div>
    <label htmlFor={props.label}>
      { props.label[0].toUpperCase() + props.label.substring(1) + ": " }
    </label>
    <input type="text" name={props.label} id={props.label} />
  </div>
);

export default InputBlock;