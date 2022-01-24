import './index.css';
import {Button} from "../BasicButton";
import {Link} from "react-router-dom";

export const ListItem = (props) => {
    const {
        title,
        description,
        index,
        setState,
        list,
        type
    } = props;

    const onDelete = () => {
        setState(list.filter((value, idx) => {
            return idx !== index;
        }), 'delete');
    };

    return (
        <div className="ListItem">
            <div className="ListItem-Info">
                <div className="ListItem-Title">{title}</div>
                { description && <div className="ListItem-Description">{description}</div>}
            </div>
            { type !== 'shelf' && <Link to={`change/good?id=${index}`} className="ListItem-EditLink"><Button type="action" icon="edit"/></Link> }
            <Button onClick={onDelete} type="action" icon="trash"/>
        </div>
    );
};
