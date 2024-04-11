export const parseTimestamp = (time) => {
    const timestamp = new Date(parseInt(time));
    return timestamp.toLocaleString()
}
export const parseLocation = (location) => {
    if (!location.latitude && !location.longitude) return ''
    const latitude = parseFloat(location.latitude)
    const longitude = parseFloat(location.longitude)
    const latitudeDir = latitude >= 0 ? "N" : "S";
    const longitudeDir = longitude >= 0 ? "E" : "W";
    return `${Math.abs(latitude).toFixed(3)}°${latitudeDir} ${Math.abs(longitude).toFixed(3)}°${longitudeDir}`;
}

export const buildUrlParams = (params) => {
    const urlParams = new URLSearchParams();
    if (params) {
        Object.entries(params).forEach(([name, value]) => {
            if (value) {
                if (Array.isArray(value)) {
                    if (value.length > 0) {
                        urlParams.append(name, value.join(','))
                    }
                } else {
                    urlParams.append(name, value)
                }
            }
        })
    }
    return urlParams
}