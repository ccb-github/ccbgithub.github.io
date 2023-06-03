import ConfirmDialog from "#/components/common/dialog/ConfirmDialog";

export default async function ModelDialog(props: any) {
  return (
    <><ConfirmDialog
      lng="en"
      closeAction={async () => {
        "use server";
        return true;
      } }
      confirmAction={async () => {
        "use server";
        return false;
      } } /><p>Indicate</p></>
  );
}