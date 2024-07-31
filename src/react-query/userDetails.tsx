import User from '../services/user';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/auth';

export const userDetails = ({ isEnabled = true }: { isEnabled?: boolean }) => {
	const { user } = useAuth();

	return useQuery({
		queryKey: ['userDetails'],
		queryFn: () => User.getInfo(user?.id),
		enabled: isEnabled,
		select(data) {
			return {
				...data,
				client: {
					...data.client,
					profile_url: data.client.profile_url
						? `${data?.client.profile_url}?timestamp=${new Date().getTime()}`
						: null
				}
			};
		}
	});
};
