import './index.css';
import {Input} from "../../components/BasicInput";
import {useState} from "react";
import {Select} from "../../components/BasicSelect";
import {Button} from "../../components/BasicButton";
import {Link} from "react-router-dom";

export const Form = (props) => {
    const {
        list,
        setList,
        options,
        type,
        action
    } = props;
    let defaultName = '';
    let defaultSelectedShelf = '';
    let defaultReason = '';
    let id = -1;
    if (action === 'change') {
        let searchParams = new URLSearchParams(window.location.search);
        id = parseInt(searchParams.get('id'));
        defaultName = list[id].name;
        defaultSelectedShelf = list[id].shelfId;
        defaultReason = list[id].description;
    } else {
        let searchParams = new URLSearchParams(window.location.search);
        defaultSelectedShelf = parseInt(searchParams.get('id'));

    }

    const [name, setName] = useState(defaultName);
    const [selectedShelf, setSelectedShelf] = useState(defaultSelectedShelf);
    const [reason, setReason] = useState(defaultReason);

    const onChangeSelect = (event) => {
        setSelectedShelf(event.target.value);
    };

    const onChangeReason = (event) => {
        setReason(event.target.value);
    };

    const onChangeName = (event) => {
        setName(event.target.value);
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        const array = list.map((value) => {
            return value;
        });

        if (action === 'change') {
            array.map((value, index) => {
                if (id !== -1 && index === id) {
                    value.name = name;
                    value.shelfId = Number(selectedShelf);
                    value.description = reason
                }
                return value;
            })
        } else {
            array.push({
                shelfId: Number(selectedShelf),
                name: name,
                description: reason,
            });
        }

        if (action !== 'change') {
            setList(array, 'add');
        } else {
            setList(array);
        }

        if (action !== 'change') {
            setName('');
            setSelectedShelf('');
            setReason('');
        }
    };

    return (
        <form onSubmit={onSubmitForm}>
            <Input
                title={"??????"}
                value={name}
                onChange={onChangeName}
            />
            { type !== 'goods' && (
                <Input
                    value={reason}
                    title={"???????????????????? ????????????????"}
                    onChange={onChangeReason}
                />
            )}
            { type === 'goods' && action === 'change' && (
                <Select
                    title="??????????????"
                    value={selectedShelf}
                    options={options.map((value) => {
                        return value.name;
                    })}
                    placeholder={"???????????? ??????????????"}
                    onChange={onChangeSelect}
                />
            )}
            <Button className={'Form-Submit'} submit={true} type="action">{(action === 'change') ? '????????????????' : '????????????????'}</Button>
            <Link to={"/"}><Button className={'Form-Back'}>??????????</Button></Link>
        </form>
    );
};
