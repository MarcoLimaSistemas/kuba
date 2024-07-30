import ImageBrokenPng from '@assets/images/image_broken.png';
import React, { useState } from 'react';
import { Container, Thumbnail } from './styles';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';
import { scale } from 'react-native-size-matters';

interface CardVideoProps {
	title: string;
	thumbnail: string;
	link: string;
}

const getYouTubeVideoId = (url: string) => {
	const regex =
		/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
	const match = url.match(regex);
	return match ? match[1] : null;
};

export function CardVideo({ title, link }: CardVideoProps) {
	const videoId = getYouTubeVideoId(link);
	const [imageBroken, setImageBroken] = useState(false);

	return (
		<Container>
			<Thumbnail
				source={
					imageBroken
						? ImageBrokenPng
						: {
								uri: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
							}
				}
				onError={() => setImageBroken(true)}
				resizeMode="contain"
			/>
			<Spacer h={16} />
			<Text variant="bold" color="#FFF" style={{ marginLeft: scale(8) }}>
				{title}
			</Text>
			<Spacer h={8} />
		</Container>
	);
}
