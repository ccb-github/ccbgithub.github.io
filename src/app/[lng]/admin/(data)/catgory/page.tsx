import MongodbList from "#/components/common/MongodbList";
import { getByNameAndFilter } from "#/lib/api/ApolloEndpoint";
import { useTranslation } from "#/lib/i18n";
import { BasePageProps } from "#/types/page";

// function TypeSign({
//   text,
//   children,
//   className
// }: {
//   text: string,
//   children?: React.ReactNode;
//   className?: string
// }) {
//   return (
//     <span
//       className={`
//         inline-flex space-x-2 rounded-lg bg-gray-700 
//         px-3 py-1 text-sm font-medium 
//       text-gray-100 hover:bg-gray-500 hover:text-white
//         ${className || ''}
//       `}>
//       {text}
//       {children}
//       {/* <ArrowRightIcon className="block w-4" /> */}
//     </span>
//   );
// };

export default async function Page({ params: {lng} }: BasePageProps) {
  
  const { t } = await useTranslation(lng, 'common')
  

  return (
    <MongodbList lng={lng} type="Catgory"/>
  )
}



