const appRequest = <T>({
   url = '/',
   data = undefined,
   method = 'GET',
   headers = {},
   jsonResponse = true,
   ...rest
}: {
    url: string,
    data?: unknown,
    jsonResponse?: boolean,
    method?: 'POST' | 'GET' | 'PUT' | 'DELETE',
    headers?: {
        [key: string]: string
    }
}): Promise<{ data: T, status: number }> => fetch(url, {
    ...rest,
    body: (data && JSON.stringify(data)) as string,
    method: method,
    headers: {
        'Content-Type': 'application/json',
        ...(headers || {}),
    }
}).then( response => (jsonResponse ? response.json() : response.text()).then(data => ({ data, status: response.status })));

export default appRequest;