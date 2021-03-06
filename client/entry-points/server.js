import routes from 'routes';
import {match} from 'react-router';
import createLocation from 'history/lib/createLocation';

export {default as Root} from 'containers/Root';
export {default as createStore} from 'store';

export function route(url) {
  const location = createLocation(url);

  return new Promise((resolve, reject) => {
    match({routes, location}, (err, redirectLocation, renderProps) => {
      if (err) {
        reject([500], err);
      } else if (redirectLocation) {
        reject([301, redirectLocation]);
      } else if (renderProps === null) {
        reject([404]);
      } else {
        resolve(renderProps);
      }
    });
  });
}
