'use client'

import { motion } from 'framer-motion';
import { cn } from "@repo/design-system/lib/utils";
import { useTranslations } from '@/utils/translations';
import { DemoContainer } from '../shared/demo-container';
// import { CalendarWidget } from './calendar/components/CalendarWidget';
// import { TaskContainer } from './tasks/components/TaskContainer';
// import { NotificationsDemo } from './notifications/NotificationsDemo';
// import { demoEvents } from './calendar/demo-data';
// import CaseTimeline from '../organize/timeline/case-timeline';
import { 
  CalendarIcon, 
  CheckSquareIcon, 
  BellIcon, 
  FileTextIcon,
  GanttChartIcon,
  UsersIcon
} from "lucide-react";

export function CollaborateSection() {
  const { t } = useTranslations('collaborate' as any);
  
  return (
    <section className="relative">
      {/* Section Header */}
      <div className="relative pt-16 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 space-y-6"
        >
          <h1 className="feature-title-diagonal text-4xl mb-4">
            {t('section.title')}
          </h1>
          <p className="feature-subtitle mb-2">
            {t('section.subtitle')}
          </p>
          <p className="feature-description mt-4">
            {t('section.description')}
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative py-12 lg:py-24">
        <div className="max-w-[90rem] mx-auto px-4">
          {/* Timeline and Calendar Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {/* Timeline Component */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-20"
            >
              <div className="rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <GanttChartIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Timeline View</h3>
                  </div>
                </div>
                <div className="p-4 h-[500px] lg:h-[600px] overflow-auto">
                  {/* <CaseTimeline /> */}
                </div>
              </div>
              
              {/* Timeline Description - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 lg:hidden"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary">Timeline</h3>
                  <p className="text-sm text-muted-foreground">
                    {t('timeline.description')}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Calendar Component */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <div className="rounded-xl bg-muted/50 backdrop-blur-sm">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{t('calendar.title')}</h3>
                  </div>
                </div>
                <div className="relative p-4 h-[500px] lg:h-[600px] overflow-hidden">
                  <div className="absolute inset-4">
                      {/* <CalendarWidget 
                      items={demoEvents}
                      initialView="month"
                    /> */}
                  </div>
                </div>
              </div>
              
              {/* Calendar Description - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-4 lg:hidden"
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-primary">{t('calendar.title')}</h3>
                  <p className="text-sm text-muted-foreground">
                    {/* {t('calendar.description')} */}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Diagonal Copy Sections - Desktop Only */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-24 relative">
            {/* Timeline Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:translate-x-[10%]"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">Timeline</h3>
                <p className="text-muted-foreground">
                  {/* {t('timeline.description')} */}
                </p>
              </div>
            </motion.div>

            {/* Calendar Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:translate-x-[20%] lg:translate-y-[50%]"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-primary">{t('calendar.title')}</h3>
                <p className="text-muted-foreground">
                  {/* {t('calendar.description')} */}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Tasks and Notifications Section */}
          <div className="mt-12 lg:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Tasks Component */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:translate-y-[-10%]"
            >
              <div className="rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <CheckSquareIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{t('tasks.title')}</h3>
                  </div>
                </div>
                <div className="p-4 h-[350px] lg:h-[450px] overflow-auto">
                  {/* <TaskContainer /> */}
                </div>
              </div>
              
              {/* Tasks Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-4 lg:mt-6 lg:translate-x-[10%]"
              >
                <div className="space-y-2 lg:space-y-4">
                  <h3 className="text-lg lg:text-xl font-semibold text-primary">{t('tasks.subtitle')}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    {t('tasks.description')}
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* Notifications Component */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="lg:translate-y-[10%]"
            >
              <div className="rounded-xl bg-muted/50 backdrop-blur-sm overflow-hidden">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <BellIcon className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">{t('notifications.title')}</h3>
                  </div>
                </div>
                <div className="p-4 h-[350px] lg:h-[450px] overflow-auto">
                  {/* <NotificationsDemo /> */}
                </div>
              </div>

              {/* Notifications Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-4 lg:mt-6 lg:translate-x-[20%]"
              >
                <div className="space-y-2 lg:space-y-4">
                  <h3 className="text-lg lg:text-xl font-semibold text-primary">{t('notifications.title')}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    {t('notifications.description')}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-12 lg:mt-24 max-w-3xl mx-auto text-center"
          >
            <p className="text-sm lg:text-base text-muted-foreground">
              {/* {t('timeline.extendedDescription')} */}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}