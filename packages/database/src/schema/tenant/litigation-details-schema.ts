import { pgTable, uuid, text, timestamp, date, numeric, boolean, pgSchema, AnyPgColumn, integer} from 'drizzle-orm/pg-core';
import { cases } from './case-schema';
import { profiles } from './profiles-schema';
import { relations } from 'drizzle-orm';
import { courthouses } from '../public/courthouses-schema';

export const tenantSchema = pgSchema("tenant");

export const litigationDetails = tenantSchema.table("litigation_details", {
    // Core identification
    id: uuid('id').defaultRandom().primaryKey(),
    caseId: uuid('case_id')
        .notNull()
        .references(() => cases.id),
        
    // Court and filing information
    courthouseId: integer('courthouse_id')
        .references(() => courthouses.id),
    filingNumber: text('filing_number'),  
    courtJurisdictionId: integer('court_jurisdiction_id')
        .references(() => courthouses.jurisdictionId),
    stateId: integer('state_id')
        .references(() => courthouses.stateId),
    cityId: integer('city_id')
        .references(() => courthouses.cityId),
    // Critical dates
    filingDate: timestamp('filing_date'),           // When case was filed
    admissionDate: timestamp('admission_date'),     // When court accepted case
    serviceDate: timestamp('service_date'),         // When defendants were served
    firstHearingDate: timestamp('first_hearing_date'), // 
    nextHearingDate: timestamp('next_hearing_date'), // 
    
    // Procedural information
    proceedingType: text('proceeding_type').notNull(),  // Type of legal proceeding
    currentStage: text('current_stage').notNull(),      // Current stage in process
    
    // Related proceedings with explicit AnyPgColumn type
    parentProceedingId: uuid('parent_proceeding_id')
        .references((): AnyPgColumn => litigationDetails.id, { onDelete: 'set null' }),
    relationshipType: text('relationship_type'),         // How it relates to parent
    
    // Financial tracking
    claimAmount: numeric('claim_amount', { precision: 15, scale: 2 }), // Amount in dispute
    dateOfCalculation: timestamp('date_of_calculation'),
    realCost: numeric('real_cost', { precision: 10, scale: 2 }),     // Fees paid to court
    
    // Counter columns for performance
    hearingsCount: numeric('hearings_count').default('0'),
    
    // Important deadlines
    nextDeadline: timestamp('next_deadline'),
    responseDeadline: timestamp('response_deadline'),
    appealDeadline: timestamp('appeal_deadline'),
    
    // Court requirements
    specialInstructions: text('special_instructions'),  // Court's specific requirements
    requiredDocuments: text('required_documents'),      // Documents needed by court
    
    // Time tracking specific to court
    totalCourtHours: numeric('total_court_hours', { precision: 10, scale: 2 }).default('0'),
    totalPreparationHours: numeric('total_preparation_hours', { precision: 10, scale: 2 }).default('0'),
    
    // Audit trail
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdBy: uuid('created_by').notNull().references(() => profiles.id),
    updatedBy: uuid('updated_by').notNull().references(() => profiles.id),
    version: numeric('version').default('1')
});

// Define the relationships
export const litigationDetailsRelations = relations(litigationDetails, ({ one, many }) => ({
    // Self-referential relationships
    parentProceeding: one(litigationDetails),
    childProceedings: many(litigationDetails),
    
    // Other relationships
    case: one(cases, {
        fields: [litigationDetails.caseId],
        references: [cases.id],
    }),
    createdByUser: one(profiles, {
        fields: [litigationDetails.createdBy],
        references: [profiles.id],
    }),
    updatedByUser: one(profiles, {
        fields: [litigationDetails.updatedBy],
        references: [profiles.id],
    })
}));

// Type definitions for TypeScript
export type LitigationDetail = typeof litigationDetails.$inferSelect;
export type NewLitigationDetail = typeof litigationDetails.$inferInsert;