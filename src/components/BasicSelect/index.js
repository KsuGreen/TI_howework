import './index.css';

export const Select = (props) => {
    const options = props.options;
    const placeholder = props.placeholder;
    const onChange = props.onChange;
    const title = props.title;

    let defaultValue = props.value;
    if (!defaultValue) {
        defaultValue = '-1';
    }
    return (
        <div className={'Select-Wrapper'}>
            <div className={"Select-Title"}>{title}</div>
            <select className="Select" defaultValue={defaultValue} size="1" onChange={onChange}>
                <option value={'-1'} disabled>{placeholder}</option>
                { options.map( (value, index) => {
                    return (
                        <option key={index} value={index}>{value}</option>
                    );
                } ) }
            </select>
        </div>
    );
}
