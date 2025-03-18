import './Accordion.scss'
import '../../App.scss'

import { Checkbox } from '../checkbox/Checkbox'
import { IArticleProp } from '../../constants/articleProps'
import { useEffect, useRef } from 'react'

export const Accordion = (article: IArticleProp) => {
    const detailsRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (detailsRef.current && !detailsRef.current.contains(event.target as Node)) {
          detailsRef.current.removeAttribute('open');
        }
      };
  
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
    return (
        <details ref={detailsRef} className='details' name='filter'>
            <summary className='summary text'>{article.summary}</summary>
            <ul className='selectors'>
                {article.data.map((el, index) => 
                    <li key={index} className='selector__container'>
                        <p className='selector__item text text_400'>{el}</p>
                        <Checkbox key={index} filterName={article.filterName} value={article.values[index]} />
                    </li>
                )}
            </ul>
        </details>
    )
}