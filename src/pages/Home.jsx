import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Home = () => {
    return (
        <Typography className="max-w-3xl font-lora">
            <Title level={2} style={{ color: '#ffffff', marginBottom: '32px', fontWeight: 600, letterSpacing: '-0.02em' }}>
                Home
            </Title>
            <Paragraph style={{ color: '#ffffff', fontSize: '18px', lineHeight: '1.6', marginBottom: '40px' }}>
                Welcome to my blog! This is the home page where I share my latest updates and thoughts.
            </Paragraph>
            <div className="space-y-8">
                <Paragraph style={{ color: '#d1d1d1', fontSize: '16px', lineHeight: '1.8' }}>
                    Keep watching nig
                </Paragraph>
            </div>
        </Typography>
    );
};

export default Home;

