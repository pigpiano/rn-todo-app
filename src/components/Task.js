import React, {useState} from 'react';
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
    color: ${({ theme, check }) => (check ? theme.done : theme.text)};
    text-decoration-line: ${({ check}) => check ? 'line-through' : 'none' };
    `;

const Task = ({ item, deleteTask, toggleTask}) => {
    const [text, setText] = useState(text);


    return (
        <Container>
            <IconButton type={item.check? images.check : images.uncheck} 
            id={item.id}
            onPressOut={toggleTask}
            check={item.check} />
            <Contents check={item.check}>{item.text}</Contents>
            {item.check || <IconButton type={images.update} />}
            <IconButton type={images.delete} id={item.id} onPressOut={deleteTask}
            check={item.check} />
        </Container>
    );
};

// 할 일 내용은 props로 전달되어 오는 값을 활용했으며, 완료 여부를 나타내는 체크 박스와 수정, 삭제 버튼을 IconButton 컴포넌트를 이용.
Task.propTypes = {
    item: PropTypes.object.isRequired,
    deleteTask: PropTypes.func.isRequired,
    toggleTask: PropTypes.func.isRequired,
};

export default Task;