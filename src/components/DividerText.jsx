export default function spaniderText({ children }) {
    return (
        <span
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                margin: '1em 0',
            }}
        >
            <span
                style={{
                    height: '.025em',
                    background: 'gray',
                    flex: '1',
                    margin: '0 .25em 0 0',
                }}
            ></span>
            {children}
            <span
                style={{
                    height: '.025em',
                    background: 'gray',
                    flex: '1',
                    margin: '0 0 0 .25em',
                }}
            ></span>
        </span>
    );
}
