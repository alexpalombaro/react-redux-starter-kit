import schema from ''

export default function *graphqlMiddleware(next:Function) {
  if (/graphql(\?|$)/.test(this.request.url)) {
  }
  yield next;
}