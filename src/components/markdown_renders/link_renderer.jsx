export default function LinkRenderer(props) {
    return (
        <a
            style={{ color: 'skyblue' }}
            target="_blank"
            rel="noopener noreferrer"
            href={props.href}
        >
            {props.children}
        </a>
    );
}
