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
                {/* <div className={styles.employee}> */}
                    <h1 className={styles.label}>{data?.name}</h1>
                    <p className={`${styles.position}`}>{data?.position}</p>
                    <div className={styles.stack}>
                        {data?.stack.map((el) => <StackCard textData={el} />)}
                    {/* </div> */}
                </div>
            </div>

            <div className={styles.break_line}></div>

            <div className={styles.main_info__container}>
                <div className={styles.main_info}>
                    <h2 className={`${styles.label}`}>Основная информация</h2>
                    <div className={`${styles.main_info__grid} ${styles.main_info__item} ${styles.text_m}`}>
                        <p>Контактный телефон:</p>
                        <p>{phoneFormater(data!.phone)}</p>
                    </div>
                    <div className={`${styles.main_info__grid} ${styles.main_info__item} ${styles.text_m}`}>
                        <p>Дата рождения:</p>
                        <p>{dateFormaterToDDMMYYYY(data!.birthdate)}</p>
                    </div>
                    <div className={`${styles.main_info__grid} ${styles.main_info__item} ${styles.text_m}`}>
                        <p>Дата устройства:</p>
                        <p>{dateFormaterToDDMMYYYY(data!.dateOfEmployment)}</p>
                    </div>
                </div>
            </div>
        </Main>
    )
}