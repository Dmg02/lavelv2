import { pgTable, uuid, text, timestamp, integer, boolean, jsonb, numeric } from "drizzle-orm/pg-core";

// ==========================================
// Core Document Management Tables
// ==========================================

// Main documents table - Central repository of all documents
export const documents = pgTable('documents', {
    id: uuid('id').defaultRandom().primaryKey(),
    caseId: uuid('case_id').notNull().references(() => cases.id),
    title: text('title').notNull(),
    description: text('description'),
    
    // Document type and metadata
    documentType: documentTypeEnum('document_type').notNull(),
    metadata: jsonb('metadata').notNull().default({}),
    tags: text('tags').array(),
    isPrivate: boolean('is_private').notNull().default(false),
    isPublic: boolean('is_public').notNull().default(false),
    isTemplate: boolean('is_template').notNull().default(false),
    
    // File information
    filePath: text('file_path').notNull(),
    fileSize: integer('file_size').notNull(),
    mimeType: text('mime_type').notNull(),
    
    // Version control
    versionNumber: integer('version_number').notNull().default(1),
    parentVersionId: uuid('parent_version_id').references(() => documents.id),
    isCurrentVersion: boolean('is_current_version').notNull().default(true),
    
    // Processing status
    processingStatus: processingStatusEnum('processing_status').notNull().default('pending'),
    lastProcessedAt: timestamp('last_processed_at'),
    
    // Stats and counters
    viewCount: integer('view_count').notNull().default(0),
    commentCount: integer('comment_count').notNull().default(0),
    chunkCount: integer('chunk_count').notNull().default(0),
    
    // Standard audit fields
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    createdBy: uuid('created_by').notNull(),
    updatedBy: uuid('updated_by').notNull()
});

