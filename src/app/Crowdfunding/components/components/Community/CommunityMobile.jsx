import React from 'react';
import styles from './style/Community.module.css'; // Importăm CSS-ul specific
import Image from 'next/image';

const CommunityMobile = () => {
    return (
        <div id="rewards" className={`${styles.rewardsContainer} relative`}>
            <div className={styles.overlay}></div>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <Image src="/imgs/Crowdfunding/Community/progress.svg" width={160} height={100} alt="Work In Progress Icon" />
                </div>
            </div>
        </div>
    );
}

export default CommunityMobile;
