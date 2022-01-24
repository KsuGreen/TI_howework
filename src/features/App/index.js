import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './index.css';
import {Card} from "../../components/Card";
import {List} from "../ListView";
import {Form} from "../FormView";
import {useState} from "react";

function App() {
    const [ isFirstRender, setIsFirstRender ] = useState(true);
    const [ shelfListState, setShelfListState ] = useState([]);
    const [ goodsListState, setGoodsListState ] = useState([]);

    if (isFirstRender) {
        fetch('http://localhost:8081/goods', {
            method: 'GET'
        }).then((res) => {
            res.json().then((json) => {
                setGoodsListState(json);
            });
        });
        fetch('http://localhost:8081/shelfs', {
            method: 'GET'
        }).then((res) => {
            res.json().then((json) => {
                setShelfListState(json);
            });
        });
        setIsFirstRender(false);
    }

    const setShelfList = (shelfList, type) => {
        console.log(shelfList);
        if (type === 'delete') {
            fetch('http://localhost:8081/delete/shelf', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(shelfList).length,
                },
                body: JSON.stringify(shelfList)
            });
        } else if (type === 'add') {
            fetch('http://localhost:8081/add/shelf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(shelfList).length,
                },
                body: JSON.stringify(shelfList)
            });
        }
        setShelfListState(shelfList);
    };

    const setGoodsList = (goodsList, type) => {
        if (type === 'delete') {
            fetch('http://localhost:8081/delete/good', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(goodsList).length,
                },
                body: JSON.stringify(goodsList)
            });
        } else if (type === 'add') {
            fetch('http://localhost:8081/add/good', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(goodsList).length,
                },
                body: JSON.stringify(goodsList)
            });
        } else {
            fetch('http://localhost:8081/change/good', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Content-Length': JSON.stringify(goodsList).length,
                },
                body: JSON.stringify(goodsList)
            });
        }
        setGoodsListState(goodsList);
    };

    console.log(goodsListState.filter(value1 => { return value1.shelfId === 1; }));
    return (
        <div className="App">
            <BrowserRouter>
                <div className="Content">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <Card title="Список стеллажей">
                                    <List
                                        type={'shelf'}
                                        arrayList={shelfListState}
                                        setArrayList={setShelfList}
                                        pathToAdd={"/add/shelf"}
                                    />
                                </Card>
                                { shelfListState.map((value, index) => {
                                    return (
                                        <Card title={`Стеллаж ${value.name}`}>
                                            <List
                                                linkedArray={shelfListState}
                                                arrayList={goodsListState.filter(value1 => { return value1.shelfId === index; })}
                                                setArrayList={setGoodsList}
                                                pathToAdd={`/add/good?id=${index}`}
                                            />
                                        </Card>
                                    );
                                })}
                            </>
                        }/>
                        <Route path="/add/shelf" element={
                            <Card title="Добавление стеллажа">
                                <Form
                                    list={shelfListState}
                                    setList={setShelfList}
                                />
                            </Card>
                        }/>
                        <Route path="/add/good" element={
                            <Card title="Добавление товара">
                                <Form
                                    type={'goods'}
                                    list={goodsListState}
                                    setList={setGoodsList}
                                    options={shelfListState}
                                />
                            </Card>
                        }/>
                        <Route path="/change/good" element={
                            <Card title="Изменение данных товара">
                                <Form
                                    type={'goods'}
                                    action={'change'}
                                    list={goodsListState}
                                    setList={setGoodsList}
                                    options={shelfListState}
                                />
                            </Card>
                        }/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
