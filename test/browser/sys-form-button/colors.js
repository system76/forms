import { Selector } from 'testcafe'

import { assertScreenshot } from '../../utility/browser'

fixture`SysFormButton Colors`
  .page`http://localhost:7684/iframe.html?id=components-button--colors&viewMode=story`

const container = Selector('#root > div > div')

test('screenshots', async (t) => {
  await assertScreenshot(t, container, `sys-form-button/colors`)
})
