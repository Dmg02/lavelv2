import { pgSchema } from "drizzle-orm/pg-core";


// Base tables (no foreign key dependencies)
export * from "./states-schema";
export * from "./cities-schema";
export * from "./law-branches-schema";
export * from "./jurisdictions-schema";

// First level dependencies
export * from "./courthouses-schema";
export * from "./trial-stages-schema";
export * from "./trial-types-schema";
export * from "./trials-roles-schema";

// Second level dependencies
export * from "./companies-schema";    
export * from "./individuals-schema";  
export * from "./unions-schema";       
export * from "./trials-entities-schema";

// Tables with multiple dependencies
export * from "./shared-trials-schema";
export * from "./publications-schema";

