import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum__fellowships_v_version_ministry_category" AS ENUM('kids', 'youth', 'college', 'adults', 'senior-adults', 'discipleship');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TABLE "_speakers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_photo_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_speakers_v_locales" (
  	"version_name" varchar NOT NULL,
  	"version_title" varchar,
  	"version_bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_leaders_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_photo_id" integer,
  	"version_email" varchar,
  	"version_order" numeric DEFAULT 99,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_leaders_v_locales" (
  	"version_name" varchar NOT NULL,
  	"version_title" varchar NOT NULL,
  	"version_bio" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sermon_series_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_cover_image_id" integer,
  	"version_start_date" timestamp(3) with time zone,
  	"version_is_active" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_sermon_series_v_locales" (
  	"version_name" varchar NOT NULL,
  	"version_description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_sermons_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_speaker_id" integer NOT NULL,
  	"version_scripture" varchar NOT NULL,
  	"version_date" timestamp(3) with time zone NOT NULL,
  	"version_series_id" integer,
  	"version_youtube_link" varchar,
  	"version_english_youtube_link" varchar,
  	"version_audio_link" varchar,
  	"version_thumbnail_id" integer,
  	"version_is_featured" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_sermons_v_locales" (
  	"version_title" varchar NOT NULL,
  	"version_notes" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_fellowships_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar NOT NULL,
  	"version_image_id" integer,
  	"version_is_featured" boolean DEFAULT false,
  	"version_order" numeric DEFAULT 99,
  	"version_is_active" boolean DEFAULT true,
  	"version_ministry_category" "enum__fellowships_v_version_ministry_category",
  	"version_instagram_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_fellowships_v_locales" (
  	"version_name" varchar NOT NULL,
  	"version_schedule" varchar NOT NULL,
  	"version_location" varchar NOT NULL,
  	"version_contact" varchar NOT NULL,
  	"version_description" jsonb NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_activities_v_version_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_activities_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_date" timestamp(3) with time zone NOT NULL,
  	"version_time" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_activities_v_locales" (
  	"version_title" varchar NOT NULL,
  	"version_fellowship" varchar NOT NULL,
  	"version_description" jsonb,
  	"version_location" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_sunday_service_schedule_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sunday_service_schedule_items_locales" (
  	"time" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_sunday_service" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_sunday_service_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"body" jsonb,
  	"watch_live_url" varchar,
  	"watch_live_label" varchar,
  	"find_us_label" varchar,
  	"address_line" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_prayer_feature" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_prayer_feature_locales" (
  	"eyebrow" varchar,
  	"heading" varchar NOT NULL,
  	"body" jsonb,
  	"cta_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_activities_items_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_activities_items_legacy_photo_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"path" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_activities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_activities_items_locales" (
  	"fellowship" varchar,
  	"title" varchar NOT NULL,
  	"date_label" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_activities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_activities_locales" (
  	"heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_church_history_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"legacy_pdf_path" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_church_history_documents_locales" (
  	"label" varchar NOT NULL,
  	"year" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_church_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"church_portrait_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_church_history_locales" (
  	"proclamation_of_faith" jsonb,
  	"history_heading" varchar,
  	"history_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_rich_text_locales" (
  	"heading" varchar,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_announcements_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_announcements_list_items_locales" (
  	"title" varchar NOT NULL,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_announcements_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_announcements_list_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter_issues" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"file_id" integer,
  	"legacy_pdf_path" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter_issues_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_newsletter_locales" (
  	"eyebrow" varchar,
  	"heading" varchar,
  	"subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_give_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_give_methods_locales" (
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_give" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_give_locales" (
  	"heading" varchar,
  	"subheading" varchar,
  	"tax_note" jsonb,
  	"scripture" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_visitor_faq_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_visitor_faq_faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_visitor_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_visitor_faq_locales" (
  	"modal_title" varchar NOT NULL,
  	"modal_subtitle" varchar,
  	"intro_text" jsonb,
  	"closing_note" varchar,
  	"close_button_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_footer_who_we_are_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"page" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_who_we_are_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_footer_get_connected_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"page" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_get_connected_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_footer" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_footer_locales" (
  	"worship_times_line" varchar,
  	"instagram_url" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_site_settings_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_phone" varchar,
  	"version_email" varchar,
  	"version_pastor_name" varchar,
  	"version_pastor_email" varchar,
  	"version_pastor_cell" varchar,
  	"version_youtube_live_url" varchar,
  	"version_google_calendar_id" varchar,
  	"version_google_maps_embed_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_site_settings_v_locales" (
  	"version_church_name" varchar NOT NULL,
  	"version_tagline" varchar,
  	"version_welcome_blurb_subject" varchar,
  	"version_welcome_blurb_text" jsonb,
  	"version_welcome_history_text" jsonb,
  	"version_address" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_home_v_version_sunday_service_schedule_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_home_v_version_sunday_service_schedule_items_locales" (
  	"time" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_home_v_version_activities_items_photos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_home_v_version_activities_items_legacy_photo_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"path" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_home_v_version_activities_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_home_v_version_activities_items_locales" (
  	"fellowship" varchar,
  	"title" varchar NOT NULL,
  	"date_label" varchar,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image_id" integer,
  	"version_sunday_service_image_id" integer,
  	"version_prayer_feature_image_id" integer,
  	"version_sermons_featured_sermon_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_page_home_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subheading" varchar,
  	"version_sunday_service_eyebrow" varchar,
  	"version_sunday_service_heading" varchar NOT NULL,
  	"version_sunday_service_body" jsonb,
  	"version_sunday_service_watch_live_url" varchar,
  	"version_sunday_service_watch_live_label" varchar,
  	"version_sunday_service_find_us_label" varchar,
  	"version_sunday_service_address_line" varchar,
  	"version_prayer_feature_eyebrow" varchar,
  	"version_prayer_feature_heading" varchar NOT NULL,
  	"version_prayer_feature_body" jsonb,
  	"version_prayer_feature_cta_label" varchar,
  	"version_sermons_heading" varchar NOT NULL,
  	"version_activities_heading" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_about_v_version_church_history_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"file_id" integer,
  	"legacy_pdf_path" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_about_v_version_church_history_documents_locales" (
  	"label" varchar NOT NULL,
  	"year" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image_id" integer,
  	"version_church_history_church_portrait_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_page_about_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_church_history_proclamation_of_faith" jsonb,
  	"version_church_history_history_heading" varchar,
  	"version_church_history_history_body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_announcements_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_announcements_v_version_items_locales" (
  	"title" varchar NOT NULL,
  	"body" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_announcements_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_page_announcements_v_locales" (
  	"version_heading" varchar,
  	"version_subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_give_v_version_methods" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_give_v_version_methods_locales" (
  	"icon" varchar,
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"detail" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_give_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_page_give_v_locales" (
  	"version_heading" varchar,
  	"version_subheading" varchar,
  	"version_tax_note" jsonb,
  	"version_scripture" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_gainesville_dew_v_version_issues" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"file_id" integer,
  	"legacy_pdf_path" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_page_gainesville_dew_v_version_issues_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_gainesville_dew_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_page_gainesville_dew_v_locales" (
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_subheading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_fellowships_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_page_fellowships_v_locales" (
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subtitle" varchar,
  	"version_hero_learn_more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_leadership_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_page_leadership_v_locales" (
  	"version_hero_eyebrow" varchar,
  	"version_hero_heading" varchar NOT NULL,
  	"version_intro_paragraph" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_page_contact_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_background_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_page_contact_v_locales" (
  	"version_hero_heading" varchar NOT NULL,
  	"version_hero_subheading" varchar,
  	"version_form_section_heading" varchar,
  	"version_form_submit_label" varchar,
  	"version_form_success_message" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_campus_focus_direction_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_campus_focus_direction_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_campus_focus" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_campus_focus_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_home_campus_focus_direction_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "page_home_campus_focus_direction_items_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_campus_focus_direction_items" CASCADE;
  DROP TABLE "pages_blocks_campus_focus_direction_items_locales" CASCADE;
  DROP TABLE "pages_blocks_campus_focus" CASCADE;
  DROP TABLE "pages_blocks_campus_focus_locales" CASCADE;
  DROP TABLE "page_home_campus_focus_direction_items" CASCADE;
  DROP TABLE "page_home_campus_focus_direction_items_locales" CASCADE;
  ALTER TABLE "media" ADD COLUMN "prefix" varchar DEFAULT 'media';
  ALTER TABLE "media" ADD COLUMN "folder_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_folders_id" integer;
  ALTER TABLE "page_home" ADD COLUMN "sermons_featured_sermon_id" integer;
  ALTER TABLE "page_home_locales" ADD COLUMN "sermons_heading" varchar NOT NULL;
  ALTER TABLE "_speakers_v" ADD CONSTRAINT "_speakers_v_parent_id_speakers_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."speakers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_speakers_v" ADD CONSTRAINT "_speakers_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_speakers_v_locales" ADD CONSTRAINT "_speakers_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_speakers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_leaders_v" ADD CONSTRAINT "_leaders_v_parent_id_leaders_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."leaders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_leaders_v" ADD CONSTRAINT "_leaders_v_version_photo_id_media_id_fk" FOREIGN KEY ("version_photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_leaders_v_locales" ADD CONSTRAINT "_leaders_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_leaders_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sermon_series_v" ADD CONSTRAINT "_sermon_series_v_parent_id_sermon_series_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sermon_series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sermon_series_v" ADD CONSTRAINT "_sermon_series_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sermon_series_v_locales" ADD CONSTRAINT "_sermon_series_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sermon_series_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sermons_v" ADD CONSTRAINT "_sermons_v_parent_id_sermons_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."sermons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sermons_v" ADD CONSTRAINT "_sermons_v_version_speaker_id_speakers_id_fk" FOREIGN KEY ("version_speaker_id") REFERENCES "public"."speakers"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sermons_v" ADD CONSTRAINT "_sermons_v_version_series_id_sermon_series_id_fk" FOREIGN KEY ("version_series_id") REFERENCES "public"."sermon_series"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sermons_v" ADD CONSTRAINT "_sermons_v_version_thumbnail_id_media_id_fk" FOREIGN KEY ("version_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_sermons_v_locales" ADD CONSTRAINT "_sermons_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sermons_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fellowships_v" ADD CONSTRAINT "_fellowships_v_parent_id_fellowships_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."fellowships"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_fellowships_v" ADD CONSTRAINT "_fellowships_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_fellowships_v_locales" ADD CONSTRAINT "_fellowships_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fellowships_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v_version_photos" ADD CONSTRAINT "_activities_v_version_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v_version_photos" ADD CONSTRAINT "_activities_v_version_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_activities_v" ADD CONSTRAINT "_activities_v_parent_id_activities_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."activities"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_activities_v_locales" ADD CONSTRAINT "_activities_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_activities_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sunday_service_schedule_items" ADD CONSTRAINT "_pages_v_blocks_sunday_service_schedule_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sunday_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sunday_service_schedule_items_locales" ADD CONSTRAINT "_pages_v_blocks_sunday_service_schedule_items_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sunday_service_schedule_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sunday_service" ADD CONSTRAINT "_pages_v_blocks_sunday_service_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sunday_service" ADD CONSTRAINT "_pages_v_blocks_sunday_service_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_sunday_service_locales" ADD CONSTRAINT "_pages_v_blocks_sunday_service_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_sunday_service"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prayer_feature" ADD CONSTRAINT "_pages_v_blocks_prayer_feature_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prayer_feature" ADD CONSTRAINT "_pages_v_blocks_prayer_feature_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_prayer_feature_locales" ADD CONSTRAINT "_pages_v_blocks_prayer_feature_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_prayer_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_activities_items_photos" ADD CONSTRAINT "_pages_v_blocks_activities_items_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_activities_items_photos" ADD CONSTRAINT "_pages_v_blocks_activities_items_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_activities_items_legacy_photo_paths" ADD CONSTRAINT "_pages_v_blocks_activities_items_legacy_photo_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_activities_items" ADD CONSTRAINT "_pages_v_blocks_activities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_activities_items_locales" ADD CONSTRAINT "_pages_v_blocks_activities_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_activities" ADD CONSTRAINT "_pages_v_blocks_activities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_activities_locales" ADD CONSTRAINT "_pages_v_blocks_activities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_activities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_church_history_documents" ADD CONSTRAINT "_pages_v_blocks_church_history_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_church_history_documents" ADD CONSTRAINT "_pages_v_blocks_church_history_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_church_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_church_history_documents_locales" ADD CONSTRAINT "_pages_v_blocks_church_history_documents_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_church_history_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_church_history" ADD CONSTRAINT "_pages_v_blocks_church_history_church_portrait_id_media_id_fk" FOREIGN KEY ("church_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_church_history" ADD CONSTRAINT "_pages_v_blocks_church_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_church_history_locales" ADD CONSTRAINT "_pages_v_blocks_church_history_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_church_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text" ADD CONSTRAINT "_pages_v_blocks_rich_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" ADD CONSTRAINT "_pages_v_blocks_rich_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_rich_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_announcements_list_items" ADD CONSTRAINT "_pages_v_blocks_announcements_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_announcements_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_announcements_list_items_locales" ADD CONSTRAINT "_pages_v_blocks_announcements_list_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_announcements_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_announcements_list" ADD CONSTRAINT "_pages_v_blocks_announcements_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_announcements_list_locales" ADD CONSTRAINT "_pages_v_blocks_announcements_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_announcements_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_issues" ADD CONSTRAINT "_pages_v_blocks_newsletter_issues_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_issues" ADD CONSTRAINT "_pages_v_blocks_newsletter_issues_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_issues_locales" ADD CONSTRAINT "_pages_v_blocks_newsletter_issues_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_newsletter_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter" ADD CONSTRAINT "_pages_v_blocks_newsletter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_newsletter_locales" ADD CONSTRAINT "_pages_v_blocks_newsletter_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_newsletter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_give_methods" ADD CONSTRAINT "_pages_v_blocks_give_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_give"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_give_methods_locales" ADD CONSTRAINT "_pages_v_blocks_give_methods_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_give_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_give" ADD CONSTRAINT "_pages_v_blocks_give_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_give_locales" ADD CONSTRAINT "_pages_v_blocks_give_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_give"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visitor_faq_faqs" ADD CONSTRAINT "_pages_v_blocks_visitor_faq_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_visitor_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visitor_faq_faqs_locales" ADD CONSTRAINT "_pages_v_blocks_visitor_faq_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_visitor_faq_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visitor_faq" ADD CONSTRAINT "_pages_v_blocks_visitor_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_visitor_faq_locales" ADD CONSTRAINT "_pages_v_blocks_visitor_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_visitor_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_who_we_are_links" ADD CONSTRAINT "_pages_v_blocks_footer_who_we_are_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_who_we_are_links_locales" ADD CONSTRAINT "_pages_v_blocks_footer_who_we_are_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_who_we_are_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_get_connected_links" ADD CONSTRAINT "_pages_v_blocks_footer_get_connected_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_get_connected_links_locales" ADD CONSTRAINT "_pages_v_blocks_footer_get_connected_links_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer_get_connected_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer" ADD CONSTRAINT "_pages_v_blocks_footer_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_footer_locales" ADD CONSTRAINT "_pages_v_blocks_footer_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_parent_id_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_settings_v_locales" ADD CONSTRAINT "_site_settings_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_settings_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_home_v_version_sunday_service_schedule_items" ADD CONSTRAINT "_page_home_v_version_sunday_service_schedule_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_home_v_version_sunday_service_schedule_items_locales" ADD CONSTRAINT "_page_home_v_version_sunday_service_schedule_items_locale_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_home_v_version_sunday_service_schedule_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_home_v_version_activities_items_photos" ADD CONSTRAINT "_page_home_v_version_activities_items_photos_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_home_v_version_activities_items_photos" ADD CONSTRAINT "_page_home_v_version_activities_items_photos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_home_v_version_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_home_v_version_activities_items_legacy_photo_paths" ADD CONSTRAINT "_page_home_v_version_activities_items_legacy_photo_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_home_v_version_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_home_v_version_activities_items" ADD CONSTRAINT "_page_home_v_version_activities_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_home_v_version_activities_items_locales" ADD CONSTRAINT "_page_home_v_version_activities_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_home_v_version_activities_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_home_v" ADD CONSTRAINT "_page_home_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_home_v" ADD CONSTRAINT "_page_home_v_version_sunday_service_image_id_media_id_fk" FOREIGN KEY ("version_sunday_service_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_home_v" ADD CONSTRAINT "_page_home_v_version_prayer_feature_image_id_media_id_fk" FOREIGN KEY ("version_prayer_feature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_home_v" ADD CONSTRAINT "_page_home_v_version_sermons_featured_sermon_id_sermons_id_fk" FOREIGN KEY ("version_sermons_featured_sermon_id") REFERENCES "public"."sermons"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_home_v_locales" ADD CONSTRAINT "_page_home_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_about_v_version_church_history_documents" ADD CONSTRAINT "_page_about_v_version_church_history_documents_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_about_v_version_church_history_documents" ADD CONSTRAINT "_page_about_v_version_church_history_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_about_v_version_church_history_documents_locales" ADD CONSTRAINT "_page_about_v_version_church_history_documents_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_about_v_version_church_history_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_about_v" ADD CONSTRAINT "_page_about_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_about_v" ADD CONSTRAINT "_page_about_v_version_church_history_church_portrait_id_media_id_fk" FOREIGN KEY ("version_church_history_church_portrait_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_about_v_locales" ADD CONSTRAINT "_page_about_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_announcements_v_version_items" ADD CONSTRAINT "_page_announcements_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_announcements_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_announcements_v_version_items_locales" ADD CONSTRAINT "_page_announcements_v_version_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_announcements_v_version_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_announcements_v_locales" ADD CONSTRAINT "_page_announcements_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_announcements_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_give_v_version_methods" ADD CONSTRAINT "_page_give_v_version_methods_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_give_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_give_v_version_methods_locales" ADD CONSTRAINT "_page_give_v_version_methods_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_give_v_version_methods"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_give_v_locales" ADD CONSTRAINT "_page_give_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_give_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_gainesville_dew_v_version_issues" ADD CONSTRAINT "_page_gainesville_dew_v_version_issues_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_gainesville_dew_v_version_issues" ADD CONSTRAINT "_page_gainesville_dew_v_version_issues_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_gainesville_dew_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_gainesville_dew_v_version_issues_locales" ADD CONSTRAINT "_page_gainesville_dew_v_version_issues_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_gainesville_dew_v_version_issues"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_gainesville_dew_v_locales" ADD CONSTRAINT "_page_gainesville_dew_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_gainesville_dew_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_fellowships_v" ADD CONSTRAINT "_page_fellowships_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_fellowships_v_locales" ADD CONSTRAINT "_page_fellowships_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_fellowships_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_leadership_v" ADD CONSTRAINT "_page_leadership_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_leadership_v_locales" ADD CONSTRAINT "_page_leadership_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_leadership_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_page_contact_v" ADD CONSTRAINT "_page_contact_v_version_hero_background_image_id_media_id_fk" FOREIGN KEY ("version_hero_background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_page_contact_v_locales" ADD CONSTRAINT "_page_contact_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_page_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_speakers_v_parent_idx" ON "_speakers_v" USING btree ("parent_id");
  CREATE INDEX "_speakers_v_version_version_photo_idx" ON "_speakers_v" USING btree ("version_photo_id");
  CREATE INDEX "_speakers_v_version_version_updated_at_idx" ON "_speakers_v" USING btree ("version_updated_at");
  CREATE INDEX "_speakers_v_version_version_created_at_idx" ON "_speakers_v" USING btree ("version_created_at");
  CREATE INDEX "_speakers_v_created_at_idx" ON "_speakers_v" USING btree ("created_at");
  CREATE INDEX "_speakers_v_updated_at_idx" ON "_speakers_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_speakers_v_locales_locale_parent_id_unique" ON "_speakers_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_leaders_v_parent_idx" ON "_leaders_v" USING btree ("parent_id");
  CREATE INDEX "_leaders_v_version_version_photo_idx" ON "_leaders_v" USING btree ("version_photo_id");
  CREATE INDEX "_leaders_v_version_version_updated_at_idx" ON "_leaders_v" USING btree ("version_updated_at");
  CREATE INDEX "_leaders_v_version_version_created_at_idx" ON "_leaders_v" USING btree ("version_created_at");
  CREATE INDEX "_leaders_v_created_at_idx" ON "_leaders_v" USING btree ("created_at");
  CREATE INDEX "_leaders_v_updated_at_idx" ON "_leaders_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_leaders_v_locales_locale_parent_id_unique" ON "_leaders_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sermon_series_v_parent_idx" ON "_sermon_series_v" USING btree ("parent_id");
  CREATE INDEX "_sermon_series_v_version_version_cover_image_idx" ON "_sermon_series_v" USING btree ("version_cover_image_id");
  CREATE INDEX "_sermon_series_v_version_version_updated_at_idx" ON "_sermon_series_v" USING btree ("version_updated_at");
  CREATE INDEX "_sermon_series_v_version_version_created_at_idx" ON "_sermon_series_v" USING btree ("version_created_at");
  CREATE INDEX "_sermon_series_v_created_at_idx" ON "_sermon_series_v" USING btree ("created_at");
  CREATE INDEX "_sermon_series_v_updated_at_idx" ON "_sermon_series_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_sermon_series_v_locales_locale_parent_id_unique" ON "_sermon_series_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_sermons_v_parent_idx" ON "_sermons_v" USING btree ("parent_id");
  CREATE INDEX "_sermons_v_version_version_speaker_idx" ON "_sermons_v" USING btree ("version_speaker_id");
  CREATE INDEX "_sermons_v_version_version_series_idx" ON "_sermons_v" USING btree ("version_series_id");
  CREATE INDEX "_sermons_v_version_version_thumbnail_idx" ON "_sermons_v" USING btree ("version_thumbnail_id");
  CREATE INDEX "_sermons_v_version_version_updated_at_idx" ON "_sermons_v" USING btree ("version_updated_at");
  CREATE INDEX "_sermons_v_version_version_created_at_idx" ON "_sermons_v" USING btree ("version_created_at");
  CREATE INDEX "_sermons_v_created_at_idx" ON "_sermons_v" USING btree ("created_at");
  CREATE INDEX "_sermons_v_updated_at_idx" ON "_sermons_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_sermons_v_locales_locale_parent_id_unique" ON "_sermons_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_fellowships_v_parent_idx" ON "_fellowships_v" USING btree ("parent_id");
  CREATE INDEX "_fellowships_v_version_version_slug_idx" ON "_fellowships_v" USING btree ("version_slug");
  CREATE INDEX "_fellowships_v_version_version_image_idx" ON "_fellowships_v" USING btree ("version_image_id");
  CREATE INDEX "_fellowships_v_version_version_updated_at_idx" ON "_fellowships_v" USING btree ("version_updated_at");
  CREATE INDEX "_fellowships_v_version_version_created_at_idx" ON "_fellowships_v" USING btree ("version_created_at");
  CREATE INDEX "_fellowships_v_created_at_idx" ON "_fellowships_v" USING btree ("created_at");
  CREATE INDEX "_fellowships_v_updated_at_idx" ON "_fellowships_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_fellowships_v_locales_locale_parent_id_unique" ON "_fellowships_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_activities_v_version_photos_order_idx" ON "_activities_v_version_photos" USING btree ("_order");
  CREATE INDEX "_activities_v_version_photos_parent_id_idx" ON "_activities_v_version_photos" USING btree ("_parent_id");
  CREATE INDEX "_activities_v_version_photos_photo_idx" ON "_activities_v_version_photos" USING btree ("photo_id");
  CREATE INDEX "_activities_v_parent_idx" ON "_activities_v" USING btree ("parent_id");
  CREATE INDEX "_activities_v_version_version_updated_at_idx" ON "_activities_v" USING btree ("version_updated_at");
  CREATE INDEX "_activities_v_version_version_created_at_idx" ON "_activities_v" USING btree ("version_created_at");
  CREATE INDEX "_activities_v_created_at_idx" ON "_activities_v" USING btree ("created_at");
  CREATE INDEX "_activities_v_updated_at_idx" ON "_activities_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_activities_v_locales_locale_parent_id_unique" ON "_activities_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_order_idx" ON "_pages_v_blocks_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_parent_id_idx" ON "_pages_v_blocks_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_path_idx" ON "_pages_v_blocks_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_hero_background_image_idx" ON "_pages_v_blocks_hero" USING btree ("background_image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_sunday_service_schedule_items_order_idx" ON "_pages_v_blocks_sunday_service_schedule_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sunday_service_schedule_items_parent_id_idx" ON "_pages_v_blocks_sunday_service_schedule_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_sunday_service_schedule_items_locales_locale" ON "_pages_v_blocks_sunday_service_schedule_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_sunday_service_order_idx" ON "_pages_v_blocks_sunday_service" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_sunday_service_parent_id_idx" ON "_pages_v_blocks_sunday_service" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_sunday_service_path_idx" ON "_pages_v_blocks_sunday_service" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_sunday_service_image_idx" ON "_pages_v_blocks_sunday_service" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_sunday_service_locales_locale_parent_id_uniq" ON "_pages_v_blocks_sunday_service_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_prayer_feature_order_idx" ON "_pages_v_blocks_prayer_feature" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_prayer_feature_parent_id_idx" ON "_pages_v_blocks_prayer_feature" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_prayer_feature_path_idx" ON "_pages_v_blocks_prayer_feature" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_prayer_feature_image_idx" ON "_pages_v_blocks_prayer_feature" USING btree ("image_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_prayer_feature_locales_locale_parent_id_uniq" ON "_pages_v_blocks_prayer_feature_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_activities_items_photos_order_idx" ON "_pages_v_blocks_activities_items_photos" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_activities_items_photos_parent_id_idx" ON "_pages_v_blocks_activities_items_photos" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_activities_items_photos_photo_idx" ON "_pages_v_blocks_activities_items_photos" USING btree ("photo_id");
  CREATE INDEX "_pages_v_blocks_activities_items_legacy_photo_paths_order_idx" ON "_pages_v_blocks_activities_items_legacy_photo_paths" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_activities_items_legacy_photo_paths_parent_id_idx" ON "_pages_v_blocks_activities_items_legacy_photo_paths" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_activities_items_order_idx" ON "_pages_v_blocks_activities_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_activities_items_parent_id_idx" ON "_pages_v_blocks_activities_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_activities_items_locales_locale_parent_id_un" ON "_pages_v_blocks_activities_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_activities_order_idx" ON "_pages_v_blocks_activities" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_activities_parent_id_idx" ON "_pages_v_blocks_activities" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_activities_path_idx" ON "_pages_v_blocks_activities" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_activities_locales_locale_parent_id_unique" ON "_pages_v_blocks_activities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_church_history_documents_order_idx" ON "_pages_v_blocks_church_history_documents" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_church_history_documents_parent_id_idx" ON "_pages_v_blocks_church_history_documents" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_church_history_documents_file_idx" ON "_pages_v_blocks_church_history_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_church_history_documents_locales_locale_pare" ON "_pages_v_blocks_church_history_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_church_history_order_idx" ON "_pages_v_blocks_church_history" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_church_history_parent_id_idx" ON "_pages_v_blocks_church_history" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_church_history_path_idx" ON "_pages_v_blocks_church_history" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_church_history_church_portrait_idx" ON "_pages_v_blocks_church_history" USING btree ("church_portrait_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_church_history_locales_locale_parent_id_uniq" ON "_pages_v_blocks_church_history_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_order_idx" ON "_pages_v_blocks_rich_text" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_rich_text_parent_id_idx" ON "_pages_v_blocks_rich_text" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_rich_text_path_idx" ON "_pages_v_blocks_rich_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_rich_text_locales_locale_parent_id_unique" ON "_pages_v_blocks_rich_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_announcements_list_items_order_idx" ON "_pages_v_blocks_announcements_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_announcements_list_items_parent_id_idx" ON "_pages_v_blocks_announcements_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_announcements_list_items_locales_locale_pare" ON "_pages_v_blocks_announcements_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_announcements_list_order_idx" ON "_pages_v_blocks_announcements_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_announcements_list_parent_id_idx" ON "_pages_v_blocks_announcements_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_announcements_list_path_idx" ON "_pages_v_blocks_announcements_list" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_announcements_list_locales_locale_parent_id_" ON "_pages_v_blocks_announcements_list_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_issues_order_idx" ON "_pages_v_blocks_newsletter_issues" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_issues_parent_id_idx" ON "_pages_v_blocks_newsletter_issues" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_issues_file_idx" ON "_pages_v_blocks_newsletter_issues" USING btree ("file_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_newsletter_issues_locales_locale_parent_id_u" ON "_pages_v_blocks_newsletter_issues_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_order_idx" ON "_pages_v_blocks_newsletter" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_newsletter_parent_id_idx" ON "_pages_v_blocks_newsletter" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_newsletter_path_idx" ON "_pages_v_blocks_newsletter" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_newsletter_locales_locale_parent_id_unique" ON "_pages_v_blocks_newsletter_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_give_methods_order_idx" ON "_pages_v_blocks_give_methods" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_give_methods_parent_id_idx" ON "_pages_v_blocks_give_methods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_give_methods_locales_locale_parent_id_unique" ON "_pages_v_blocks_give_methods_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_give_order_idx" ON "_pages_v_blocks_give" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_give_parent_id_idx" ON "_pages_v_blocks_give" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_give_path_idx" ON "_pages_v_blocks_give" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_give_locales_locale_parent_id_unique" ON "_pages_v_blocks_give_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_visitor_faq_faqs_order_idx" ON "_pages_v_blocks_visitor_faq_faqs" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_visitor_faq_faqs_parent_id_idx" ON "_pages_v_blocks_visitor_faq_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_visitor_faq_faqs_locales_locale_parent_id_un" ON "_pages_v_blocks_visitor_faq_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_visitor_faq_order_idx" ON "_pages_v_blocks_visitor_faq" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_visitor_faq_parent_id_idx" ON "_pages_v_blocks_visitor_faq" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_visitor_faq_path_idx" ON "_pages_v_blocks_visitor_faq" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_visitor_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_visitor_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_who_we_are_links_order_idx" ON "_pages_v_blocks_footer_who_we_are_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_who_we_are_links_parent_id_idx" ON "_pages_v_blocks_footer_who_we_are_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_footer_who_we_are_links_locales_locale_paren" ON "_pages_v_blocks_footer_who_we_are_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_get_connected_links_order_idx" ON "_pages_v_blocks_footer_get_connected_links" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_get_connected_links_parent_id_idx" ON "_pages_v_blocks_footer_get_connected_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_footer_get_connected_links_locales_locale_pa" ON "_pages_v_blocks_footer_get_connected_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_order_idx" ON "_pages_v_blocks_footer" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_footer_parent_id_idx" ON "_pages_v_blocks_footer" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_footer_path_idx" ON "_pages_v_blocks_footer" USING btree ("_path");
  CREATE UNIQUE INDEX "_pages_v_blocks_footer_locales_locale_parent_id_unique" ON "_pages_v_blocks_footer_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_parent_idx" ON "_pages_v" USING btree ("parent_id");
  CREATE INDEX "_pages_v_version_version_slug_idx" ON "_pages_v" USING btree ("version_slug");
  CREATE INDEX "_pages_v_version_version_updated_at_idx" ON "_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_pages_v_version_version_created_at_idx" ON "_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_pages_v_created_at_idx" ON "_pages_v" USING btree ("created_at");
  CREATE INDEX "_pages_v_updated_at_idx" ON "_pages_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_created_at_idx" ON "_site_settings_v" USING btree ("created_at");
  CREATE INDEX "_site_settings_v_updated_at_idx" ON "_site_settings_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_site_settings_v_locales_locale_parent_id_unique" ON "_site_settings_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_home_v_version_sunday_service_schedule_items_order_idx" ON "_page_home_v_version_sunday_service_schedule_items" USING btree ("_order");
  CREATE INDEX "_page_home_v_version_sunday_service_schedule_items_parent_id_idx" ON "_page_home_v_version_sunday_service_schedule_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_page_home_v_version_sunday_service_schedule_items_locales_l" ON "_page_home_v_version_sunday_service_schedule_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_home_v_version_activities_items_photos_order_idx" ON "_page_home_v_version_activities_items_photos" USING btree ("_order");
  CREATE INDEX "_page_home_v_version_activities_items_photos_parent_id_idx" ON "_page_home_v_version_activities_items_photos" USING btree ("_parent_id");
  CREATE INDEX "_page_home_v_version_activities_items_photos_photo_idx" ON "_page_home_v_version_activities_items_photos" USING btree ("photo_id");
  CREATE INDEX "_page_home_v_version_activities_items_legacy_photo_paths_order_idx" ON "_page_home_v_version_activities_items_legacy_photo_paths" USING btree ("_order");
  CREATE INDEX "_page_home_v_version_activities_items_legacy_photo_paths_parent_id_idx" ON "_page_home_v_version_activities_items_legacy_photo_paths" USING btree ("_parent_id");
  CREATE INDEX "_page_home_v_version_activities_items_order_idx" ON "_page_home_v_version_activities_items" USING btree ("_order");
  CREATE INDEX "_page_home_v_version_activities_items_parent_id_idx" ON "_page_home_v_version_activities_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_page_home_v_version_activities_items_locales_locale_parent_" ON "_page_home_v_version_activities_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_home_v_version_hero_version_hero_background_image_idx" ON "_page_home_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_page_home_v_version_sunday_service_version_sunday_servi_idx" ON "_page_home_v" USING btree ("version_sunday_service_image_id");
  CREATE INDEX "_page_home_v_version_prayer_feature_version_prayer_featu_idx" ON "_page_home_v" USING btree ("version_prayer_feature_image_id");
  CREATE INDEX "_page_home_v_version_sermons_version_sermons_featured_se_idx" ON "_page_home_v" USING btree ("version_sermons_featured_sermon_id");
  CREATE INDEX "_page_home_v_created_at_idx" ON "_page_home_v" USING btree ("created_at");
  CREATE INDEX "_page_home_v_updated_at_idx" ON "_page_home_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_page_home_v_locales_locale_parent_id_unique" ON "_page_home_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_about_v_version_church_history_documents_order_idx" ON "_page_about_v_version_church_history_documents" USING btree ("_order");
  CREATE INDEX "_page_about_v_version_church_history_documents_parent_id_idx" ON "_page_about_v_version_church_history_documents" USING btree ("_parent_id");
  CREATE INDEX "_page_about_v_version_church_history_documents_file_idx" ON "_page_about_v_version_church_history_documents" USING btree ("file_id");
  CREATE UNIQUE INDEX "_page_about_v_version_church_history_documents_locales_local" ON "_page_about_v_version_church_history_documents_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_about_v_version_hero_version_hero_background_image_idx" ON "_page_about_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_page_about_v_version_church_history_version_church_hist_idx" ON "_page_about_v" USING btree ("version_church_history_church_portrait_id");
  CREATE INDEX "_page_about_v_created_at_idx" ON "_page_about_v" USING btree ("created_at");
  CREATE INDEX "_page_about_v_updated_at_idx" ON "_page_about_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_page_about_v_locales_locale_parent_id_unique" ON "_page_about_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_announcements_v_version_items_order_idx" ON "_page_announcements_v_version_items" USING btree ("_order");
  CREATE INDEX "_page_announcements_v_version_items_parent_id_idx" ON "_page_announcements_v_version_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_page_announcements_v_version_items_locales_locale_parent_id" ON "_page_announcements_v_version_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_announcements_v_created_at_idx" ON "_page_announcements_v" USING btree ("created_at");
  CREATE INDEX "_page_announcements_v_updated_at_idx" ON "_page_announcements_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_page_announcements_v_locales_locale_parent_id_unique" ON "_page_announcements_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_give_v_version_methods_order_idx" ON "_page_give_v_version_methods" USING btree ("_order");
  CREATE INDEX "_page_give_v_version_methods_parent_id_idx" ON "_page_give_v_version_methods" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_page_give_v_version_methods_locales_locale_parent_id_unique" ON "_page_give_v_version_methods_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_give_v_created_at_idx" ON "_page_give_v" USING btree ("created_at");
  CREATE INDEX "_page_give_v_updated_at_idx" ON "_page_give_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_page_give_v_locales_locale_parent_id_unique" ON "_page_give_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_gainesville_dew_v_version_issues_order_idx" ON "_page_gainesville_dew_v_version_issues" USING btree ("_order");
  CREATE INDEX "_page_gainesville_dew_v_version_issues_parent_id_idx" ON "_page_gainesville_dew_v_version_issues" USING btree ("_parent_id");
  CREATE INDEX "_page_gainesville_dew_v_version_issues_file_idx" ON "_page_gainesville_dew_v_version_issues" USING btree ("file_id");
  CREATE UNIQUE INDEX "_page_gainesville_dew_v_version_issues_locales_locale_parent" ON "_page_gainesville_dew_v_version_issues_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_gainesville_dew_v_created_at_idx" ON "_page_gainesville_dew_v" USING btree ("created_at");
  CREATE INDEX "_page_gainesville_dew_v_updated_at_idx" ON "_page_gainesville_dew_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_page_gainesville_dew_v_locales_locale_parent_id_unique" ON "_page_gainesville_dew_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_fellowships_v_version_hero_version_hero_background_idx" ON "_page_fellowships_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_page_fellowships_v_created_at_idx" ON "_page_fellowships_v" USING btree ("created_at");
  CREATE INDEX "_page_fellowships_v_updated_at_idx" ON "_page_fellowships_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_page_fellowships_v_locales_locale_parent_id_unique" ON "_page_fellowships_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_leadership_v_version_hero_version_hero_background__idx" ON "_page_leadership_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_page_leadership_v_created_at_idx" ON "_page_leadership_v" USING btree ("created_at");
  CREATE INDEX "_page_leadership_v_updated_at_idx" ON "_page_leadership_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_page_leadership_v_locales_locale_parent_id_unique" ON "_page_leadership_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_page_contact_v_version_hero_version_hero_background_ima_idx" ON "_page_contact_v" USING btree ("version_hero_background_image_id");
  CREATE INDEX "_page_contact_v_created_at_idx" ON "_page_contact_v" USING btree ("created_at");
  CREATE INDEX "_page_contact_v_updated_at_idx" ON "_page_contact_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_page_contact_v_locales_locale_parent_id_unique" ON "_page_contact_v_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home" ADD CONSTRAINT "page_home_sermons_featured_sermon_id_sermons_id_fk" FOREIGN KEY ("sermons_featured_sermon_id") REFERENCES "public"."sermons"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "page_home_sermons_sermons_featured_sermon_idx" ON "page_home" USING btree ("sermons_featured_sermon_id");
  ALTER TABLE "page_home_locales" DROP COLUMN "campus_focus_section_title";
  ALTER TABLE "page_home_locales" DROP COLUMN "campus_focus_section_desc";
  ALTER TABLE "page_home_locales" DROP COLUMN "campus_focus_directions_title";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_campus_focus_direction_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pages_blocks_campus_focus_direction_items_locales" (
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_campus_focus" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_campus_focus_locales" (
  	"section_title" varchar NOT NULL,
  	"section_desc" varchar,
  	"directions_title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "page_home_campus_focus_direction_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "page_home_campus_focus_direction_items_locales" (
  	"icon" varchar,
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  ALTER TABLE "_speakers_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_speakers_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_leaders_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_leaders_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sermon_series_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sermon_series_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sermons_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sermons_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fellowships_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fellowships_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_activities_v_version_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_activities_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_activities_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_sunday_service_schedule_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_sunday_service_schedule_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_sunday_service" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_sunday_service_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_prayer_feature" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_prayer_feature_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_activities_items_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_activities_items_legacy_photo_paths" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_activities_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_activities_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_activities" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_activities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_church_history_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_church_history_documents_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_church_history" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_church_history_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_rich_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_announcements_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_announcements_list_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_announcements_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_announcements_list_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_newsletter_issues" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_newsletter_issues_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_newsletter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_newsletter_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_give_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_give_methods_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_give" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_give_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_visitor_faq_faqs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_visitor_faq_faqs_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_visitor_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_visitor_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_footer_who_we_are_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_footer_who_we_are_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_footer_get_connected_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_footer_get_connected_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_footer" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_footer_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders_folder_type" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_site_settings_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_home_v_version_sunday_service_schedule_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_home_v_version_sunday_service_schedule_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_home_v_version_activities_items_photos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_home_v_version_activities_items_legacy_photo_paths" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_home_v_version_activities_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_home_v_version_activities_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_home_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_home_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_about_v_version_church_history_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_about_v_version_church_history_documents_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_about_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_about_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_announcements_v_version_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_announcements_v_version_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_announcements_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_announcements_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_give_v_version_methods" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_give_v_version_methods_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_give_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_give_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_gainesville_dew_v_version_issues" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_gainesville_dew_v_version_issues_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_gainesville_dew_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_gainesville_dew_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_fellowships_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_fellowships_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_leadership_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_leadership_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_contact_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_page_contact_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_speakers_v" CASCADE;
  DROP TABLE "_speakers_v_locales" CASCADE;
  DROP TABLE "_leaders_v" CASCADE;
  DROP TABLE "_leaders_v_locales" CASCADE;
  DROP TABLE "_sermon_series_v" CASCADE;
  DROP TABLE "_sermon_series_v_locales" CASCADE;
  DROP TABLE "_sermons_v" CASCADE;
  DROP TABLE "_sermons_v_locales" CASCADE;
  DROP TABLE "_fellowships_v" CASCADE;
  DROP TABLE "_fellowships_v_locales" CASCADE;
  DROP TABLE "_activities_v_version_photos" CASCADE;
  DROP TABLE "_activities_v" CASCADE;
  DROP TABLE "_activities_v_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_sunday_service_schedule_items" CASCADE;
  DROP TABLE "_pages_v_blocks_sunday_service_schedule_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_sunday_service" CASCADE;
  DROP TABLE "_pages_v_blocks_sunday_service_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_prayer_feature" CASCADE;
  DROP TABLE "_pages_v_blocks_prayer_feature_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_activities_items_photos" CASCADE;
  DROP TABLE "_pages_v_blocks_activities_items_legacy_photo_paths" CASCADE;
  DROP TABLE "_pages_v_blocks_activities_items" CASCADE;
  DROP TABLE "_pages_v_blocks_activities_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_activities" CASCADE;
  DROP TABLE "_pages_v_blocks_activities_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_church_history_documents" CASCADE;
  DROP TABLE "_pages_v_blocks_church_history_documents_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_church_history" CASCADE;
  DROP TABLE "_pages_v_blocks_church_history_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text" CASCADE;
  DROP TABLE "_pages_v_blocks_rich_text_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_announcements_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_announcements_list_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_announcements_list" CASCADE;
  DROP TABLE "_pages_v_blocks_announcements_list_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter_issues" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter_issues_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter" CASCADE;
  DROP TABLE "_pages_v_blocks_newsletter_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_give_methods" CASCADE;
  DROP TABLE "_pages_v_blocks_give_methods_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_give" CASCADE;
  DROP TABLE "_pages_v_blocks_give_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_visitor_faq_faqs" CASCADE;
  DROP TABLE "_pages_v_blocks_visitor_faq_faqs_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_visitor_faq" CASCADE;
  DROP TABLE "_pages_v_blocks_visitor_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_who_we_are_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_who_we_are_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_get_connected_links" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_get_connected_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_footer" CASCADE;
  DROP TABLE "_pages_v_blocks_footer_locales" CASCADE;
  DROP TABLE "_pages_v" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "_site_settings_v" CASCADE;
  DROP TABLE "_site_settings_v_locales" CASCADE;
  DROP TABLE "_page_home_v_version_sunday_service_schedule_items" CASCADE;
  DROP TABLE "_page_home_v_version_sunday_service_schedule_items_locales" CASCADE;
  DROP TABLE "_page_home_v_version_activities_items_photos" CASCADE;
  DROP TABLE "_page_home_v_version_activities_items_legacy_photo_paths" CASCADE;
  DROP TABLE "_page_home_v_version_activities_items" CASCADE;
  DROP TABLE "_page_home_v_version_activities_items_locales" CASCADE;
  DROP TABLE "_page_home_v" CASCADE;
  DROP TABLE "_page_home_v_locales" CASCADE;
  DROP TABLE "_page_about_v_version_church_history_documents" CASCADE;
  DROP TABLE "_page_about_v_version_church_history_documents_locales" CASCADE;
  DROP TABLE "_page_about_v" CASCADE;
  DROP TABLE "_page_about_v_locales" CASCADE;
  DROP TABLE "_page_announcements_v_version_items" CASCADE;
  DROP TABLE "_page_announcements_v_version_items_locales" CASCADE;
  DROP TABLE "_page_announcements_v" CASCADE;
  DROP TABLE "_page_announcements_v_locales" CASCADE;
  DROP TABLE "_page_give_v_version_methods" CASCADE;
  DROP TABLE "_page_give_v_version_methods_locales" CASCADE;
  DROP TABLE "_page_give_v" CASCADE;
  DROP TABLE "_page_give_v_locales" CASCADE;
  DROP TABLE "_page_gainesville_dew_v_version_issues" CASCADE;
  DROP TABLE "_page_gainesville_dew_v_version_issues_locales" CASCADE;
  DROP TABLE "_page_gainesville_dew_v" CASCADE;
  DROP TABLE "_page_gainesville_dew_v_locales" CASCADE;
  DROP TABLE "_page_fellowships_v" CASCADE;
  DROP TABLE "_page_fellowships_v_locales" CASCADE;
  DROP TABLE "_page_leadership_v" CASCADE;
  DROP TABLE "_page_leadership_v_locales" CASCADE;
  DROP TABLE "_page_contact_v" CASCADE;
  DROP TABLE "_page_contact_v_locales" CASCADE;
  ALTER TABLE "media" DROP CONSTRAINT "media_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_folders_fk";
  
  ALTER TABLE "page_home" DROP CONSTRAINT "page_home_sermons_featured_sermon_id_sermons_id_fk";
  
  DROP INDEX "media_folder_idx";
  DROP INDEX "payload_locked_documents_rels_payload_folders_id_idx";
  DROP INDEX "page_home_sermons_sermons_featured_sermon_idx";
  ALTER TABLE "page_home_locales" ADD COLUMN "campus_focus_section_title" varchar NOT NULL;
  ALTER TABLE "page_home_locales" ADD COLUMN "campus_focus_section_desc" varchar;
  ALTER TABLE "page_home_locales" ADD COLUMN "campus_focus_directions_title" varchar;
  ALTER TABLE "pages_blocks_campus_focus_direction_items" ADD CONSTRAINT "pages_blocks_campus_focus_direction_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_campus_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campus_focus_direction_items_locales" ADD CONSTRAINT "pages_blocks_campus_focus_direction_items_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_campus_focus_direction_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campus_focus" ADD CONSTRAINT "pages_blocks_campus_focus_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_campus_focus_locales" ADD CONSTRAINT "pages_blocks_campus_focus_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_campus_focus"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_campus_focus_direction_items" ADD CONSTRAINT "page_home_campus_focus_direction_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "page_home_campus_focus_direction_items_locales" ADD CONSTRAINT "page_home_campus_focus_direction_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_home_campus_focus_direction_items"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_campus_focus_direction_items_order_idx" ON "pages_blocks_campus_focus_direction_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_campus_focus_direction_items_parent_id_idx" ON "pages_blocks_campus_focus_direction_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_campus_focus_direction_items_locales_locale_par" ON "pages_blocks_campus_focus_direction_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_blocks_campus_focus_order_idx" ON "pages_blocks_campus_focus" USING btree ("_order");
  CREATE INDEX "pages_blocks_campus_focus_parent_id_idx" ON "pages_blocks_campus_focus" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_campus_focus_path_idx" ON "pages_blocks_campus_focus" USING btree ("_path");
  CREATE UNIQUE INDEX "pages_blocks_campus_focus_locales_locale_parent_id_unique" ON "pages_blocks_campus_focus_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "page_home_campus_focus_direction_items_order_idx" ON "page_home_campus_focus_direction_items" USING btree ("_order");
  CREATE INDEX "page_home_campus_focus_direction_items_parent_id_idx" ON "page_home_campus_focus_direction_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "page_home_campus_focus_direction_items_locales_locale_parent" ON "page_home_campus_focus_direction_items_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "media" DROP COLUMN "prefix";
  ALTER TABLE "media" DROP COLUMN "folder_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_folders_id";
  ALTER TABLE "page_home" DROP COLUMN "sermons_featured_sermon_id";
  ALTER TABLE "page_home_locales" DROP COLUMN "sermons_heading";
  DROP TYPE "public"."enum__fellowships_v_version_ministry_category";
  DROP TYPE "public"."enum_payload_folders_folder_type";`)
}
