'use client';
import { Button } from '@repo/design-system/components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useTranslations } from '../../../../utils/translations';

export function Hero(): ReactNode {
  const { t } = useTranslations('hero');

  const waitlistUrl =
    'https://lavel.notion.site/146d3e9e020080a397b3d821ade763d5?pvs=105';

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center gap-8 py-20 lg:py-40">
          <div className="flex flex-col gap-4">
            <h1 className="max-w-2xl text-center font-regular text-5xl tracking-tighter md:text-7xl">
              {t('title')}
            </h1>
            <p className="max-w-2xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight md:text-xl">
              {t('description')}
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4" asChild>
              <Link
                href={waitlistUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('cta.signup')} <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
