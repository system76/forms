import { Selector } from 'testcafe'

import { assertScreenshot } from '../../utility/browser'

fixture`SysFormButton Colors`
  .page`http://localhost:7684/iframe.html?id=components-button--colors&viewMode=story`

const button = (i) => Selector(`#root button:nth-child(${i})`)

test('screenshots', async (t) => {
  await assertScreenshot(t, button(1), `sys-form-button/colors-normal`)
  await assertScreenshot(t, button(2), `sys-form-button/colors-primary`)
  await assertScreenshot(t, button(3), `sys-form-button/colors-secondary`)
})
