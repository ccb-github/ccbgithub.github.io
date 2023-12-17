import { FaDownload } from "react-icons/fa"
import Button from "../common/Button"

type DownloadButtonProps = {
  customIconName: string
}
export default function DownloadButton(props: DownloadButtonProps) {
  console.log(props)
  return (
    <Button>
      <FaDownload />
      Download
    </Button>
  )
}
