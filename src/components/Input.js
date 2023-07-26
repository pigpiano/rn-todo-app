import React from 'react';
import styled from 'styled-components/native'
// Dimentions을 통해 화면 크기를 확인하고 스타일 변경
import { Dimensions } from 'react-native';

// input 컴포넌트 만들기. 할 일 항목 추가, 등록된 할 일 항목을 수정할 때도 사용
const StyledInput = styled.TextInput.attrs(({ theme }) => ({ placeholderTextColor: theme.main,})) `
    width: ${({ width }) => width - 40}px;
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.itemBackground};
    font-size: 25px;
    color: ${({ theme }) => theme.text};
`;

const Input = ({placeholder}) => {
    
    const width = Dimensions.get('window').width;
    return <StyledInput width={width} placeholder={placeholder} maxLength={50} 
    autoCapitalize="none" // 자동으로 대문자로 전환하는 속성 설정 X
    autoCorrect={false} // 자동수정 하지 않도록 설정
    returnKeyType="done" // 키보드의 완료 버튼을 설정
    keyboardAppearance='dark' // iOS 키보드의 색상을 변경하기
    />;
};

export default Input;