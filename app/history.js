import { createBrowserHistory } from 'history';

let basename = {}
if (process.env.STAGING_URL) {
  basename = {
    basename: `${process.env.STAGING_URL}/index.html#/`,
  };
} else if (process.env.NODE_ENV === 'production') {
  basename = {
    basename: 'app/',
  };
}

export default createBrowserHistory(basename)
