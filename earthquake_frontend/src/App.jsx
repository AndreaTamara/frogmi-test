import { useState } from 'react'
import styles from './App.module.css'
import { FeatureCard } from './components/FeatureCard'
import { Header } from './components/Header'
import { parseTimestamp } from './utils'
import { useGetData } from './hooks/useGetData'
import { CustomEmpty } from './components/CustomEmpty'

function App() {

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [magtypesFilter, setMagTypesFilter] = useState([])

  const { data, totalRecords } = useGetData('api/features', currentPage, pageSize, magtypesFilter)

  return (
    <>
      <Header
        currentPage={currentPage}
        pageSize={pageSize}
        totalRecords={totalRecords}
        setMagTypesFilter={setMagTypesFilter}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
      />
      <div className={styles.featureListWrapper}>
        {totalRecords === 0 ?
          <CustomEmpty
            description={'No results found'}
          />
          :
          <main className={styles.featureList}>
            {data?.map((feature) => (
              <FeatureCard
                key={feature.id}
                id={feature.id}
                title={feature.attributes.title}
                mag_type={feature.attributes.mag_type}
                magnitude={parseFloat(feature.attributes.magnitude).toFixed(1)}
                time={parseTimestamp(feature.attributes.time)}
                place={feature.attributes.place}
                link={feature.links.external_url}
                location={feature.attributes.coordinates}
              />
            ))}
          </main>
        }
      </div>
    </>
  )
}

export default App
