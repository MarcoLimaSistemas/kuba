import User from '@services/user';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInfo = (userId: number) =>
	useQuery({
		queryKey: ['userInfo', userId],
		queryFn: () => User.getInfo(userId),
		staleTime: Infinity,
		enabled: !!userId
	});
