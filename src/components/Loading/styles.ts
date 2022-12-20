import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
justify-content: center;
align-items: center;
background-color: ${({ theme }) => theme.COLORS.gray_200};
`;

export const Title = styled.Text`
  font-size: 25px;
  text-align: center;
  color:${({ theme }) => theme.COLORS.black};
  margin-bottom: 15px;
`;
