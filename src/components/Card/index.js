import './index.css';

export const Card = (props) => {
    const { title } = props;
    return (
        <div className="Card">
            <div className="Card-Title">{title}</div>
            {props.children}
        </div>
    );
}
