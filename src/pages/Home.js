import React, {useEffect, useState} from 'react';
import {Card, Row, Col} from 'antd';
import { Link } from 'react-router-dom';
import SearchBox from "./SearchBox";
import { LazyLoadImage } from "react-lazy-load-image-component";



function MyCard({ data }) {
    return (
        <Link to={`/details/${data.id}`}>
            <Col xs={24} sm={12} md={6} lg={4}>
                <Card>
                    <h3>{data.name}</h3>
                    <LazyLoadImage src={`data:image/jpeg;base64,${data.pictureBytes}`} alt={data.name + '-pic'} width={250} height={250}/>
                </Card>
            </Col>
        </Link>
    );
}



const Home = () => {

    const [list, setList] = useState([]);

    function handleFurnitureChange(data) {
        setList(data);
    }

    useEffect(() => {
        fetch("http://127.0.0.1:8080/furniture/queryAll", {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"},
        }).then(response => response.json())
            .then(data => {
                setList(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    return (
        <>
        <div><SearchBox onFurnitureChange={handleFurnitureChange}/></div>
        <Row gutter={16}>
            {list.map((item) => (
                <MyCard key={item.id} data={item}/>
            ))}
        </Row>
        </>
    )
};

export default Home;