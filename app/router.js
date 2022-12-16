import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('docs', function() {
    this.route('doc', { path: ':name'});
  });
  this.route('tutorial');
  this.route('test');
});
