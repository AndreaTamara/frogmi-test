import styles from './tabs.module.css'

export const Tabs = ({ activeTab, onSelect, options }) => {

    return (
        <nav className={styles.tabsContainer}>
            {options.map(opt => (
                <div
                    key={opt}
                    className={activeTab === opt ? styles.active : null}
                    onClick={() => onSelect(opt)}
                >
                    {opt}
                </div>
            ))}
        </nav>
    )
}
