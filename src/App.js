import { Dimensions, StatusBar } from 'react-native';
import React, {useState} from 'react';
import { Text, View } from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import Input from './components/Input';
import IconButton from './components/IconButton';
import { images } from './images';
import Task from './components/Task'

// 타이틀 만들기
// 노치 디자인이 있는 기기는 Title 컴포넌트의 일부가 가려짐 -> SafeAreaView 컴포넌트로 해결
// const Container = styled.View -> styled.SafeAreaView
const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({theme}) => theme.background};
    align-items: center;
    justify-content: flex-start;
    `;
const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({theme}) => theme.main};
    align-self: flex-start;
    margin: 0px 20px;
    `;

// Task 컴포넌트 만들기 -> 완료, 입력할 내용, 수정, 삭제 버튼으로 구성된다.
// ScrollView 컴포넌트를 이용해, 할 일 항목의 수가 많아져서 화면을 넘어가도 스크롤을 이용할 수 있도록 화면을 구성.
const List = styled.ScrollView`
  flex: 1;
  width: ${({ width }) => width - 40}px;
`;

export default function App() {
    //입력되는 값을 이용할 수 있도록 Input 컴포넌트에 이벤트를 등록하겠습니다.
    const [newTask, setNewTask] = useState('');
    const [tasks, setTasks] = useState({
        '1': {id: '1', text: 'Hanbit', check: false},
        '2': {id: '2', text: 'React Native', check: true},
        '3': {id: '3', text: 'React Native Sample', check: false},
        '4': {id: '4', text: 'Edit TODO Item', check: false}
    });

    const _addTask = () => { // _addTask 함수가 호출되면 tasks에 새로운 할 일 항목이 추가된다
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, check: false},
        };
        setNewTask(''); //input component 초기화하고 기존의 목록을 유지한 상태에서 새로운 항목이 추가되도록 구성
        setTasks({ ...tasks, ...newTaskObject});
    }
    const _deleteTask = id => { // 항목의 id를 이용하여 tasks에서 해당 항목을 삭제하는 함수 정의
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };

    const _toggleTask = id => { //완료기능 구현, 항목을 완료상태로 만들어도 다시 미완료 상태로 돌아올 수 있도록 하기.
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['check'] = !currentTasks[id]['check'];
        setTasks(currentTasks);
    }

    const _handleTextChange = text => {
        setNewTask(text);
    };

     const width = Dimensions.get('window').width;
     

     

    return (
    
  <ThemeProvider theme={theme}>
    <Container>
        <StatusBar 
        //상태바를 제어할 수 있는 StatusBar 컴포넌트 제공. 안보이던 상태바 보이게 만들기.
            barStyle='light-content'
            backgroundColor={theme.background}           
            />           
      <Title>TODO List</Title>

      <Input placeholder="+ Add a Task"
            value={newTask}
            onChangeText={_handleTextChange}
            onSubmitEditing={_addTask}              
                /> 

        {/* <IconButton type={images.check} />
        <IconButton type={images.uncheck} /> 
        <IconButton type={images.delete} />
        <IconButton type={images.update} /> */}

        
        <List width ={width}>
            {Object.values(tasks).reverse() // 최신 항목이 가장 앞에 보이도록 tasks를 역순으로 렌더링되게 작성.
            .map(item => (<Task key={item.id} item = {item} deleteTask = {_deleteTask} toggleTask={_toggleTask}/> ))} 

            {/* <Task text="Hanbit" />
            <Task text="React Native" />
            <Task text="React Native Sample" />
            <Task text="Edit TODO Item" /> */}
        </List>

      </Container>
  </ThemeProvider>
  );
}

