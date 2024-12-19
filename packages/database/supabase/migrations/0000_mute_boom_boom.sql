CREATE SCHEMA "law";
--> statement-breakpoint
CREATE SCHEMA "tenant";
--> statement-breakpoint
CREATE SCHEMA "trace";
--> statement-breakpoint
CREATE TYPE "tenant"."event_status" AS ENUM('confirmed', 'tentative', 'cancelled');--> statement-breakpoint
CREATE TYPE "tenant"."event_type" AS ENUM('hearing', 'appointment', 'call', 'meeting', 'other');--> statement-breakpoint
CREATE TABLE "tenant"."case_parties" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"is_client" boolean DEFAULT false,
	"client_id" uuid,
	"corporation_id" uuid,
	"role" text NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"is_active" boolean DEFAULT true,
	"contact_info" jsonb,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant"."cases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"status" text NOT NULL,
	"original_case_id" uuid,
	"relationship_type" text,
	"start_date" timestamp NOT NULL,
	"estimated_end_date" timestamp,
	"actual_end_date" timestamp,
	"transformation_date" timestamp,
	"lead_attorney_id" uuid NOT NULL,
	"assigned_team_id" uuid NOT NULL,
	"last_activity_at" timestamp DEFAULT now() NOT NULL,
	"last_activity_by_id" uuid NOT NULL,
	"last_activity_type" text NOT NULL,
	"documents_count" integer DEFAULT 0,
	"private_documents_count" integer DEFAULT 0,
	"tasks_count" integer DEFAULT 0,
	"pending_tasks_count" integer DEFAULT 0,
	"completed_tasks_count" integer DEFAULT 0,
	"events_count" integer DEFAULT 0,
	"upcoming_events_count" integer DEFAULT 0,
	"notes_count" integer DEFAULT 0,
	"private_notes_count" integer DEFAULT 0,
	"last_note_at" timestamp,
	"last_note_by_id" uuid,
	"comments_count" integer DEFAULT 0,
	"unread_comments_count" integer DEFAULT 0,
	"total_billable_hours" numeric(10, 2) DEFAULT '0',
	"total_non_billable_hours" numeric(10, 2) DEFAULT '0',
	"total_hours" numeric(10, 2) DEFAULT '0',
	"total_task_hours" numeric(10, 2) DEFAULT '0',
	"total_meeting_hours" numeric(10, 2) DEFAULT '0',
	"total_email_hours" numeric(10, 2) DEFAULT '0',
	"total_phone_hours" numeric(10, 2) DEFAULT '0',
	"total_travel_hours" numeric(10, 2) DEFAULT '0',
	"total_other_hours" numeric(10, 2) DEFAULT '0',
	"total_media_count" integer DEFAULT 0,
	"total_media_size" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	"version" integer DEFAULT 1,
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tenant"."clients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"client_type" varchar(50) DEFAULT 'individual' NOT NULL,
	"description" text,
	"contact_info" jsonb,
	"preferred_language" varchar(5) DEFAULT 'es',
	"portal_access" boolean DEFAULT false NOT NULL,
	"portal_access_email" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"billing_info" jsonb,
	"primary_team_id" uuid,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"deleted_at" timestamp with time zone,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	"deleted_by" uuid,
	CONSTRAINT "clients_portal_access_email_unique" UNIQUE("portal_access_email"),
	CONSTRAINT "unique_client_name" UNIQUE("name"),
	CONSTRAINT "unique_portal_email" UNIQUE("portal_access_email"),
	CONSTRAINT "portal_email_check" CHECK (portal_access_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$')
);
--> statement-breakpoint
CREATE TABLE "tenant"."corporations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"rfc" varchar(13),
	"constitution_date" timestamp with time zone,
	"notary_number" integer,
	"notary_state" varchar(100),
	"instrument_number" varchar(100),
	"is_active" boolean DEFAULT true NOT NULL,
	"status" varchar(50) DEFAULT 'active' NOT NULL,
	"notes" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	CONSTRAINT "unique_name_per_client" UNIQUE("client_id","name")
);
--> statement-breakpoint
CREATE TABLE "court_participations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"party_id" uuid NOT NULL,
	"court_role" text NOT NULL,
	"service_date" timestamp,
	"appearance_date" timestamp,
	"service_status" text,
	"appearance_status" text,
	"has_appearance" boolean DEFAULT false,
	"represented_by" text,
	"last_action_date" timestamp,
	"next_action_deadline" timestamp,
	"process_status" text,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant"."events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"is_all_day" boolean DEFAULT false NOT NULL,
	"location" varchar(255),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"status" "tenant"."event_status" DEFAULT 'confirmed' NOT NULL,
	"recurrence_rule" text,
	"organizer_id" uuid NOT NULL,
	"timezone" varchar(50) DEFAULT 'UTC' NOT NULL,
	"color" varchar(7),
	"metadata" jsonb,
	"case_id" uuid,
	"event_type" "tenant"."event_type" DEFAULT 'appointment' NOT NULL,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tenant"."litigation_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"case_id" uuid NOT NULL,
	"court_name" text NOT NULL,
	"court_district" text,
	"court_room" text,
	"filing_number" text,
	"jurisdiction" text NOT NULL,
	"judge_name" text,
	"court_clerk" text,
	"filing_date" timestamp,
	"admission_date" timestamp,
	"service_date" timestamp,
	"first_hearing_date" timestamp,
	"next_hearing_date" timestamp,
	"proceeding_type" text NOT NULL,
	"current_stage" text NOT NULL,
	"parent_proceeding_id" uuid,
	"relationship_type" text,
	"claim_amount" numeric(15, 2),
	"court_fees" numeric(10, 2),
	"hearings_count" numeric DEFAULT '0',
	"motions_count" numeric DEFAULT '0',
	"submissions_count" numeric DEFAULT '0',
	"evidence_count" numeric DEFAULT '0',
	"has_injunction" boolean DEFAULT false,
	"is_appealable" boolean DEFAULT true,
	"is_under_appeal" boolean DEFAULT false,
	"next_deadline" timestamp,
	"response_deadline" timestamp,
	"appeal_deadline" timestamp,
	"special_instructions" text,
	"required_documents" text,
	"total_court_hours" numeric(10, 2) DEFAULT '0',
	"total_preparation_hours" numeric(10, 2) DEFAULT '0',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"updated_by" uuid NOT NULL,
	"version" numeric DEFAULT '1'
);
--> statement-breakpoint
CREATE TABLE "tenant"."profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"display_name" varchar(100) NOT NULL,
	"email" text NOT NULL,
	"phone_number" varchar(50) NOT NULL,
	"time_zone" varchar(50) DEFAULT 'UTC' NOT NULL,
	"language_preference" varchar(50) DEFAULT 'es' NOT NULL,
	"avatar_url" varchar(500),
	"legal_expertise" text,
	"role" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"deleted_at" timestamp with time zone,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid,
	CONSTRAINT "profiles_email_unique" UNIQUE("email"),
	CONSTRAINT "profiles_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "profiles_user_id_key" UNIQUE("user_id"),
	CONSTRAINT "email_check" CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$'),
	CONSTRAINT "phone_check" CHECK (phone_number ~* '^[0-9]{10}$')
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"team_id" uuid NOT NULL,
	"profile_id" uuid NOT NULL,
	"role" varchar(50) DEFAULT 'member' NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid,
	CONSTRAINT "team_members_team_id_profile_id_unique" UNIQUE("team_id","profile_id")
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone,
	"deleted_at" timestamp with time zone,
	"created_by" uuid,
	"updated_by" uuid,
	"deleted_by" uuid
);
--> statement-breakpoint
ALTER TABLE "tenant"."case_parties" ADD CONSTRAINT "case_parties_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "tenant"."cases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."case_parties" ADD CONSTRAINT "case_parties_client_id_clients_id_fk" FOREIGN KEY ("client_id") REFERENCES "tenant"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."case_parties" ADD CONSTRAINT "case_parties_corporation_id_corporations_id_fk" FOREIGN KEY ("corporation_id") REFERENCES "tenant"."corporations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."case_parties" ADD CONSTRAINT "case_parties_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."case_parties" ADD CONSTRAINT "case_parties_updated_by_profiles_id_fk" FOREIGN KEY ("updated_by") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."cases" ADD CONSTRAINT "cases_original_case_id_cases_id_fk" FOREIGN KEY ("original_case_id") REFERENCES "tenant"."cases"("id") ON DELETE set null ON UPDATE set null;--> statement-breakpoint
ALTER TABLE "tenant"."cases" ADD CONSTRAINT "cases_lead_attorney_id_profiles_id_fk" FOREIGN KEY ("lead_attorney_id") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."cases" ADD CONSTRAINT "cases_assigned_team_id_teams_id_fk" FOREIGN KEY ("assigned_team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."cases" ADD CONSTRAINT "cases_last_activity_by_id_profiles_id_fk" FOREIGN KEY ("last_activity_by_id") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."cases" ADD CONSTRAINT "cases_last_note_by_id_profiles_id_fk" FOREIGN KEY ("last_note_by_id") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."cases" ADD CONSTRAINT "cases_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."cases" ADD CONSTRAINT "cases_updated_by_profiles_id_fk" FOREIGN KEY ("updated_by") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."clients" ADD CONSTRAINT "clients_created_by_auth_users_id" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."clients" ADD CONSTRAINT "clients_updated_by_auth_users_id" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."clients" ADD CONSTRAINT "clients_primary_team_id_fkey" FOREIGN KEY ("primary_team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."corporations" ADD CONSTRAINT "corporations_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "tenant"."clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."corporations" ADD CONSTRAINT "corporations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."corporations" ADD CONSTRAINT "corporations_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "court_participations" ADD CONSTRAINT "court_participations_party_id_case_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "tenant"."case_parties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "court_participations" ADD CONSTRAINT "court_participations_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "court_participations" ADD CONSTRAINT "court_participations_updated_by_profiles_id_fk" FOREIGN KEY ("updated_by") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."events" ADD CONSTRAINT "fk_events_case" FOREIGN KEY ("case_id") REFERENCES "tenant"."cases"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."events" ADD CONSTRAINT "fk_events_created_by" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."events" ADD CONSTRAINT "fk_events_updated_by" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."litigation_details" ADD CONSTRAINT "litigation_details_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "tenant"."cases"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."litigation_details" ADD CONSTRAINT "litigation_details_parent_proceeding_id_litigation_details_id_fk" FOREIGN KEY ("parent_proceeding_id") REFERENCES "tenant"."litigation_details"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."litigation_details" ADD CONSTRAINT "litigation_details_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."litigation_details" ADD CONSTRAINT "litigation_details_updated_by_profiles_id_fk" FOREIGN KEY ("updated_by") REFERENCES "tenant"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."profiles" ADD CONSTRAINT "profiles_created_by_users_in_auth_id" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."profiles" ADD CONSTRAINT "profiles_updated_by_users_in_auth_id" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tenant"."profiles" ADD CONSTRAINT "profiles_user_id_users_in_auth_id" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "tenant"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_created_by_users_in_auth_id" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "team_members" ADD CONSTRAINT "team_members_updated_by_users_in_auth_id" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_created_by_users_in_auth_id" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_updated_by_users_in_auth_id" FOREIGN KEY ("updated_by") REFERENCES "auth"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_events_end_time" ON "tenant"."events" USING btree ("end_time");--> statement-breakpoint
CREATE INDEX "idx_events_organizer_id" ON "tenant"."events" USING btree ("organizer_id");--> statement-breakpoint
CREATE INDEX "idx_events_start_time" ON "tenant"."events" USING btree ("start_time");