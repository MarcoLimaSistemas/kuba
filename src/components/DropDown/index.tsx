import * as React from 'react';

import { Image } from 'react-native';
import { DropDownContainer, DropDownContent, DropDownTitle, TextDropDown } from './styles';

import { ArrowDown } from '@assets/icons';
import { useState } from 'react';

interface DropdownProps {
  title: string;
  text: string;
}

export function Dropdown({ title, text }: DropdownProps) {

  const [open, setOpen] = useState(false);

  return (
    <DropDownContainer>
      <DropDownTitle onPress={() => setOpen(!open)}>
        <TextDropDown>
          {title}
        </TextDropDown>
        <Image source={ArrowDown} />
      </DropDownTitle>

      {open ?
        <DropDownContent>
          {text}
        </DropDownContent> : ""
      }
    </DropDownContainer>
  );
};
