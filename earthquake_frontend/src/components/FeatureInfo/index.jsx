import { parseLocation } from '../../utils'
import { CommentForm } from '../CommentForm'
import styles from './featureInfo.module.css'
export const Featureinfo = ({ magnitude, magType, place, time, location, link, id }) => {

    const attributes = [
        { label: 'magnitude', value: `${magnitude} ${magType}` },
        { label: 'place', value: place },
        { label: 'time', value: time },
        { label: 'location', value: parseLocation(location) },
        { label: 'url', value: <a href={link} target="_blank" rel="noreferrer noopener">{link}</a> },
    ]
    return (
        <section className={styles.featureInfoContainer}>
            {attributes?.map(attribute => (
                <div className={styles.attribute} key={attribute.label}>
                    <label>{attribute.label}:</label>
                    <p>{attribute.value}</p>
                </div>
            ))}
            <CommentForm
                id={id}
            />
        </section>
    )
}
