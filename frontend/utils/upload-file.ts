export const uploadFile = async (
    endpoint: string,
    file: File,
    data?: Record<string, string>,
    options = {}
) => {
    const formData = new FormData()
    formData.append('image', file)

    if (data) {
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value)
        })
    }
    return fetch(endpoint, { method: 'POST', body: formData, ...options })
}
