import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images'
import { theme } from '../theme';

const Container = styled.View `
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }) => theme.itemBackground};
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0px;
`;

const Contents = styled.Text `
    flex: 1;
    font-size: 24px;
    color: ${({ theme }) => theme.text};
    `;

const Task = ({ text }) => {
    return (
        <Container>
            <IconButton type={images.uncheck} />
            <Contents>{text}</Contents>
            <IconButton type={images.update} />
            <IconButton type={images.delete} />
        </Container>
    );
};

// 할 일 내용은 props로 전달되어 오는 값을 활용했으며, 완료 여부를 나타내는 체크 박스와 수정, 삭제 버튼을 IconButton 컴포넌트를 이용.
Task.PropTypes = {
    text: PropTypes.string.isRequired,
};

export default Task;