import { Selector, t } from 'testcafe'

fixture`SysForm CustomSubmit`
  .page`http://localhost:7684/iframe.html?id=examples-register--normal&viewMode=story`

const firstName = Selector('input#given_name')
const lastName = Selector('input#family_name')
const email = Selector('input#email')
const phone = Selector('input#phone_number')
const password = Selector('input#new_password')
const confirmed = Selector('input#password_confirm')
const button = Selector('button')

async function fill (values) {
  await t.typeText(firstName, values.firstName || 'first')
  await t.typeText(lastName, values.lastName || 'last')
  await t.typeText(email, values.email || 'example@example.com')
  await t.typeText(phone, values.phone || '1 234 567 8901')
  await t.typeText(password, values.password || 'example')
  await t.typeText(confirmed, values.confirmed || values.password || 'example')
  await t.pressKey('tab')
}

test('allows spaces in first name', async (t) => {
  await fill({ firstName: 'john joe bob son' })
  await t.expect(button.getAttribute('disabled')).eql(undefined)
})

test('password confirmation', async (t) => {
  await fill({
    password: 'thisisapassword',
    confirmed: 'incorrect password'
  })

  await t.expect(button.getAttribute('disabled')).eql('disabled')
  await t.typeText(confirmed, 'thisisapassword', { replace: true })
  await t.expect(button.getAttribute('disabled')).eql(undefined)
})
