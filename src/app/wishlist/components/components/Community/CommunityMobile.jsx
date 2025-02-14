
'use client'
import React from 'react';
import styles from './style/Community.module.css'; // Importăm CSS-ul specific
import Image from 'next/image';

const CommunityMobile = () => {
    return (
        <div className={`${styles.rewardsContainer} relative`}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <Image width={1} height={1} src="/imgs/Crowdfunding/Community/work.svg" alt="Work In Progress Icon" />
                </div>
                {/* <div className={styles.textWrapper}>
                    <h2>Work in Progress</h2>
                </div> */}
            </div>
        </div>
    );
}

export default CommunityMobile;
