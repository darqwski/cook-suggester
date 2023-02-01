import appRequest from "../app-request";

export const loginUser =async (login: string, password: string): Promise<[number, string]> => {
  const { data, status } = await appRequest<string>({
    url:'/API/login',
    method: 'POST',
    data: { login, password }
  });

  return [status, data];
}