import User from '@services/user';
import { useQuery } from '@tanstack/react-query';

export const useGetUserInfo = () =>
	useQuery({
		queryKey: ['userInfo'],
		queryFn: User.getInfo,
		staleTime: Infinity
	});
