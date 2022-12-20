import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.black};
`;

export const ContainerVideos = styled.View`
display: flex;
flex-direction: column;
padding: 16px;
`;