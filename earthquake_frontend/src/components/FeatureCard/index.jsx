import { useState } from "react";
import { Modal } from "antd";
import styles from './featureCard.module.css'
import { FeatureDetail } from "../FeatureDetail";


export const FeatureCard = ({ id, title, mag_type, magnitude, time, place, link, location }) => {

    const [showAddForm, setShowAddForm] = useState(false)

    return (
        <>
            <article className={styles.featureCard}>
                <section className={styles.magnitude}>
                    <div>
                        <h2>{magnitude}</h2>
                        <label>{mag_type}</label>
                    </div>
                </section>
                <section className={styles.content}>
                    <h2 onClick={() => setShowAddForm(true)}>{title}</h2>
                    <p>{time}</p>
                </section>
            </article>
            <Modal
                open={showAddForm}
                onCancel={() => setShowAddForm(false)}
                footer={null}
                centered
                destroyOnClose
                classNames={{ body: styles.modalBody }}
                title={<h2 className={styles.modalTitle}>{title}</h2>}
            >
                <FeatureDetail
                    id={id}
                    magType={mag_type}
                    magnitude={magnitude}
                    time={time}
                    place={place}
                    link={link}
                    location={location}
                />
            </Modal>

        </>
    )
}
