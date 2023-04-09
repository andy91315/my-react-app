import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {Card} from "antd";
import Cookies from 'js-cookie';
import { LazyLoadImage } from "react-lazy-load-image-component";

function MyCard({ data }) {
    return (
        <Card>
            <LazyLoadImage src={`data:image/jpeg;base64,${data.pictureBytes}`} alt={data.name + '-pic'} width={250} height={250}/>
            {data.id && <h3>Furniture ID: {data.id}</h3>}
            {data.vanessaId && <h3>Vanessa ID: {data.vanessaId}</h3>}
            <h3>Name: {data.name}</h3>
            <h3>Price: {data.price}</h3>
            {data.id && <div><button onClick={handleDownload}>Download File</button></div>}
        </Card>
    );
}

const handleDownload = () => {
    downloadFile('http://example.com/file.txt');
};

function downloadFile(url) {
    fetch(url)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file.txt');
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        });
}

const DetailsPage = () => {

    let { id } = useParams()
    console.log('id', id);

    const [furniture, setFurniture] = useState(
        {
            id: '1111',
            name:'default',
            quantity:20,
            price: '100',
            prictureBytes: ''
        }
    );

    useEffect(() => {
        const username = Cookies.get('username');
        fetch(`http://127.0.0.1:8080/furniture/queryById?id=${id}&username=${username}`, {
            method: "GET",
            headers: {"Content-Type": "application/json;charset=utf-8"},
        }).then(response => response.json())
            .then(data => {
                setFurniture(data);
                console.log('data', data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    return (
        <div>
            <h2>Detail Page</h2>
            <MyCard data={furniture}/>
        </div>
    )
}

export default DetailsPage;