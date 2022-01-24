import './index.css';

export const Input = (props) => {
    const { title, onChange, value } = props;

    return (
        <div className="InputWrapper">
            {title && <div className="InputName">{title}</div>}
            <input
                value={value}
                className={'Input'}
                type="text"
                onChange={onChange}
            />
        </div>
    );
}
