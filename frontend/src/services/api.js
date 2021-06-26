export function getProcedures(app) {
  const procedures = app.services('procedures');
  return procedures.find({
    query: {'sort': {'createdAt': -1}}
  })
    .then((data, err) => data.data);
}
