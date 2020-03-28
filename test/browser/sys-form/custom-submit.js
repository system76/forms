import { Selector } from 'testcafe'

fixture`SysForm CustomSubmit`
  .page`http://localhost:7684/iframe.html?id=high-level-components-form--custom-submit&viewMode=story`

const email = Selector('input#email')
const password = Selector('input#password')
const button = Selector('button')

test('initially renders with disabled login button', async (t) => {
  await t.expect(button.getAttribute('disabled')).eql('disabled')
  await t.expect(button.innerText).eql('LOGIN')
})

test('login button is reactive to form errors', async (t) => {
  await t.typeText(email, 'example@example.com')
  await t.typeText(password, 'validpassword')
  await t.pressKey('tab')
  await t.expect(button.getAttribute('disabled')).eql(undefined)
  await t.typeText(email, 'nope', { replace: true })
  await t.typeText(password, 'nope', { replace: true })
  await t.pressKey('tab')
  await t.expect(button.getAttribute('disabled')).eql('disabled')
})
