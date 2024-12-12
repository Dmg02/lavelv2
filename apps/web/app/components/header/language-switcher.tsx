'use client';

import { Button } from '@repo/design-system/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (locale: string) => {
    const currentLocale = pathname.split('/')[1];
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('en')}
        disabled={pathname.startsWith('/en')}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => switchLocale('es')}
        disabled={pathname.startsWith('/es')}
      >
        ES
      </Button>
    </div>
  );
};
