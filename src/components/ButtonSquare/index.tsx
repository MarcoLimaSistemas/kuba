import React, { ReactNode } from 'react';

import { ButtonTutorials, IconButtonTutorials, LabelButtonTutorials } from './styles';

interface ButtonSquareProps {
  children: ReactNode;
  label: string;
  onPress: () => void;
}

export function ButtonSquare({ children, label, ...res }: ButtonSquareProps) {
  return (
    <ButtonTutorials {...res}>
      <IconButtonTutorials>
        {children}
      </IconButtonTutorials>
      <LabelButtonTutorials>{label}</LabelButtonTutorials>
    </ButtonTutorials>
  );
};