import { FC, useState } from 'react';

type AddParameterProps = {
  addParameter(parameter: string): void;
};

const AddParameter : FC<AddParameterProps> = (props) => {
  const [name, setName] = useState('');
  return (
    <>
    {/* ADD: Input field for parameter name, triggering `setName` */}
      <button
        onClick={() => {
          props.addParameter(name);
        }}
      >
        Add Parameter
      </button>
    </>
  );
};

export default AddParameter;