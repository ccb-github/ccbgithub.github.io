import AsyncSelect from "#/components/common/AsyncSelect"
import React from "react"

import { Root, createRoot } from "react-dom/client"
import { act } from "react-dom/test-utils"

let container: HTMLDivElement | null = null
let root: Root | null = null
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div")
  root = createRoot(container!)
  document.body.appendChild(container)
})

afterEach(() => {
  // cleanup on exiting
  root?.unmount()
  container!.remove()
  container = null
})

it("renders user data", async () => {
  const fakeUser = [{ value: "Joni Baez", label: "32", color: "red" }]
  const loadFunc = jest.fn(() => Promise.resolve(fakeUser))
  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    root?.render(<AsyncSelect asyncLoadOptions={loadFunc} />)
  })

  // expect(container!.querySelector("summary")?.textContent).toBe(fakeUser)
  // expect(container!.querySelector("strong")?.textContent).toBe(fakeUser)
})
// remove the mock to ensure tests are completely isolated  global.fetch.mockRestore()})