import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Stack from 'react-bootstrap/Stack';
import BootstrapIcons from "../../../utils/BootstrapIcons";
import MessageLength from '../../../utils/MessageLength';
import dateTimeService from "../../../utils/DateTimeUtil";

export default function MessageGroupChat({ message }) {
    const cardWidth = MessageLength.getMessageCardLength(message.text.length);

    return (
        <>
            <Stack direction="horizontal" gap={1}>
                <div className="text-gray mt-auto pb-1">{BootstrapIcons.user(30,30)}</div>

                <Stack>
                    <div className="ps-2 font-weight-light small">{message.user.username}</div>
                
                    <Card style={{ width: `${cardWidth}rem` }} bg="gray" text="white" className="m-1">
                    <Card.Body className="p-1 ps-2">
                        <Container>
                            <Row className="small">
                                {message.text}
                            </Row>
                            <Row>
                            <Stack direction="horizontal" gap={3}>
                                <div className="pe-1"></div>
                                <div className="pe-0 ms-auto font-weight-light small fw-lighter" title={dateTimeService.getDateAndTimeString(message.time)} >{dateTimeService.getTimeFromDate(message.time)}</div>
                            </Stack>
                            </Row>
                        </Container>
                    </Card.Body>
                    </Card>
                </Stack>
            </Stack>
        </>
    );
}