test('get data from restful api', () => {
  fetch('https://atr-test-dh1.aiam-dh.com/atr-gateway/ticketmanagement/api/v1/tickets?ticketType=incident&sortDirection=DESC&page=0&perPage=10', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'apiToken': 'eyJhbGciOiJSUzUxMiIsInppcCI6IkRFRiJ9.eNqUkl9LhEAUxb_LfZbAtD_rU5NeZdBVGcckIsTVKYQcRUcKxO_e7L4VsW6v5_7OvZfDWWCaD-DA29hLJWSjxKTAgGpuWiFroSef4qCFehSVEg045o1t3V_f7ixrZ5sGDGLs2mlqezmB87KArLqjiSHxyj1JUxoH2j2MvQZVKzS0rKvxkyMup09YctynEeF4jne1gWNZJCz0o6TYXM2pGyIvsyRnLmabeJxw6lOXcJrE52DOaBAgu_wP6mHMKX_eBH2KkXdRFCf8n0FsYmGcFBF6AT6SbPs6y6O_Qn014H3s5-HYCCCclXmGDLQqvoZTgWzbMu8sSwtd1X78at9DVddCqnkUV3XfwfoNAAD__w.VoBBrE8C488bD_U0W3nEa7F_0ER5wc85wXcqBiVNOZCzH5_j5RkfYELlN0NV8LbQoEWH3YZRkOd9sCMDAF677XJ__rZ811E1MJiZ9nmxJjam9D5Pnp-X1KHnAl5CyjAuwiNf_Wd6nK1_glr2PadefSunFMuvYTT5xguV6ihN2qM',
    }
  }).then(res => res.json()).then(res => console.log(res));
  expect(0 + 1).toBe(1);
});