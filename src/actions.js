
// action creators
export const updateCreator = obj => () => (obj)


export const setCanSelect = ({ canSelect }) => {
  if (canSelect) {
    return { canSelect: false, selectedUris: [] }
  }
  return ({ canSelect: !canSelect })
}

export const addSelectedUriCreator = uri =>
  ({ selectedUris }) => ({ selectedUris: [...new Set([...selectedUris, uri])] })

