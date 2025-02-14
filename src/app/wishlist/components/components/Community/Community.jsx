'use client'
import React from 'react';
import styles from './style/Community.module.css';
import Image from 'next/image';

const Community = () => {
    return (
        <div id="rewards" className={`${styles.rewardsContainer} relative`}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <Image src="/imgs/Crowdfunding/Community/work.svg" width={160} height={100} alt="Work In Progress Icon" />
                </div>
                <div className={styles.textWrapper}>
                    <h2>Work In Progress</h2>
                </div>
            </div>
        </div>
    );
}

export default Community;
