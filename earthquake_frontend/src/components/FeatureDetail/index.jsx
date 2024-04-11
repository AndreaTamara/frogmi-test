import { Tabs } from "../Tabs"
import { useState } from "react"
import { Featureinfo } from "../FeatureInfo"
import { FeatureComments } from "../FeatureComments"

export const FeatureDetail = ({ id, magType, magnitude, time, place, link, location }) => {
    const [selectedView, setSelectedView] = useState('details')
    return (
        <section>
            <Tabs
                activeTab={selectedView}
                onSelect={setSelectedView}
                options={['details', 'comments']}
            />
            {selectedView === 'details' ?
                <Featureinfo
                    id={id}
                    magType={magType}
                    magnitude={magnitude}
                    time={time}
                    place={place}
                    link={link}
                    location={location}
                />
                :
                <FeatureComments id={id} />
            }
        </section>
    )
}
