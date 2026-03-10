import { Typography, Card } from 'antd';

const { Title, Paragraph } = Typography;

const WriteUp = () => {
    return (
        <Typography className="max-w-3xl">
            <Title level={2} style={{ color: '#ffffff', marginBottom: '32px', fontWeight: 600, letterSpacing: '-0.02em' }}>
                Write Ups
            </Title>
            <Paragraph style={{ color: '#d1d1d1', fontSize: '16px', lineHeight: '1.8' }}>
                Detailed explanations and walkthroughs for various security and technical challenges.
            </Paragraph>
        </Typography>
    );
};

export default WriteUp;

