
import {Input} from "antd";
import React from "react";

const { Search } = Input;


function SearchBox(props) {

    const onSearch = (value) => {
        console.log(value);
        fetch(`http://127.0.0.1:8080/furniture/queryByName?name=${value}`, {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"},
        }).then(response => response.json())
            .then(data => {
                console.log('search result', data);
                props.onFurnitureChange(data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <Search placeholder="输入搜索关键字" onSearch={onSearch} enterButton />
    );
}

export default SearchBox;