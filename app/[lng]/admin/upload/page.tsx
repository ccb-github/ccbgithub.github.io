import UploadForm from "#/components/common/input/UploadForm"
import { writeFile } from "fs/promises"
import { BasePageParams } from "#/types/pageProp"
import { Language } from "#/lib/i18n/settings"

export default async function AdminUploadPage({
  params,
}: {
  params: BasePageParams
}) {
  const { lng } = params
  //const confirmDialog = useContext(ConfirmContext)
  async function upload(data: FormData) {
    "use server"
    const UPLOAD_BASE_PATH = "/public"
    const file: File | null = data.get("file") as unknown as File

    if (!file) {
      return { result: false }
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = `${UPLOAD_BASE_PATH}/${file.name}.json`
    await writeFile(path, buffer)
    console.log(`open ${path} to see the uploaded file`)

    return { success: true }
  }
  return <UploadForm formAction={upload} lng={lng as Language} />
}
