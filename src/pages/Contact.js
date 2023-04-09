import React from 'react';
import {Card} from "antd";
import company1 from "./company1.jpg";
import company2 from "./company2.jpg";

const Contact = () => {
    return (
        <Card>
            <img src={company1} alt=""/>
            <img src={company2} alt=""/>
        </Card>
    );
};

export default Contact;
