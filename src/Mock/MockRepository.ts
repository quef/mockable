import {Mock} from "./Mock";

export default class MockRepository {
    mocks: Array<Mock>

    constructor() {
        this.mocks = new Array<Mock>()
    }

    add(mock: Mock) {
        this.mocks.push(mock)
    }

    all(): Array<Mock> {
        return this.mocks
    }

    pull(method: string, url: string): Mock|undefined {
        const index = this.mocks.findIndex((mock: Mock) => {
            return mock.method === method && mock.url === url
        })
        const mock = this.mocks[index]
        this.mocks.splice(index, 1)
        return mock
    }

    clear() {
        this.mocks = new Array<Mock>()
    }

}