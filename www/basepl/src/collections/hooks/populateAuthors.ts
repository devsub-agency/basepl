import type { CollectionAfterReadHook } from 'payload'

export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.authors) {
    const updatedDoc = doc
    const authorDoc = await payload.find({ collection: 'users' })
    const author = authorDoc.docs.find((author) => author.id === doc.authors)

    updatedDoc.populatedAuthors = {
      name: author?.name,
      role: author?.role,
    }
    return updatedDoc
  }
  return doc
}
