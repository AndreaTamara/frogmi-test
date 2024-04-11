import { Pagination, Select, InputNumber, notification } from 'antd'
import styles from './header.module.css'
import { magTypeOptions } from '../../constants'

export const Header = ({ currentPage, pageSize, totalRecords, setMagTypesFilter, setCurrentPage, setPageSize }) => {

    const [api, contextHolder] = notification.useNotification();

    const onSetPageSize = (e) => {
        const value = e.target.value
        const isNumber = /^[0-9]+$/.test(value)
        if (isNumber && parseInt(value) <= 1000 && parseInt(value) > 0) {
            setPageSize(value)
        } else {
            const errMsn = `Please enter a valid page size. ${isNumber ? 'The maximum allowed value is 1000 records per page.' : ''}`
            api.error({
                message: 'Invalid Page Size',
                description: errMsn,
            });
        }
    }

    return (
        <>
            {contextHolder}
            <header className={styles.header}>
                <section className={styles.logo}>
                    <h1>Last</h1>
                    <h2>Q</h2>
                    <h1>uake</h1>
                </section>
                <section className={styles.filtersBar}>
                    <Select
                        mode="multiple"
                        allowClear
                        className={styles.filterSelect}
                        placeholder="filter per meg_type"
                        maxTagCount={'responsive'}
                        onChange={(value) => setMagTypesFilter(value)}
                        options={magTypeOptions}
                    />
                    <div className={styles.paginationWrapper}>
                        <Pagination
                            simple
                            current={currentPage}
                            pageSize={pageSize}
                            showSizeChanger={false}
                            total={totalRecords}
                            onChange={(page) => {
                                setCurrentPage(page)
                            }}
                        />
                        <div className={styles.pageSizeContainer}>
                            <InputNumber
                                controls={false}
                                size='small'
                                value={pageSize}
                                onPressEnter={onSetPageSize}
                                className={styles.inputPageSize}
                            />
                            <span>/</span>
                            <span>Page</span>
                        </div>
                    </div>
                </section>
            </header>
        </>
    )
}
