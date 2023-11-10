import React from 'react';
import {Row, Col} from "reactstrap";

const Footer = () => {
    const thisYear = () => {
        const year = new Date().getFullYear();
        return year
    };

    return (
        <div className="footer">
            <Row>
                <Col>
                    <p></p>
                    <p>
                        Copyright &copy; <span>{thisYear()} disign by salcho</span>
                    </p>
                </Col>
            </Row>
        </div>
    )
};

export default Footer;