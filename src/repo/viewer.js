import Viewer from '../models/viewer';

export const getViewer = id =>
  new Promise(resolve =>
    resolve(new Viewer(id)));
