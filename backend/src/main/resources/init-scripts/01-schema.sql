-- public.tools definition

-- Drop table

-- DROP TABLE public.tools;

CREATE TABLE public.tools (
	id serial4 NOT NULL,
	"name" varchar(100) NOT NULL,
	score numeric(5, 2) NULL,
	status varchar(20) NOT NULL,
	description text NULL,
	last_assessment date NULL,
	category varchar(50) NULL,
	CONSTRAINT tools_pkey PRIMARY KEY (id)
);


-- public.assessments definition

-- Drop table

-- DROP TABLE public.assessments;

CREATE TABLE public.assessments (
	id serial4 NOT NULL,
	tool_id int4 NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT assessments_pkey PRIMARY KEY (id),
	CONSTRAINT assessments_tool_id_key UNIQUE (tool_id),
	CONSTRAINT assessments_tool_id_fkey FOREIGN KEY (tool_id) REFERENCES public.tools(id) ON DELETE CASCADE
);
CREATE INDEX idx_assessment_tool ON public.assessments USING btree (tool_id);

-- Table Triggers

create trigger update_assessments_updated_at before
update
    on
    public.assessments for each row execute function update_updated_at_column();


-- public.assessment_categories definition

-- Drop table

-- DROP TABLE public.assessment_categories;

CREATE TABLE public.assessment_categories (
	id serial4 NOT NULL,
	assessment_id int4 NOT NULL,
	"name" varchar(50) NOT NULL,
	score text NOT NULL,
	created_at timestamptz DEFAULT CURRENT_TIMESTAMP NULL,
	note text NULL,
	CONSTRAINT assessment_categories_pkey PRIMARY KEY (id),
	CONSTRAINT assessment_categories_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES public.assessments(id) ON DELETE CASCADE
);
CREATE INDEX idx_assessment_categories ON public.assessment_categories USING btree (assessment_id);


-- public.assessment_scores definition

-- Drop table

-- DROP TABLE public.assessment_scores;

CREATE TABLE public.assessment_scores (
	id serial4 NOT NULL,
	assessment_id int4 NOT NULL,
	total numeric(5, 2) NULL,
	intelligence numeric(5, 2) NULL,
	acceleration numeric(5, 2) NULL,
	experience numeric(5, 2) NULL,
	value numeric(5, 2) NULL,
	CONSTRAINT assessment_scores_assessment_id_key UNIQUE (assessment_id),
	CONSTRAINT assessment_scores_pkey PRIMARY KEY (id),
	CONSTRAINT assessment_scores_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES public.assessments(id) ON DELETE CASCADE
);
CREATE INDEX idx_assessment_scores ON public.assessment_scores USING btree (assessment_id);