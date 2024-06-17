
import React, { useState, useEffect } from 'react';
import { Modal, Radio, Button, Typography, Progress } from 'antd';

const { Title, Text } = Typography;

const Voting = ({ votingEvent, onVote, onCancel }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [remainingTime, setRemainingTime] = useState(30);
    const [modalVisible, setModalVisible] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);

        if (remainingTime === 0) {
            clearInterval(timer);
            setModalVisible(false);
        }

        return () => clearInterval(timer);
    }, [remainingTime]);

    const handleVote = () => {
        if (selectedOption !== null) {
            onVote(selectedOption);
            setSelectedOption(null);
        }
    };

    const modalFooter = (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button key="cancel" onClick={onCancel}>
                Cancel
            </Button>
            <Button
                key="submit"
                type="primary"
                onClick={handleVote}
                disabled={remainingTime === 0}
            >
                Submit
            </Button>
        </div>
    );

    return (
        <div  >
            <Modal
                visible={modalVisible}
                footer={modalFooter}
                closeIcon={null}
                centered
            >
                <div style={{ textAlign: 'center' }}>
                    <Title level={4}>{votingEvent.title}</Title>
                    <Progress
                        type="circle"
                        percent={(remainingTime / 30) * 100}
                        format={() => `${remainingTime}s`}
                        width={80}
                    />
                </div>

                <Radio.Group
                    onChange={(e) => setSelectedOption(e.target.value)}
                    value={selectedOption}
                    disabled={remainingTime === 0}
                    style={{ width: '100%', marginTop: '20px' }}
                >
                    {votingEvent.options.map((option, index) => (
                        <Radio.Button key={index} value={option} style={{ width: '100%', textAlign: 'center', marginBottom: '10px' }}>
                            <Text style={{ fontSize: '16px' }}>{option}</Text>
                        </Radio.Button>
                    ))}
                </Radio.Group>
            </Modal>
        </div>
    );
};

export default Voting;
