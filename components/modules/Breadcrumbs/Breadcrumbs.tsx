import React, { Suspense } from 'react';
import Link from 'next/link';
import { useMemo } from 'react';
import Crumb from './Crumb';
import { useLang } from '@/hooks/useLang';
import { usePathname } from 'next/navigation';
import { IBreadcrumbsProps } from '@/types/modules';

const generatePathParts = (pathStr: string) => {
  const pathWithoutQuery = pathStr.split('?')[0];
  return pathWithoutQuery.split('/').filter((v) => v.length > 0);
};

const Breadcrumbs = ({
  getTextGenerator,
  getDefaultTextGenerator,
}: IBreadcrumbsProps) => {
  const pathname = usePathname();
  const { lang, translations } = useLang();

  const breadcrumbs = useMemo(() => {
    const asPathNestedRoutes = generatePathParts(pathname);
    const pathnameNestedRoutes = generatePathParts(pathname);

    return asPathNestedRoutes.map((subpath, idx) => {
      const param = pathnameNestedRoutes[idx].replace('[', '').replace(']', '');
      const href = '/' + asPathNestedRoutes.slice(0, idx + 1).join('/');

      return {
        href,
        textGenerator: getTextGenerator(param, []), // Передаем пустой массив
        text: getDefaultTextGenerator(subpath, href),
      };
    });
  }, [pathname, getTextGenerator, getDefaultTextGenerator, lang]);

  return (
    <div className='container breadcrumbs__container'>
      <ul className='list-reset breadcrumbs'>
        <li className='breadcrumbs__item'>
          <Link href='/' className='breadcrumbs__item__link first-crumb'>
            {translations[lang].breadcrumbs.main}
          </Link>
        </li>
        {breadcrumbs.map((crumb, idx) =>
          crumb.text ? (
            <li key={idx} className='breadcrumbs__item'>
              
              {/**eslint-disable-next-line @typescript-eslint/ban-ts-comment
               * @ts-ignore */}
              <Crumb
                {...crumb}
                key={idx}
                last={idx === breadcrumbs.length - 1}
              />
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

const BreadcrumbsWrapper: React.FC<IBreadcrumbsProps> = (props) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Breadcrumbs {...props} />
  </Suspense>
);

export default BreadcrumbsWrapper;

