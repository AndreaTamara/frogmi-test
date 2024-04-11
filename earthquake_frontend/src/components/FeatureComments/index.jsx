import styles from './featureComments.module.css'
import { useGetData } from "../../hooks/useGetData";
import { CustomEmpty } from '../CustomEmpty';

export const FeatureComments = ({ id }) => {

    const { data: comments, totalRecords } = useGetData(`api/features/${id}/comments`)

    return (
        <section className={styles.commentsList}>
            {totalRecords === 0 ?
                <CustomEmpty
                    description={'No comments to show'}
                />
                :
                comments?.map(comment => {
                    const created_at = new Date(comment.created_at)
                    return (
                        <div
                            key={comment.id}
                            className={styles.commentCard}
                        >
                            <label>{created_at?.toLocaleString()}</label>
                            <p>{comment.body}</p>
                        </div>
                    )
                })}
        </section>
    )
}
