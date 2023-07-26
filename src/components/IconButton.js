import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { images } from '../images'


const Icon = styled.Image `
    tint-color: ${({ theme, check }) => check ? theme.done : theme.text};
    width: 30px;
    height: 30px;
    margin: 10px
    `;


    const IconButton = ({ type, onPressOut, id}) => {
        const _onPressOut = () => {
            onPressOut(id);
        };

        return (
            <TouchableOpacity onPressOut={_onPressOut}>
                <Icon source={type} />
            </TouchableOpacity>
        );
    };

    IconButton.defalutProps = {
        onPressOut: () => {},
    };

    IconButton.propTypes = {
        type: PropTypes.oneOf(Object.values(images)).isRequired,
        onPressOut: PropTypes.func,
        id: PropTypes.string,
        check: PropTypes.bool,
    };

export default IconButton;