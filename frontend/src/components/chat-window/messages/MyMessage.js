import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import BootstrapIcons from "../../../utils/BootstrapIcons";
import MessageLength from '../../../utils/MessageLength';
import dateTimeService from "../../../utils/DateTimeUtil";
import * as strings from "../../../strings/strings";

export default function MyMessage({ message }) {
    const cardWidth = MessageLength.getMessageCardLength(message.text.length);
    
    return (
        <>
            <Stack direction="horizontal" gap={3}>
                <div className="pe-1"></div>
                <div className="pe-1 ms-auto">
                <Card style={{ width: `${cardWidth}rem`, backgroundColor: 'var(--bs-primary)' }} text="white" className="m-1 p-0">
                    <Card.Body className="p-1 ps-2">
                        <Container>
                            <Row className="small">
                                {message.text}
                            </Row>
                            <Row>
                            <Stack direction="horizontal" gap={0}>
                                <div className="pe-1"></div>
                                <div className="pe-1 ms-auto font-weight-light small fw-lighter" title={dateTimeService.getDateAndTimeString(message.time)} >{dateTimeService.getTimeFromDate(message.time)}</div>
                                { message.read === null ?
                                    <div className="ps-1 text-white" title={strings.MESSAGE_STATUS_TITLE_SENT}>
                                        {BootstrapIcons.singleCheck(20,20)}
                                    </div>
                                : !message.read ?
                                    <div className="ps-1 text-white" title={strings.MESSAGE_STATUS_TITLE_DELIVERED}>
                                        {BootstrapIcons.doubleCheck(20,20)}
                                    </div>
                                : message.read &&
                                <div className="ps-1 text-info" title={strings.MESSAGE_STATUS_TITLE_READ}>
                                    {BootstrapIcons.doubleCheck(20,20)}
                                </div> }
                            </Stack>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>         
                </div>
            </Stack>
        </>
    );
}