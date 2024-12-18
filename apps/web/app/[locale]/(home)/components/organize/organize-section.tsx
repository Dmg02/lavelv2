'use client';

import { motion } from 'framer-motion';
import { cn } from "@repo/design-system/lib/utils";
import { useTranslations } from '@/utils/translations';
import { RecordsTable } from './records-table';
import { LibraryExplorer } from './library/library-explorer';
// import CaseTimeline from './timeline/case-timeline';
import { DemoContainer } from '../shared/demo-container';
import { cases } from '@/data/cases';
import { lawyers } from '@/data/lawyers';

export function OrganizeSection() {
  const { t } = useTranslations('organize');
  
  return (
    <section className="relative">
      {/* Section Header */}
      <div className="relative pt-16 pb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 space-y-2"
        >
          <h1 className="feature-title-reverse text-4xl">
            {t('records.title')}
          </h1>
        </motion.div>
      </div>

      {/* Records Feature - Left text, Right demo */}
      <div className="relative pt-8 pb-12 lg:pb-24">
        <div className="max-w-[90rem] mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-[0.8fr,1.2fr] gap-8 lg:gap-24 items-center">
            {/* Text Content */}
            <div className="relative z-10 space-y-4 order-1 lg:self-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-2"
              >
                <p className="feature-subtitle">
                  {t('records.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="feature-description">
                  {t('records.description')}
                </p>
              </motion.div>
            </div>

            {/* Records Demo */}
            <DemoContainer className="order-2 w-full">
              <RecordsTable data={cases} lawyers={lawyers} />
            </DemoContainer>
          </div>
        </div>
      </div>

      {/* Library Feature */}
      <div className="relative py-12 lg:py-24">
        <div className="max-w-[90rem] mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-[1.2fr,0.8fr] gap-8 lg:gap-24 items-center lg:items-start">
            {/* Library Demo */}
            <div className="w-full order-2 lg:order-1">
              <DemoContainer className="w-full min-h-[700px] lg:h-[800px]">
                <LibraryExplorer />
              </DemoContainer>
            </div>

            {/* Text Content */}
            <div className="relative z-10 space-y-6 lg:space-y-8 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h2 className="feature-title-reverse">
                  {t('library.title')}
                </h2>
                <p className="feature-subtitle">
                  {t('library.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <p className="feature-description">
                  {t('library.description')}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 