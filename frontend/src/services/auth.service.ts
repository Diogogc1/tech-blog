import api from "./api.service";


export class AuthService {
	async login(authPayload: any): Promise<any> {
		const response = await api.post(`auth/login`, authPayload);
		return response.data;
	}
}

const authService = new AuthService();
export default authService;