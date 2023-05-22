'use client'
import DateInputFieldTemplate from "#/components/common/input/DateInputFieldTemplate";
import { StringInputFieldTemplate } from "#/components/form/AddDataForm";
import { schemaJson } from "#/lib/constants";
import { useTranslation } from "#/lib/i18n";
import { BasePageProps } from "#/types/page";

function TypeSign({
  text,
  children,
  className
}: {
  text: string,
  children?: React.ReactNode;
  className?: string
}) {
  return (
    <span
      className={`
        inline-flex space-x-2 rounded-lg bg-gray-700 
        px-3 py-1 text-sm font-medium cursor-default
      text-gray-100 hover:bg-gray-500 hover:text-white
        ${className || ''}
      `}>
      {text}
      {children}
      {/* <ArrowRightIcon className="block w-4" /> */}
    </span>
  );
};

export default async function Page({ params }: BasePageProps) {
  const { t } = await useTranslation(params.lng)
  
  const addCatgory = async () => {
  }
  return (
    <form
      method="post"
      action="#"
      id="insertForm"
      onSubmit={addCatgory}
      className="h-full overflow-y-scrol pt-2 grid 
      grid-cols-1 lg:grid-cols-2"
    >
      <h2 className="col-span-1 lg:col-span-2">Enter the catgory you want add</h2>
  
      <StringInputFieldTemplate {...schemaJson["Catgory"].properties["name"]}/>
      <StringInputFieldTemplate {...schemaJson["Catgory"].properties["description"]}/>
      <DateInputFieldTemplate 
        name="createAt" optional={false} 
        type={"date"} indexed={false} mapTo={""}
      />
      <div className="form-group">
        <button type="submit">Submit</button>
      </div>
    </form>


  )
}



