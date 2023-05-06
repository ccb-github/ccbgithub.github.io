import { SlideProps } from '@mui/material';
import Link from 'next/link';

export default function MainPanel({ mainPanelItems} : {mainPanelItems: SlideProps}) {
  
  return (
    <div className="space-y-4">
      {mainPanelItems.map((section) => (
        <div key={section.name} className="space-y-5">
          <div className="text-xl font-semibold uppercase tracking-wider text-gray-400">
            {t(section.name)}
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            
            {section.items.map((item) => (
              <Link
                href={`${pathName ? pathName : ''}/${item.link}`}
                key={item.name}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
              >
                <div
                  className="font-medium text-gray-200 group-hover:text-gray-50"
                >
                  {t(item.name)}
                </div>

                {item.description ? (
                  <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                    {t(item.description)}
                  </div>
                ) : null}
              </Link>
            ))}
            <Link
              href={`${pathName ? pathName : ''}/${item.link}`}
                key={item.name}
                className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
            >
              <div
                className="font-medium text-gray-200 group-hover:text-gray-50"
              >
                <li className=""><p>Name</p><span ></span> <p>role</p></li>
                <li></li>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}