import { Dimensions, StatusBar } from 'react-native';
import React, {useState} from 'react';
import { Text, View } from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import Input from './components/Input';

import IconButton from './components/IconButton';
import { images } from './images';

import Task from './components/Task'
// 리액트 네이티브에서는 AsyncStorage을 이용해서 로콜에 데이터를 저장하고 불러오는 기능을 구현할 수 있다.
import AsyncStorage from '@react-native-async-storage/async-storage';
// AppLoading은 특정 조건에서 로딩 화면이 유지되도록 하는 기능으로, 렌더링을 하기전에 처리해야 하는 작업을 수행하는 데 유용하게 사용
// AppLoading 컴포넌트를 사용해서 첫 화면에 렌더링되기 전에 _loadTask 함수를 호출
import AppLoading from 'expo-app-loading';

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
    const [tasks, setTasks] = useState({});

    const _saveTasks = async tasks => { 
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks)); //tasks라는 문자열을 키로하여 
            // 전달된 항목드를 문자열로 변환해서 저장하는 _saveTasks 함수 정의
            setTasks(tasks);
        } catch (e) {
            console.error(e)
        }

        }
    //저장된 데이터를 불러오는 함수 정의. 항목을 저장할 때 사용했던 키와 동일한 키로 데이터를 불러오고 객체로 변환하여 tasks에
    //입력하는 _loadTasks 함수 정의
    const _loadTasks = async () => {
        const loadedTasks = await AsyncStorage.getItem('tasks');
        setTasks(JSON.parse(loadedTasks || '{}'));
    }
    

    const _addTask = () => { // _addTask 함수가 호출되면 tasks에 새로운 할 일 항목이 추가된다
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, check: false},
        };
        setNewTask(''); //input component 초기화하고 기존의 목록을 유지한 상태에서 새로운 항목이 추가되도록 구성
        setTasks({ ...tasks, ...newTaskObject});
        _saveTasks({ ...tasks, ...newTaskObject })
    }
    const _deleteTask = id => { // 항목의 id를 이용하여 tasks에서 해당 항목을 삭제하는 함수 정의
        const currentTasks = Object.assign({}, tasks);
        delete currentTasks[id];
        _saveTasks(currentTasks);
    };

    const _toggleTask = id => { //완료기능 구현, 항목을 완료상태로 만들어도 다시 미완료 상태로 돌아올 수 있도록 하기.
        const currentTasks = Object.assign({}, tasks);
        currentTasks[id]['check'] = !currentTasks[id]['check'];
        _saveTasks(currentTasks);
    }

    const _updateTask = item => { // 수정 완료된 항목이 전달되면 tasks에서 해당 항목을 변경하는 함수를 작성.
        const currentTasks = Object.assign({}, tasks);
        currentTasks[item.id] = item; 
        _saveTasks(currentTasks);
    }

    const _handleTextChange = text => {
        setNewTask(text);
    };

     const width = Dimensions.get('window').width;
    // App 컴포넌트에서 Input 컴포넌트가 포커스를 잃으면 추가 중이던 값을 초기화 하는 onBlur함수를 추가
     const _onBlur = () => {
        setNewTask('');
     };

    const [isReady, setIsReady] = useState(false); 
    return isReady ? (
    
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
            onBlur = {_onBlur}            
                /> 

        {/* <IconButton type={images.check} />
        <IconButton type={images.uncheck} /> 
        <IconButton type={images.delete} />
        <IconButton type={images.update} /> */}

        
        <List width ={width}>
            {Object.values(tasks).reverse() // 최신 항목이 가장 앞에 보이도록 tasks를 역순으로 렌더링되게 작성.
            .map(item => (<Task key={item.id} item = {item} deleteTask = {_deleteTask} toggleTask={_toggleTask} 
                updateTask = {_updateTask}
                
            /> ))} 

            {/* <Task text="Hanbit" />
            <Task text="React Native" />
            <Task text="React Native Sample" />
            <Task text="Edit TODO Item" /> */}
        </List>

      </Container>
  </ThemeProvider>
    ) : (  <AppLoading
            startAsync={_loadTasks} // AppLoding 컴포넌트가 동작하는 동안 실행될 함수
            onFinish={() => setIsReady(true)} // startAsync가 완료되면 실행할 함수
            onError={console.error} // startAsync에서 오류가 발생하면 실행할 함수
    /> 
  );
 };

