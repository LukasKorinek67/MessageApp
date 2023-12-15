import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Footer from "../components/Footer";
import * as strings from "../strings/strings";
import {Link} from "react-router-dom";
import React from "react";


export default function NotFoundPage() {
    return (
        <>
            <Header/>
            <div className="main_content">
                <Card className="pageCard shadow-lg p-3 bg-light rounded">
                    <Container>
                        <div className="content">
                            <h2>{strings.ERROR_404}</h2>
                            <p className="fw-light">{strings.ERROR_404_TEXT}</p>
                            <p className="fw-light">{strings.ERROR_404_TEXT_SOLUTION} <Link to="/" replace={false} className="text-reset">{strings.ERROR_404_TEXT_SOLUTION_SITE}</Link>.</p>
                            <div className="card_bottom"></div>
                        </div>
                    </Container>
                </Card>
            </div>
            <Footer />
        </>
    );
}