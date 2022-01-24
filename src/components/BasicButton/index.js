import './index.css';
import edit from './edit.svg';
import trash from './delete.svg';

export const Button = (props) => {
    const { type, icon, className, onClick, submit } = props;

    let typeSubmit;
    if (submit) {
        typeSubmit = "submit";
    }

    if (icon) {
        return (
            <button onClick={onClick} className={`Button Button_type_${type}`}>
                { icon === 'edit' && <img width="25px" src={edit} alt=""/> }
                { icon === 'trash' && <img width="25px" src={trash} alt=""/> }
            </button>
        );
    }

    return (
        <button
            type={typeSubmit}
            className={`Button ${className}`}
        >
            {props.children}
        </button>
    );
}
