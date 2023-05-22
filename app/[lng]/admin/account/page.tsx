
import { AccountList } from '#/components/admin/account/AccountList';
import type { BasePageProps } from '#/types/page';

export default async function Page({ params:{lng} }: BasePageProps) {
 
 
  return (
    <div className="space-y-8 bg-gradient-to-bl">
      <h1 className="text-xl font-medium text-gray-300">Account list</h1>
      <div className="space-y-10">
        <AccountList lng={lng}/> 
      </div>
    </div>
  );
}
