export declare global {
	namespace ReactNavigation {
		interface RootParamList {
			SignIn: undefined;
			SignUp: undefined;
			ScreenSuccessful: {dataUser:{email:string, password: string}} |undefined;
			ScreenSuccessfulResetPassword: undefined;
			Home: {modalActive: boolean};
			Profile: undefined;
			EditProfile: undefined;
			School: undefined;
			Device: undefined;
			Tutorials: undefined;
			SettingsEarphone: undefined;
			Preset: {preset:{id:number, name:string, imgURL:string}};
			Personalities: undefined;
			FrequentlyQuestions: undefined;
			ChangePassword: undefined;
			PasswordResetSuccess: undefined;
			ForgotPassword: undefined;
			ChangePassword: undefined;
			Support: undefined;
			SupportSuccess:undefined;
			Profiles: undefined;
			ProfileView:{userId:number};
		}
	}
}
