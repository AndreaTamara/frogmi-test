export const baseURL = import.meta.env.VITE_BASE_URL;

export const magTypeOptions = ['md', 'ml', 'ms', 'mw', 'me', ' mi', 'mb', 'mlg']
    .map(el => ({ value: el, label: el }))