// Document structure table - Maintains hierarchical document organization
export const documentStructure = pgTable('document_structure', {
    id: uuid('id').defaultRandom().primaryKey(),
    documentId: uuid('document_id')
        .notNull()
        .references(() => documents.id),
    
    // Structure representation
    structureTree: jsonb('structure_tree').notNull(),
    
    // Version tracking
    versionNumber: integer('version_number').notNull().default(1),
    
    // Change tracking
    chunkChangeCount: integer('chunk_change_count').notNull().default(0),
    totalChunks: integer('total_chunks').notNull(),
    changePercentage: numeric('change_percentage', { precision: 5, scale: 2 })
        .notNull()
        .default(0),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// ==========================================
// Document Content and Processing Tables
// ==========================================

// Document chunks table - Stores segmented document content
export const documentChunks = pgTable('document_chunks', {
    id: uuid('id').defaultRandom().primaryKey(),
    documentId: uuid('document_id')
        .notNull()
        .references(() => documents.id),
    
    // Content and positioning
    content: text('content').notNull(),
    chunkIndex: integer('chunk_index').notNull(),
    
    // Hierarchical structure
    sectionLevel: integer('section_level').notNull().default(0),
    sectionTitle: text('section_title'),
    parentSectionId: uuid('parent_section_id')
        .references(() => documentChunks.id),
    
    // Precise positioning
    startOffset: integer('start_offset').notNull(),
    endOffset: integer('end_offset').notNull(),
    
    // Version control
    versionNumber: integer('version_number').notNull().default(1),
    previousVersionId: uuid('previous_version_id')
        .references(() => documentChunks.id),
    isCurrentVersion: boolean('is_current_version').notNull().default(true),
    
    // Change tracking
    changeType: text('change_type'),
    changeReason: text('change_reason'),
    changedBy: uuid('changed_by'),
    
    // Context preservation
    contextBefore: text('context_before'),
    contextAfter: text('context_after'),
    
    // Search optimization
    searchVector: sql<any>`tsvector GENERATED ALWAYS AS (to_tsvector('english', content)) STORED`,
    
    // Processing status
    needsReembedding: boolean('needs_reembedding').notNull().default(false),
    lastEmbeddedAt: timestamp('last_embedded_at'),
    
    // Content hash for quick comparison
    contentHash: text('content_hash').notNull(),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// Document embeddings table - Stores vector representations
export const documentEmbeddings = pgTable('document_embeddings', {
    id: uuid('id').defaultRandom().primaryKey(),
    chunkId: uuid('chunk_id')
        .notNull()
        .references(() => documentChunks.id),
    
    // Embedding data
    embedding: text('embedding').notNull(),
    embeddingModel: text('embedding_model').notNull(),
    embeddingVersion: text('embedding_version').notNull(),
    
    // Context embeddings
    contextEmbedding: text('context_embedding'),
    
    // Processing metadata
    generationDuration: integer('generation_duration'),
    tokenCount: integer('token_count'),
    
    createdAt: timestamp('created_at').defaultNow().notNull()
});

// Chunk version history table - Tracks chunk changes
export const chunkVersionHistory = pgTable('chunk_version_history', {
    id: uuid('id').defaultRandom().primaryKey(),
    chunkId: uuid('chunk_id')
        .notNull()
        .references(() => documentChunks.id),
    
    // Version information
    versionNumber: integer('version_number').notNull(),
    content: text('content').notNull(),
    changeType: text('change_type').notNull(),
    
    // Change metadata
    changedBy: uuid('changed_by').notNull(),
    changeReason: text('change_reason'),
    metadata: jsonb('metadata').notNull().default({}),
    
    // Processing impact
    affectedChunks: uuid('affected_chunks').array(),
    reembeddingRequired: boolean('reembedding_required').notNull(),
    
    createdAt: timestamp('created_at').defaultNow().notNull()
});

// ==========================================
// Processing and Queue Management Tables
// ==========================================

// Processing queue table - Manages async tasks
export const processingQueue = pgTable('processing_queue', {
    id: uuid('id').defaultRandom().primaryKey(),
    documentId: uuid('document_id')
        .notNull()
        .references(() => documents.id),
    
    // Task information
    taskType: text('task_type').notNull(),
    status: processingStatusEnum('status').notNull().default('pending'),
    priority: integer('priority').notNull().default(0),
    attempts: integer('attempts').notNull().default(0),
    lastError: text('last_error'),
    
    // Timing
    scheduledFor: timestamp('scheduled_for').notNull(),
    startedAt: timestamp('started_at'),
    completedAt: timestamp('completed_at'),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull()
});

// ==========================================
// AI Interaction Tables
// ==========================================

// AI edits table - Tracks AI-assisted changes
export const documentAiEdits = pgTable('document_ai_edits', {
    id: uuid('id').defaultRandom().primaryKey(),
    documentId: uuid('document_id')
        .notNull()
        .references(() => documents.id),
    
    // Edit metadata
    userQuery: text('user_query').notNull(),
    aiResponse: text('ai_response').notNull(),
    status: aiEditStatusEnum('status').notNull().default('pending'),
    
    // Content tracking
    originalContent: text('original_content').notNull(),
    modifiedContent: text('modified_content').notNull(),
    affectedChunks: uuid('affected_chunks').array(),
    
    // User modification
    userModification: text('user_modification'),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    createdBy: uuid('created_by').notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    updatedBy: uuid('updated_by').notNull()
});

// ==========================================
// Social Features Tables
// ==========================================

// Comments table - Stores document comments
export const documentComments = pgTable('document_comments', {
    id: uuid('id').defaultRandom().primaryKey(),
    documentId: uuid('document_id')
        .notNull()
        .references(() => documents.id),
    
    // Comment content
    content: text('content').notNull(),
    chunkId: uuid('chunk_id')
        .references(() => documentChunks.id),
    
    // Threading
    parentCommentId: uuid('parent_comment_id')
        .references(() => documentComments.id),
    
    // Standard fields
    createdAt: timestamp('created_at').defaultNow().notNull(),
    createdBy: uuid('created_by').notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    updatedBy: uuid('updated_by').notNull()
});

// Mentions table - Tracks user mentions
export const documentMentions = pgTable('document_mentions', {
    id: uuid('id').defaultRandom().primaryKey(),
    documentId: uuid('document_id')
        .notNull()
        .references(() => documents.id),
    commentId: uuid('comment_id')
        .references(() => documentComments.id),
    
    // Mention details
    mentionedUserId: uuid('mentioned_user_id').notNull(),
    context: text('context'),
    isRead: boolean('is_read').notNull().default(false),
    
    createdAt: timestamp('created_at').defaultNow().notNull(),
    createdBy: uuid('created_by').notNull()
});

// Access history table - Tracks document access
export const documentAccessHistory = pgTable('document_access_history', {
    id: uuid('id').defaultRandom().primaryKey(),
    documentId: uuid('document_id')
        .notNull()
        .references(() => documents.id),
    
    // Access details
    accessType: text('access_type').notNull(),
    accessedBy: uuid('accessed_by').notNull(),
    accessedAt: timestamp('accessed_at').defaultNow().notNull(),
    
    // Additional context
    metadata: jsonb('metadata').notNull().default({})
});