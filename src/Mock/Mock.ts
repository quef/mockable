export interface Mock {
    method: string
    url: string
    status: number
    response: Object
}
export function print(mock: Mock): string {
    return `${mock.method} ${mock.url} - ${mock.status}`
}