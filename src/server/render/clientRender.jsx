// @flow
// HTML
import html from './html'

function clientRender() {
  return (
    req: { url: string, isMobile: boolean, isBot: boolean },
    res: { redirect: any, send: any, locals: any },
    next: any
  ) => {
    if (req.isBot) {
      return next()
    }

    const initialState: Object = {
      device: {
        isMobile: res.locals.isMobile
      }
    }

    res.send(
      html({
        markup: '',
        initialState
      })
    )

    return true
  }
}

export default clientRender
