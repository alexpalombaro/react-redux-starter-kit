//import schema from ''
import {MongoClient} from 'mongodb';

export default function *graphqlMiddleware(next:Function) {
  if (/graphql(\?|$)/.test(this.request.url)) {
    MongoClient.connect('mongodb://localhost:27017/masterdb', (err, db) => {
      db.close();
    })
  }
  yield next;
}