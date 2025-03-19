import styles from './Main.module.scss'

export const Main = ({ children }: {children: JSX.Element[] | JSX.Element}) => {
    return (
        <div className={styles.body}>
            {children}
        </div>
    )
}