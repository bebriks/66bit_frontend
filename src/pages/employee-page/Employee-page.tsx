import styles from './Employee-page.module.scss'

import { Main } from '../../components/article/components/main/Main'
import { IEmployee } from '../../api/types/types'
import { StackCard } from '../../components/stack-card/Stack-card'
import { dateFormaterToDDMMYYYY, phoneFormater } from '../../utils/utils'

export const EmployeePage = ({ data }: {data: IEmployee}) => {
    return (
        <Main>
            <div className={styles.employee_info}>
                <img src={data?.photo} className={styles.photo} />
                <h1 className={styles.label_1lv}>{data?.name}</h1>
                <p className={`${styles.position}`}>{data?.position}</p>
                <div className={styles.stack}>
                    {data?.stack.map((el) => <StackCard textData={el} />)}
                </div>
            </div>

            <div className={styles.break_line}></div>

            <div className={styles.main_info__container}>
                <div className={styles.main_info}>
                    <h2 className={`${styles.label_2lv}`}>Основная информация</h2>
                    <div className={`${styles.main_info__grid} ${styles.main_info__item} ${styles.text_m}`}>
                        <p className={styles.main_info__item__title}>Контактный телефон:</p>
                        <p className={styles.main_info__item__content}>{phoneFormater(data!.phone)}</p>
                    </div>
                    <div className={`${styles.main_info__grid} ${styles.main_info__item} ${styles.text_m}`}>
                        <p className={styles.main_info__item__title}>Дата рождения:</p>
                        <p className={styles.main_info__item__content}>{dateFormaterToDDMMYYYY(data!.birthdate)}</p>
                    </div>
                    <div className={`${styles.main_info__grid} ${styles.main_info__item} ${styles.text_m}`}>
                        <p className={styles.main_info__item__title}>Дата устройства:</p>
                        <p className={styles.main_info__item__content}>{dateFormaterToDDMMYYYY(data!.dateOfEmployment)}</p>
                    </div>
                </div>
            </div>
        </Main>
    )
}