export default mirrorKeys({
  LOAD_PERSONS        : null,
  LOAD_PERSONS_SUCCESS: null,
  LOAD_PERSONS_FAIL   : null,
});

function mirrorKeys(obj) {
  const mirroredObject = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      mirroredObject[key] = key
    }
  }

  return mirroredObject
}
