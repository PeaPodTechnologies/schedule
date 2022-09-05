interface InputBlockProps {
    label: string
}

function InputBlock(props: InputBlockProps) {
    return <div>
        <label htmlFor={props.label}>
            {
                props.label[0].toUpperCase() + props.label.substring(1) + ": "
            }
        </label>
        <input type="text" name={props.label} id={props.label} />
    </div>
}

export default InputBlock;