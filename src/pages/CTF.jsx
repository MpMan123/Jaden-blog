import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const CTF = () => {
    return (
        <Typography className="max-w-3xl">
            <Title level={2} style={{ color: '#ffffff', marginBottom: '32px', fontWeight: 600, letterSpacing: '-0.02em' }}>
                Capture The Flag
            </Title>
            <Paragraph style={{ color: '#d1d1d1', fontSize: '16px', lineHeight: '1.8' }}>
                Deep dives into CTF challenges to documenting security competitions.
            </Paragraph>
        </Typography>
    );
};

export default CTF;

