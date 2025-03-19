import { autorun, configure, makeAutoObservable } from 'mobx'
import { ITheme } from '../../api/types/types'

configure({ enforceActions: 'always' })

export class ConfigStore {
    theme: ITheme = 'light'

    constructor() {
        this.load()
        autorun(() => this.save())
        makeAutoObservable(this)
    }

    save = () => {
        window.localStorage.setItem(
            ConfigStore.name,
            JSON.stringify({
                theme: this.theme
            })
        )
    }

    load = () => {
        Object.assign(this, JSON.parse(window.localStorage.getItem(ConfigStore.name) || '{}'))
    }

    changeTheme = () => {
        if (this.theme === 'light') this.theme = 'dark'
        else this.theme = 'light'
        this.save()
    }
}