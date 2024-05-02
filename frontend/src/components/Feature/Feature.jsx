import React from 'react'
import styles from './Feature.module.css'

export default function Feature({title, text, image, imageAltText}) {
    return (
            <div className={styles['feature-container']}>
                <div className={styles['feature-item']}>
                    <img src={image} alt={imageAltText} className={styles['feature-icon']} />
                    <h3 className={styles['feature-item-title']}>{title}</h3>
                    <p className={styles['feature-item-text']}>{text}</p>
                </div>
            </div>
    );
}



