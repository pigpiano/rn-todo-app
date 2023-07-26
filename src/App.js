import { StatusBar } from 'react-native';
import React from 'react';
import { Text, View } from 'react-native';
import styled, {ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import Input from './components/Input';


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


    
export default function App() {
  return (
  <ThemeProvider theme={theme}>
    <Container>
        <StatusBar 
        //상태바를 제어할 수 있는 StatusBar 컴포넌트 제공. 안보이던 상태바 보이게 만들기.
            barStyle='light-content'
            backgroundColor={theme.background}           
            />           
      <Title>TODO List</Title>

      <Input placeholder="+ Add a Task" /> 

      </Container>
  </ThemeProvider>
  );
}

