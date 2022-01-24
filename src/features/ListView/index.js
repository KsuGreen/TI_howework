import './index.css';
import {ListItem} from "../../components/ListItem";
import {Button} from "../../components/BasicButton";
import {Link} from "react-router-dom";

export const List = (props) => {
    const { arrayList, setArrayList, pathToAdd, type, linkedArray } = props;

    return (
        <div>
            { arrayList.map((value, index) => {
                return (
                    <ListItem
                        type={type}
                        key={index}
                        index={index}
                        list={arrayList}
                        setState={setArrayList}
                        title={`${value.name}`}
                        description={value.description}
                    />);
            })}
            <Link to={pathToAdd} className="ArrayList-Add-Link">
                <Button className="ArrayList-Add" type="action">Добавить</Button>
            </Link>
        </div>
    );
}
