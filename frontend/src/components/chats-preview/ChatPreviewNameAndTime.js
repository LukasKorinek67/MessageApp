import Row from "react-bootstrap/Row";
import dateTimeUtil from "../../utils/DateTimeUtil";
import Stack from "react-bootstrap/Stack";
import dateTimeService from "../../utils/DateTimeUtil";

export default function ChatPreviewNameAndTime({ usernameText, lastMessage}) {
    return (
        <>
            <Row>
                <Stack direction="horizontal" gap={0} className="ps-0">
                    <div className="fw-semibold">
                        {usernameText}
                    </div>
                    {lastMessage ?
                        <div className="fw-lighter small ms-auto" title={dateTimeService.getDateAndTimeString(lastMessage.time)} >
                            {dateTimeUtil.getChatPreviewTime(lastMessage.time)}
                        </div>
                        : <div className="fw-lighter small ms-auto" >
                        </div>
                    }
                </Stack>
            </Row>
        </>
    );
}