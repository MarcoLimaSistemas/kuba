import { ThumbnailImage } from '@assets/images';
import React from 'react';
import { Container, Thumbnail, Title } from './styles';

interface CardVideoProps {
  title: string;
  thumbnail: string;
  link: string;
}

export function CardVideo({ title }: CardVideoProps) {
  const link = 'https://www.youtube.com/watch?v=xB88fLS2adk&t=1s';
  const LinkImg = link.replace('https://www.youtube.com/watch?v=', '');
  return (
    <Container>
      <Thumbnail source={ThumbnailImage} />
      <Title>{title}</Title>
    </Container>
  );
}
