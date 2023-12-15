import * as strings from "../strings/strings";
export default function Footer() {
    return (
        <footer className="text-center font-weight-lighter" >
            <p>{strings.FOOTER_TEXT_CREATED_BY} &copy;{strings.FOOTER_TEXT_CREATOR}, {strings.FOOTER_TEXT_CREATED_YEAR}. {strings.FOOTER_TEXT_MESSAGE} <abbr title={strings.FOOTER_TEXT_SUBJECT}>{strings.FOOTER_TEXT_SUBJECT_SHORTCUT}</abbr>.</p>
        </footer>
    );
}