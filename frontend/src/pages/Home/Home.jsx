import React from 'react'
import styles from './Home.module.css'
import Hero from '../../components/Hero/Hero'
import Feature from '../../components/Feature/Feature'
import { features } from '../../data/features'

export default function Home() {
  return (
    <>
      <Hero />
      <div className={styles['feature-container']}>
        {features.map((feature) => (
            <Feature 
              key={feature.id}
              title={feature.title} 
              text={feature.text} 
              image={feature.image} 
              imageAltText={feature.imageAltText} 
            />
        ))}
      </div>
    </>
  );
}
