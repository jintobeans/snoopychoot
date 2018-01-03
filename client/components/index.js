/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Main} from './main'
export {default as UserHome} from './user-home'
export {default as UploadForm} from './upload-form'
export {default as Home} from './home'
export {Login, Signup} from './auth-form'
export {default as Result} from './result'
export {default as UserPhotos} from './userphotos'
export {default as TakePhoto} from './takephoto'


