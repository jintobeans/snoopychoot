import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_PHOTOS = 'GET_USER_PHOTOS'
const ADD_PHOTO = 'ADD_PHOTO'
// const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultPhotos = []

/**
 * ACTION CREATORS
 */
const getUserPhotos = (photos) => ({type: GET_USER_PHOTOS, photos })
const addPhoto = (photo) => ({type: ADD_PHOTO, photo})
// const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const usersPhotos = () =>
  dispatch =>
    axios.get('/api/photos')
      .then(res =>
        dispatch(getUserPhotos(res.data.imagePreviewUrl || defaultPhotos)))
      .catch(err => console.log(err))

export const addPhotoToDatabase = (file) =>
  dispatch =>
    axios.post('/api/photos', file)
      .then(res =>
        dispatch(addPhoto(res.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function (state = defaultPhotos, action) {
  switch (action.type) {
    case GET_USER_PHOTOS:
      return action.photos
    case ADD_PHOTO:
      return [...state.photos, action.photo]
    default:
      return state
  }
}
