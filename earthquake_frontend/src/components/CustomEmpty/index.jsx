import { Empty } from 'antd'


export const CustomEmpty = ({ description }) => {
    return (
        <Empty
            imageStyle={{ marginBottom: 0, marginTop: 40, height: 140 }}
            description={<h3 style={{ opacity: 0.7 }}>{description}</h3>}
        />
    )
}
