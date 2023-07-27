import React, {useState} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import IconButton from './IconButton';
import {images} from '../images'
import { theme } from '../theme';
import Input from './Input'; // task 컴포넌트에서 수정 버튼을 클릭하면 항목의 현재 내용을 가진 Input 컴포넌트가 렌더링되어 사용자가 수정

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

const Task = ({ item, deleteTask, toggleTask, updateTask,}) => {
    const [isEditing, setIsEditing] = useState(false); // 수정 상태를 관리하기 위해 isEditing 변수 생성. 수정 버튼을 클릭하면 값이 변하도록 설정
    const [text, setText] = useState(text);

const _handleUpdateButtonPress = () => { // 수정 버튼을 클릭하면 값이 변하도록 설정.
    setIsEditing(true);
};

const _onSubmitEditing = () => {
    if(isEditing) {
        const editedTask = Object.assign({}, item, {text} );
        setIsEditing(false);
        updateTask(editedTask);
    }
};

const _onBlur = () => { // 포커스를 잃으면 초기화 되도록 설정
    if(isEditing) {
        setIsEditing(false);
        setText(item.text);
    }
};

    return isEditing ? (
        <Input // 수정되는 내용을 담을 text 변수를 생성하고 Input 컴포넌트의 값으로 설정했습니다.  
            value={text}
            onChangeText={text => setText(text)} // Input 컴포넌트에서 완료 버튼을 누르면 App 컴포넌트에서 전달된 updateTask함수가 호출
            onSubmitEditing={_onSubmitEditing}
            onBlur={_onBlur} /> ) : (
        <Container>

            <IconButton type={item.check? images.check : images.uncheck} 
            id={item.id}
            onPressOut={toggleTask}
            check={item.check} />
            <Contents check={item.check}>{item.text}</Contents>

            {item.check || (
            <IconButton type={images.update} onPressOut={_handleUpdateButtonPress} /> )}

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
    updateTask: PropTypes.func.isRequired,
};

export default Task;