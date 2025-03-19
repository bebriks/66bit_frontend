import styles from './Accordion.module.scss'
import '../../App.scss'

import { Checkbox } from '../checkbox/Checkbox'
import { IArticleProp } from '../../constants/articleProps'
import { useEffect, useRef } from 'react'

export const Accordion = (article: IArticleProp) => {
    const detailsRef = useRef<HTMLDetailsElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
                detailsRef.current.removeAttribute('open')
            }
        }
  
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])
    return (
        <details ref={detailsRef} className={`${styles.details} details`} name='filter'>
            <summary className={styles.summary}>{article.summary[0]}</summary>
            <ul className={`${styles.selectors} selectors`}>
                {article.data[0].map((el, index) => 
                    <li key={index} className={styles.selector__container}>
                        <p className={styles.selector__item}>{el}</p>
                        <Checkbox key={index} filterName={article.summary[1]} value={article.data[1][index]} />
                    </li>
                )}
            </ul>
        </details>
    )
}